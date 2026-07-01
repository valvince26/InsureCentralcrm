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
    const isAgent = user.role === "AGENT";
    
    const contacts = await prisma.contact.findMany({
      where: {
        organizationId: user.organizationId,
        isDeleted: false,
        ...(isAgent ? { assignedUserId: user.id } : {}),
      },
      include: {
        assignedUser: true,
        campaign: true,
        tags: true,
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

    await prisma.auditLog.create({
      data: {
        action: "Bulk Delete",
        entityType: "Contact",
        entityId: "bulk",
        details: JSON.stringify({ count: contactIds.length, ids: contactIds }),
        userId: user.id,
        organizationId: user.organizationId
      }
    });

    revalidatePath("/contacts");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to bulk delete contacts:", error);
    return { success: false, error: error.message };
  }
}

import { bulkAssignLeads } from "@/features/queue/actions/assignment.actions";

export async function importContacts(contactsData: any[]) {
  try {
    const user = await getSession();
    
    const contactsToCreate = contactsData.map(c => ({
      firstName: c.firstName || "Unknown",
      lastName: c.lastName || null,
      email: c.email || null,
      phone: c.phone || null,
      state: c.state || null,
      source: c.source || "CSV Import",
      status: "New",
      organizationId: user.organizationId,
      assignedUserId: user.id, // Initial assignment (fallback)
    }));

    const created = await prisma.contact.createManyAndReturn({
      data: contactsToCreate,
      skipDuplicates: true,
    });

    if (created.length > 0) {
      await bulkAssignLeads(created.map((c: any) => c.id));
      
      await prisma.auditLog.create({
        data: {
          action: "Import Contacts",
          entityType: "Contact",
          entityId: "bulk",
          details: JSON.stringify({ count: created.length, source: contactsData[0]?.source || "CSV Import" }),
          userId: user.id,
          organizationId: user.organizationId
        }
      });
    }

    revalidatePath("/contacts");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to import contacts:", error);
    return { success: false, error: error.message };
  }
}

export async function getContactAuditLogs() {
  try {
    const user = await getSession();
    
    const logs = await prisma.auditLog.findMany({
      where: {
        organizationId: user.organizationId,
        entityType: "Contact"
      },
      include: {
        user: true
      },
      orderBy: { createdAt: "desc" },
      take: 50
    });
    
    return logs;
  } catch (error) {
    console.error("Failed to fetch contact audit logs:", error);
    return [];
  }
}

export async function assignTagToContacts(contactIds: string[], tagName: string) {
  try {
    const user = await getSession();

    let tag = await prisma.tag.findFirst({
      where: { name: tagName, organizationId: user.organizationId }
    });

    if (!tag) {
      tag = await prisma.tag.create({
        data: { name: tagName, organizationId: user.organizationId }
      });
    }

    // Assign tag to each contact (Prisma many-to-many update)
    for (const id of contactIds) {
      await prisma.contact.update({
        where: { id, organizationId: user.organizationId },
        data: {
          tags: {
            connect: { id: tag.id }
          }
        }
      });
    }

    await prisma.auditLog.create({
      data: {
        action: "Tags Added",
        entityType: "Contact",
        entityId: "bulk",
        details: JSON.stringify({ count: contactIds.length, tag: tagName }),
        userId: user.id,
        organizationId: user.organizationId
      }
    });

    revalidatePath("/contacts");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to assign tag:", error);
    return { success: false, error: error.message };
  }
}

export async function getTags() {
  try {
    const user = await getSession();
    return await prisma.tag.findMany({
      where: { organizationId: user.organizationId },
      orderBy: { name: 'asc' }
    });
  } catch (error) {
    console.error("Failed to fetch tags:", error);
    return [];
  }
}

export async function createContact(data: { firstName: string; lastName?: string; email?: string; phone?: string; state?: string; source?: string; tagName?: string }) {
  try {
    const user = await getSession();
    
    let tagConnect = undefined;
    if (data.tagName) {
      let tag = await prisma.tag.findFirst({
        where: { name: data.tagName, organizationId: user.organizationId }
      });
      if (!tag) {
        tag = await prisma.tag.create({
          data: { name: data.tagName, organizationId: user.organizationId }
        });
      }
      tagConnect = { connect: { id: tag.id } };
    }

    const contact = await prisma.contact.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        state: data.state,
        source: data.source || "Manual Entry",
        status: "New",
        organizationId: user.organizationId,
        assignedUserId: user.id,
        tags: tagConnect
      }
    });

    await bulkAssignLeads([contact.id]);

    await prisma.auditLog.create({
      data: {
        action: "Contact Created",
        entityType: "Contact",
        entityId: contact.id,
        details: JSON.stringify({ source: data.source || "Manual Entry" }),
        userId: user.id,
        organizationId: user.organizationId
      }
    });

    revalidatePath("/contacts");
    return { success: true, contact };
  } catch (error: any) {
    console.error("Failed to create contact:", error);
    return { success: false, error: error.message };
  }
}
