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

export async function getOrganizationUsers() {
  try {
    const user = await getAuthUser();
    
    const users = await prisma.user.findMany({
      where: { organizationId: user.organizationId },
      include: { team: true },
      orderBy: { createdAt: "desc" }
    });
    
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}

export async function updateUserRole(userId: string, newRole: "SUPER_ADMIN" | "MANAGER" | "AGENT") {
  try {
    const admin = await getAuthUser();
    if (admin.role !== "SUPER_ADMIN") throw new Error("Only Super Admins can change roles");

    await prisma.user.update({
      where: { 
        id: userId,
        organizationId: admin.organizationId // Ensure they only update their own org users
      },
      data: { role: newRole }
    });
    
    revalidatePath("/settings");
    return { success: true };
  } catch (error: any) {
    console.error("Error updating user role:", error);
    throw new Error(error.message || "Failed to update role");
  }
}
