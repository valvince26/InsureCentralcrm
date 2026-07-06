"use server";

import prisma from "@/lib/prisma";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

async function getAuthUser() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");
  
  const dbUser = await prisma.user.findUnique({
    where: { clerkId: user.id },
  });
  if (!dbUser) throw new Error("User not found in DB");
  return dbUser;
}

export async function getEmailThreads() {
  const user = await getAuthUser();

  const threads = await prisma.emailThread.findMany({
    where: {
      organizationId: user.organizationId,
      userId: user.id
    },
    include: {
      contact: true,
      emails: {
        orderBy: { createdAt: 'desc' },
        take: 1
      }
    },
    orderBy: {
      lastActivityAt: 'desc'
    }
  });

  return threads;
}

export async function getEmailMessages(threadId: string) {
  const user = await getAuthUser();

  const messages = await prisma.emailMessage.findMany({
    where: {
      threadId: threadId,
      organizationId: user.organizationId
    },
    orderBy: {
      createdAt: 'asc'
    }
  });

  return messages;
}

import { SettingsService } from "@/lib/settings.service";
import nodemailer from "nodemailer";

export async function sendEmail(threadId: string, body: string) {
  const user = await getAuthUser();

  const thread = await prisma.emailThread.findUnique({
    where: { id: threadId, organizationId: user.organizationId },
    include: { contact: true }
  });

  if (!thread) throw new Error("Thread not found");

  // Fetch SMTP Configuration
  const smtpConfig = await SettingsService.getSmtpConfig(user.organizationId);
  
  if (!smtpConfig || !smtpConfig.host || !smtpConfig.username || !smtpConfig.password) {
    throw new Error("SMTP is not configured properly in Settings.");
  }

  // Set up Nodemailer Transporter
  const transporter = nodemailer.createTransport({
    host: smtpConfig.host,
    port: parseInt(smtpConfig.port || "587"),
    secure: parseInt(smtpConfig.port || "587") === 465 || smtpConfig.encryption === "ssl",
    auth: {
      user: smtpConfig.username,
      pass: smtpConfig.password, // This is decrypted by SettingsService!
    },
  });

  const fromEmail = smtpConfig.companyEmail || user.email;
  const fromName = smtpConfig.displayName || [user.firstName, user.lastName].filter(Boolean).join(" ");
  const formattedFrom = `${fromName} <${fromEmail}>`;
  const formattedTo = `${[thread.contact.firstName, thread.contact.lastName].filter(Boolean).join(" ")} <${thread.contact.email}>`;

  // Actually transmit the email
  try {
    await transporter.sendMail({
      from: formattedFrom,
      to: formattedTo,
      subject: thread.subject, // Assuming thread.subject exists, fallback if needed
      html: body,
      replyTo: smtpConfig.replyTo || undefined,
      bcc: smtpConfig.bccAddress || undefined
    });
  } catch (error: any) {
    console.error("Failed to send email via SMTP:", error);
    throw new Error("Failed to send email. Check your SMTP settings. Details: " + error.message);
  }

  // Save to Database after successful transmission
  await prisma.emailMessage.create({
    data: {
      threadId: thread.id,
      from: formattedFrom,
      to: formattedTo,
      body,
      direction: "Outbound",
      organizationId: user.organizationId
    }
  });

  await prisma.emailThread.update({
    where: { id: threadId },
    data: { lastActivityAt: new Date() }
  });

  revalidatePath("/email");
  return { success: true };
}

export async function updateEmailThreadStatus(threadId: string, status: string) {
  const user = await getAuthUser();

  await prisma.emailThread.update({
    where: { 
      id: threadId,
      organizationId: user.organizationId
    },
    data: { status }
  });

  revalidatePath("/email");
  return { success: true };
}

export async function createEmailThread(contactIdOrEmail: string, subject: string, body: string) {
  const user = await getAuthUser();

  let contactId = contactIdOrEmail;

  if (contactIdOrEmail.includes('@')) {
    // Extract just the email if it's in format "Name <email@domain.com>"
    const emailMatch = contactIdOrEmail.match(/<([^>]+)>/);
    const rawEmail = emailMatch ? emailMatch[1].trim() : contactIdOrEmail.trim();

    // Check if contact exists by email
    let contact = await prisma.contact.findFirst({
      where: { email: rawEmail, organizationId: user.organizationId }
    });
    
    if (!contact) {
      const nameParts = contactIdOrEmail.split('<')[0].trim();
      const firstName = nameParts || rawEmail.split('@')[0];

      contact = await prisma.contact.create({
        data: {
          firstName: firstName,
          email: rawEmail,
          organizationId: user.organizationId,
          source: "Email Compose"
        }
      });
    }
    contactId = contact.id;
  }

  const thread = await prisma.emailThread.create({
    data: {
      subject,
      contactId,
      userId: user.id,
      organizationId: user.organizationId,
      status: "Sent"
    }
  });

  return sendEmail(thread.id, body);
}

export async function saveEmailDraft(contactIdOrEmail: string, subject: string, body: string) {
  const user = await getAuthUser();

  let contactId = contactIdOrEmail;

  if (contactIdOrEmail.includes('@')) {
    const emailMatch = contactIdOrEmail.match(/<([^>]+)>/);
    const rawEmail = emailMatch ? emailMatch[1].trim() : contactIdOrEmail.trim();

    let contact = await prisma.contact.findFirst({
      where: { email: rawEmail, organizationId: user.organizationId }
    });
    
    if (!contact) {
      const nameParts = contactIdOrEmail.split('<')[0].trim();
      const firstName = nameParts || rawEmail.split('@')[0];

      contact = await prisma.contact.create({
        data: {
          firstName: firstName,
          email: rawEmail,
          organizationId: user.organizationId,
          source: "Email Compose"
        }
      });
    }
    contactId = contact.id;
  }

  const thread = await prisma.emailThread.create({
    data: {
      subject,
      contactId,
      userId: user.id,
      organizationId: user.organizationId,
      status: "Drafts"
    }
  });

  await prisma.emailMessage.create({
    data: {
      threadId: thread.id,
      from: user.email,
      to: contactIdOrEmail,
      body,
      direction: "Outbound",
      organizationId: user.organizationId
    }
  });

  revalidatePath("/email");
  return { success: true, threadId: thread.id };
}

export async function saveEmailReplyDraft(threadId: string, body: string) {
  const user = await getAuthUser();

  const thread = await prisma.emailThread.findUnique({
    where: { id: threadId, organizationId: user.organizationId },
    include: { contact: true }
  });

  if (!thread) throw new Error("Thread not found");

  const formattedTo = `${thread.contact.firstName} ${thread.contact.lastName} <${thread.contact.email}>`;

  await prisma.emailMessage.create({
    data: {
      threadId: thread.id,
      from: user.email,
      to: formattedTo,
      body,
      direction: "Outbound",
      organizationId: user.organizationId
    }
  });

  await prisma.emailThread.update({
    where: { id: threadId },
    data: { lastActivityAt: new Date(), status: "Drafts" }
  });

  revalidatePath("/email");
  return { success: true };
}
