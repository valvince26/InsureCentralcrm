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

export async function getCampaigns() {
  const user = await getAuthUser();
  
  return await prisma.campaign.findMany({
    where: { organizationId: user.organizationId },
    include: {
      _count: {
        select: { contacts: true, queueItems: true }
      }
    },
    orderBy: { priority: 'asc' }
  });
}

export async function createCampaign(data: { name: string; priority: number; status: string }) {
  const user = await getAuthUser();

  await prisma.campaign.create({
    data: {
      name: data.name,
      priority: data.priority,
      status: data.status,
      organizationId: user.organizationId,
    }
  });

  revalidatePath("/campaigns");
  return { success: true };
}
