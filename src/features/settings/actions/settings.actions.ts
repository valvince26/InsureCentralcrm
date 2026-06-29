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
    include: { organization: true },
  });
  if (!dbUser) throw new Error("User not found in DB");
  return dbUser;
}

export async function getSettings(keys: string[]) {
  try {
    const user = await getAuthUser();
    
    // Fetch requested keys for the organization
    const settings = await prisma.setting.findMany({
      where: {
        organizationId: user.organizationId,
        key: { in: keys }
      }
    });

    // Convert array of {key, value} to an object
    const result: Record<string, string> = {};
    settings.forEach(s => {
      result[s.key] = s.value;
    });

    return result;
  } catch (error) {
    console.error("Error fetching settings:", error);
    return {};
  }
}

export async function saveSettings(data: Record<string, string>) {
  try {
    const user = await getAuthUser();
    
    // Require manager or admin to edit settings
    if (user.role === "AGENT") {
      throw new Error("Unauthorized: Agents cannot modify settings.");
    }

    const updates = Object.entries(data).map(async ([key, value]) => {
      if (value === undefined || value === null) return;
      
      await prisma.setting.upsert({
        where: {
          organizationId_key: {
            organizationId: user.organizationId,
            key: key
          }
        },
        update: { value: String(value) },
        create: {
          organizationId: user.organizationId,
          key: key,
          value: String(value)
        }
      });
    });

    await Promise.all(updates);

    // Create Audit Log
    await prisma.auditLog.create({
      data: {
        action: "UPDATE_SETTINGS",
        entityType: "Setting",
        entityId: "batch",
        details: JSON.stringify(Object.keys(data)),
        userId: user.id,
        organizationId: user.organizationId
      }
    });

    revalidatePath("/settings");
    return { success: true };
  } catch (error: any) {
    console.error("Error saving settings:", error);
    throw new Error(error.message || "Failed to save settings");
  }
}
