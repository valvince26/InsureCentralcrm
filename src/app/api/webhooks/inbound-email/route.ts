import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { SettingsService } from "@/lib/settings.service";

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get("content-type") || "";
    
    let from = "";
    let to = "";
    let subject = "(No Subject)";
    let html = "";
    let text = "";

    let emailId = "";

    if (contentType.includes("application/json")) {
      const payload = await req.json();
      const data = payload.data || payload;
      
      from = data.from || "";
      to = Array.isArray(data.to) ? data.to[0] : (data.to || "");
      subject = data.subject || "(No Subject)";
      emailId = data.email_id || "";
      html = data.html || data.html_body || data.body || "";
      text = data.text || data.text_body || "";
    } else {
      const formData = await req.formData();
      from = formData.get("from") as string || "";
      to = formData.get("to") as string || "";
      subject = formData.get("subject") as string || "(No Subject)";
      html = formData.get("html") as string || "";
      text = formData.get("text") as string || "";
    }
    
    const extractEmail = (str: string) => {
      const match = str.match(/<([^>]+)>/);
      return match ? match[1].toLowerCase() : str.trim().toLowerCase();
    };

    const fromEmail = extractEmail(from);
    const toEmail = extractEmail(to);

    if (!fromEmail || !toEmail) {
      return NextResponse.json({ error: "Missing from/to email" }, { status: 400 });
    }

    let user = await prisma.user.findFirst({
      where: { email: { equals: toEmail, mode: "insensitive" } }
    });

    let organizationId = user?.organizationId;

    if (!organizationId) {
      const contact = await prisma.contact.findFirst({
        where: { email: { equals: fromEmail, mode: "insensitive" } }
      });
      
      if (contact) {
        organizationId = contact.organizationId;
        user = await prisma.user.findFirst({ 
          where: { id: contact.assignedUserId || undefined, organizationId }
        });
        if (!user) {
           user = await prisma.user.findFirst({ where: { organizationId }});
        }
      }
    }

    if (!organizationId) {
      console.warn("Could not find organization for inbound email", { toEmail, fromEmail });
      return NextResponse.json({ success: true, message: "Ignored: No matching organization found for these addresses." });
    }

    // IMPORTANT: Resend webhook payloads do NOT contain the email body! 
    // We must fetch it using the email_id and the organization's Resend API Key.
    if (emailId && !html && !text) {
      try {
        const smtpConfig = await SettingsService.getSmtpConfig(organizationId);
        
        if (smtpConfig && smtpConfig.password) {
          const res = await fetch(`https://api.resend.com/emails/receiving/${emailId}`, {
            headers: {
              'Authorization': `Bearer ${smtpConfig.password}`
            }
          });
          
          if (res.ok) {
            const emailData = await res.json();
            html = emailData.html || "";
            text = emailData.text || "";
          } else {
            console.error("Failed to fetch full email from Resend", await res.text());
          }
        }
      } catch (err) {
        console.error("Error fetching Resend email body", err);
      }
    }

    // Fallback to plain text if HTML is not provided
    if (!html && text) {
      html = `<p>${text.replace(/\n/g, '<br/>')}</p>`;
    } else if (!html) {
      html = "<p></p>";
    }

    // Find or Create the contact sending the email
    let contact = await prisma.contact.findFirst({
      where: { email: { equals: fromEmail, mode: "insensitive" }, organizationId }
    });

    if (!contact) {
      const nameParts = from.split('<')[0].trim().split(' ');
      contact = await prisma.contact.create({
        data: {
          firstName: nameParts[0] || fromEmail.split('@')[0],
          lastName: nameParts.slice(1).join(' ') || null,
          email: fromEmail,
          organizationId,
          source: "Inbound Email"
        }
      });
    }

    // Attempt to find an existing thread. 
    // A robust system uses headers (In-Reply-To), but matching by Contact ID is a solid fallback for prototypes.
    let thread = await prisma.emailThread.findFirst({
      where: { contactId: contact.id, organizationId },
      orderBy: { lastActivityAt: "desc" }
    });

    if (!thread) {
      thread = await prisma.emailThread.create({
        data: {
          subject,
          contactId: contact.id,
          userId: user?.id || "",
          organizationId,
          status: "Inbox"
        }
      });
    } else {
      // Update thread status to Inbox since they replied, bumping it to the top!
      await prisma.emailThread.update({
        where: { id: thread.id },
        data: { 
          lastActivityAt: new Date(), 
          status: "Inbox",
          // Update subject if it changed (e.g. added "Re:")
          subject: subject.startsWith('Re:') ? subject : `Re: ${thread.subject}` 
        }
      });
    }

    // Insert the new Message into the Database
    await prisma.emailMessage.create({
      data: {
        threadId: thread.id,
        from: from,
        to: to,
        body: html,
        direction: "Inbound",
        organizationId
      }
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Inbound email webhook error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
