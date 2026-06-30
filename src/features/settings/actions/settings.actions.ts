"use server";

import prisma from "@/lib/prisma";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { SettingsService } from "@/lib/settings.service";

async function getOrgId() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");
  
  const dbUser = await prisma.user.findUnique({
    where: { clerkId: user.id },
  });
  if (!dbUser) throw new Error("User not found");
  return dbUser.organizationId;
}

export async function getGeneralSettings() {
  const orgId = await getOrgId();
  return SettingsService.getGeneral(orgId);
}

export async function saveGeneralSettings(data: any) {
  const orgId = await getOrgId();
  await SettingsService.setGeneral(orgId, data);
  revalidatePath("/settings");
}

export async function getBrandingSettings() {
  const orgId = await getOrgId();
  return SettingsService.getBranding(orgId);
}

export async function saveBrandingSettings(data: any) {
  const orgId = await getOrgId();
  await SettingsService.setBranding(orgId, data);
  revalidatePath("/settings");
}

export async function getBusinessHours() {
  const orgId = await getOrgId();
  return SettingsService.getBusinessHours(orgId);
}

export async function saveBusinessHours(data: any) {
  const orgId = await getOrgId();
  await SettingsService.setBusinessHours(orgId, data);
  revalidatePath("/settings");
}

export async function getEmailSettings() {
  const orgId = await getOrgId();
  return SettingsService.getSmtpConfig(orgId);
}

export async function saveEmailSettings(data: any) {
  const orgId = await getOrgId();
  await SettingsService.setSmtpConfig(orgId, data);
  revalidatePath("/settings");
}

// Legacy exports for existing components
export async function getSettings(keys?: string[]) {
  const orgId = await getOrgId();
  return SettingsService.getSetting(orgId, "legacy_settings", {});
}

export async function saveSettings(data: any) {
  const orgId = await getOrgId();
  await SettingsService.setSetting(orgId, "legacy_settings", data);
  revalidatePath("/settings");
}
