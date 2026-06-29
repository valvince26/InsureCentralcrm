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

  // Auto-seed mock email thread if none exists
  const existing = await prisma.emailThread.findFirst({
    where: { organizationId: user.organizationId }
  });

  if (!existing) {
    const contact = await prisma.contact.findFirst({
      where: { organizationId: user.organizationId }
    });
    
    if (contact) {
      await prisma.emailThread.create({
        data: {
          subject: "Urgent: Policy Renewal #PX-99120",
          contactId: contact.id,
          userId: user.id,
          organizationId: user.organizationId,
          emails: {
            create: [
              { 
                from: "Sarah Jenkins <s.jenkins@insureflow-partners.com>", 
                to: `${user.firstName} ${user.lastName} <${user.email}>`,
                body: `<p>Hi ${user.firstName},</p><p>I hope you're having a productive morning. I've been trying to process the premium renewal for Mr. Henderson (Account #PX-99120) but the system keeps throwing a validation error on the underlying liability coverage.</p><p>It seems the updated valuation report we received last week hasn't been properly mapped to the automated renewal pipeline. Given that the current policy expires in 48 hours, we need to bypass the manual check or get an override from the underwriting team as soon as possible.</p><p>I've attached the latest risk assessment and the correspondence with the client for your reference. Could you take a look and let me know if you can authorize the override?</p><p>Best regards,<br/>Sarah Jenkins<br/><span class="font-bold">Senior Claims Associate</span> | InsureFlow CRM</p>`, 
                direction: "Inbound", 
                organizationId: user.organizationId, 
                createdAt: new Date(Date.now() - 3600000) 
              }
            ]
          }
        }
      });
    }
  }

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

export async function sendEmail(threadId: string, body: string) {
  const user = await getAuthUser();

  const thread = await prisma.emailThread.findUnique({
    where: { id: threadId, organizationId: user.organizationId },
    include: { contact: true }
  });

  if (!thread) throw new Error("Thread not found");

  await prisma.emailMessage.create({
    data: {
      threadId: thread.id,
      from: `${user.firstName} ${user.lastName} <${user.email}>`,
      to: `${thread.contact.firstName} ${thread.contact.lastName} <${thread.contact.email || 'unknown@example.com'}>`,
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
