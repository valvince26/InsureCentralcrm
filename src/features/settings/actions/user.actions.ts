"use server";

import prisma from "@/lib/prisma";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import nodemailer from "nodemailer";
import { SettingsService } from "@/lib/settings.service";

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
    revalidatePath("/team");
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

    // Send Invite Email
    try {
      const smtpConfig = await SettingsService.getSmtpConfig(admin.organizationId);
      if (smtpConfig && smtpConfig.host && smtpConfig.username && smtpConfig.password) {
        const transporter = nodemailer.createTransport({
          host: smtpConfig.host,
          port: parseInt(smtpConfig.port || "587"),
          secure: parseInt(smtpConfig.port || "587") === 465 || smtpConfig.encryption === "ssl",
          auth: {
            user: smtpConfig.username,
            pass: smtpConfig.password,
          },
        });

        const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://insure-centralcrm.vercel.app";
        const inviteUrl = `${appUrl}/login`;

        await transporter.sendMail({
          from: `"${smtpConfig.displayName || 'Insure Central'}" <${smtpConfig.companyEmail || admin.email}>`,
          to: email,
          subject: "You've been invited to join Insure Central CRM",
          html: `<p>Hello ${firstName},</p><p>You have been invited to join the team on Insure Central CRM. Please click <a href="${inviteUrl}">here</a> to sign in with your email and join the organization.</p>`,
        });
      } else {
        console.warn("SMTP not configured. Invite email skipped.");
      }
    } catch (emailError) {
      console.error("Failed to send invite email:", emailError);
      // We don't throw here so the user is still created successfully
    }

    revalidatePath("/settings");
    revalidatePath("/team");
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
    revalidatePath("/team");
    return { success: true };
  } catch (error: any) {
    console.error("Error updating user:", error);
    throw new Error(error.message || "Failed to update user");
  }
}

export async function deleteUser(userId: string) {
  try {
    const admin = await getAuthUser();
    if (admin.role !== "SUPER_ADMIN") {
      throw new Error("Only Super Admins can delete users");
    }

    if (admin.id === userId) {
      throw new Error("You cannot delete your own account");
    }

    await prisma.user.delete({
      where: { 
        id: userId,
        organizationId: admin.organizationId
      }
    });

    revalidatePath("/settings");
    revalidatePath("/team");
    return { success: true };
  } catch (error: any) {
    console.error("Error deleting user:", error);
    throw new Error(error.message || "Failed to delete user");
  }
}
