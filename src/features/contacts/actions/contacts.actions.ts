"use server";

import prisma from "@/lib/prisma";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

async function getSession() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const dbUser = await prisma.user.findUnique({
    where: { clerkId: user.id },
    include: { organization: true },
  });

  if (!dbUser) throw new Error("User not found in DB");
  return dbUser;
}

export async function getContacts() {
  try {
    const user = await getSession();
    
    const contacts = await prisma.contact.findMany({
      where: {
        organizationId: user.organizationId,
        isDeleted: false,
      },
      include: {
        assignedUser: true,
        campaign: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return contacts;
  } catch (error) {
    console.error("Failed to get contacts:", error);
    return [];
  }
}

export async function bulkDeleteContacts(contactIds: string[]) {
  try {
    const user = await getSession();
    
    await prisma.contact.updateMany({
      where: {
        id: { in: contactIds },
        organizationId: user.organizationId,
      },
      data: {
        isDeleted: true,
      },
    });

    revalidatePath("/contacts");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to bulk delete contacts:", error);
    return { success: false, error: error.message };
  }
}

export async function importContacts(contactsData: any[]) {
  try {
    const user = await getSession();
    
    // Create contacts in bulk
    const contactsToCreate = contactsData.map(c => ({
      firstName: c.firstName || "Unknown",
      lastName: c.lastName || null,
      email: c.email || null,
      phone: c.phone || null,
      state: c.state || null,
      source: c.source || "CSV Import",
      status: "New",
      organizationId: user.organizationId,
      assignedUserId: user.id, // Assign to uploader by default
    }));

    await prisma.contact.createMany({
      data: contactsToCreate,
      skipDuplicates: true,
    });

    revalidatePath("/contacts");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to import contacts:", error);
    return { success: false, error: error.message };
  }
}
