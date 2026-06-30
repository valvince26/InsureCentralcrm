"use server";

import prisma from "@/lib/prisma";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

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

// ----------------------------------------------------------------------
// TAGS
// ----------------------------------------------------------------------
export async function getTags() {
  const orgId = await getOrgId();
  return prisma.tag.findMany({
    where: { organizationId: orgId },
    orderBy: { name: 'asc' }
  });
}

export async function createTag(data: { name: string, color?: string, category?: string }) {
  const orgId = await getOrgId();
  await prisma.tag.create({
    data: { ...data, organizationId: orgId }
  });
  revalidatePath("/settings");
}

export async function deleteTag(id: string) {
  const orgId = await getOrgId();
  await prisma.tag.delete({
    where: { id, organizationId: orgId }
  });
  revalidatePath("/settings");
}

// ----------------------------------------------------------------------
// CUSTOM FIELDS
// ----------------------------------------------------------------------
export async function getCustomFields() {
  const orgId = await getOrgId();
  return prisma.customField.findMany({
    where: { organizationId: orgId },
    orderBy: { name: 'asc' }
  });
}

export async function createCustomField(data: { name: string, type: string, entityType: string }) {
  const orgId = await getOrgId();
  await prisma.customField.create({
    data: { ...data, organizationId: orgId }
  });
  revalidatePath("/settings");
}

export async function deleteCustomField(id: string) {
  const orgId = await getOrgId();
  await prisma.customField.delete({
    where: { id, organizationId: orgId }
  });
  revalidatePath("/settings");
}

// ----------------------------------------------------------------------
// PIPELINES
// ----------------------------------------------------------------------
export async function getPipelines() {
  const orgId = await getOrgId();
  return prisma.pipeline.findMany({
    where: { organizationId: orgId },
    include: { stages: { orderBy: { order: 'asc' } } },
    orderBy: { name: 'asc' }
  });
}

export async function createPipeline(name: string) {
  const orgId = await getOrgId();
  await prisma.pipeline.create({
    data: { name, organizationId: orgId }
  });
  revalidatePath("/settings");
}

export async function deletePipeline(id: string) {
  const orgId = await getOrgId();
  await prisma.pipeline.delete({
    where: { id, organizationId: orgId }
  });
  revalidatePath("/settings");
}
