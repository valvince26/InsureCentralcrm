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

export async function inviteUser(email: string, firstName: string, lastName: string, role: "SUPER_ADMIN" | "MANAGER" | "AGENT") {
  try {
    const admin = await getAuthUser();
    if (admin.role !== "SUPER_ADMIN" && admin.role !== "MANAGER") {
      throw new Error("You do not have permission to invite users");
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    // Create placeholder user
    await prisma.user.create({
      data: {
        email,
        firstName,
        lastName,
        role,
        organizationId: admin.organizationId,
        clerkId: `invited_${Date.now()}_${Math.random().toString(36).substring(7)}`, // Temporary ID until they sign in
        isActive: false // Mark as inactive until they sign in
      }
    });

    revalidatePath("/settings");
    return { success: true };
  } catch (error: any) {
    console.error("Error inviting user:", error);
    throw new Error(error.message || "Failed to invite user");
  }
}

export async function updateUser(userId: string, data: { firstName: string, lastName: string, email: string }) {
  try {
    const admin = await getAuthUser();
    if (admin.role !== "SUPER_ADMIN" && admin.role !== "MANAGER") {
      throw new Error("You do not have permission to edit users");
    }

    await prisma.user.update({
      where: { 
        id: userId,
        organizationId: admin.organizationId
      },
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email
      }
    });

    revalidatePath("/settings");
    return { success: true };
  } catch (error: any) {
    console.error("Error updating user:", error);
    throw new Error(error.message || "Failed to update user");
  }
}
