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

export async function getConversations() {
  const user = await getAuthUser();
  const isAgent = user.role === "AGENT";



  const conversations = await prisma.conversation.findMany({
    where: { 
      organizationId: user.organizationId,
      ...(isAgent ? { userId: user.id } : {})
    },
    include: {
      contact: true,
      messages: {
        orderBy: { createdAt: 'desc' },
        take: 1
      }
    },
    orderBy: { lastMessageAt: 'desc' }
  });

  return conversations;
}

export async function getConversationMessages(conversationId: string) {
  const user = await getAuthUser();
  
  return await prisma.message.findMany({
    where: { 
      conversationId: conversationId,
      organizationId: user.organizationId
    },
    orderBy: { createdAt: 'asc' }
  });
}

export async function sendMessage(conversationId: string, body: string) {
  const user = await getAuthUser();

  await prisma.message.create({
    data: {
      conversationId,
      body,
      direction: "Outbound",
      organizationId: user.organizationId
    }
  });

  await prisma.conversation.update({
    where: { id: conversationId },
    data: { lastMessageAt: new Date() }
  });

  revalidatePath("/messaging");
  return { success: true };
}
