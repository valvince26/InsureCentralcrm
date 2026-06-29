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

/**
 * Lead Assignment Engine
 * Currently implements basic Round Robin and respects daily limits.
 */
export async function assignLead(contactId: string) {
  const admin = await getAuthUser();
  
  // 1. Get Distribution Settings
  const settingStr = await prisma.setting.findUnique({
    where: {
      organizationId_key: {
        organizationId: admin.organizationId,
        key: "distributionMode"
      }
    }
  });
  
  const mode = settingStr?.value || "round_robin";

  if (mode === "manual") {
    // Leave unassigned
    return { success: true, assignedUserId: null };
  }

  // 2. Find eligible active agents
  const agents = await prisma.user.findMany({
    where: { 
      organizationId: admin.organizationId,
      isActive: true,
      role: { in: ["AGENT", "MANAGER"] }
    },
    include: {
      _count: {
        select: { leadAssignments: true }
      }
    },
    orderBy: {
      createdAt: 'asc' // Deterministic order
    }
  });

  if (agents.length === 0) {
    return { success: true, assignedUserId: null };
  }

  // Find the agent with the lowest number of current assignments (Round Robin proxy)
  // In a true RR, you'd track the "last assigned" cursor.
  let bestAgent = agents[0];
  let minLeads = agents[0]._count.leadAssignments;

  for (const agent of agents) {
    // Check Daily Cap
    const cap = agent.dailyLeadLimit || 50; 
    
    // Simplification: We check total lifetime leads vs cap here just for POC.
    // In production, we would filter leadAssignments by created > startOfDay.
    if (agent._count.leadAssignments >= cap) continue;

    if (agent._count.leadAssignments < minLeads) {
      bestAgent = agent;
      minLeads = agent._count.leadAssignments;
    }
  }

  // Assign the lead
  await prisma.contact.update({
    where: { id: contactId },
    data: { assignedUserId: bestAgent.id }
  });

  // Log the assignment
  await prisma.leadAssignment.create({
    data: {
      userId: bestAgent.id,
      organizationId: admin.organizationId
    }
  });

  // Create a QueueItem for this lead so it shows up in their Power Dialer
  await prisma.queueItem.create({
    data: {
      contactId: contactId,
      organizationId: admin.organizationId,
      status: "Pending",
      priority: 1
    }
  });

  return { success: true, assignedUserId: bestAgent.id };
}

/**
 * Get the active Queue for the Power Dialer
 */
export async function getAgentQueue() {
  const user = await getAuthUser();

  const queueItems = await prisma.queueItem.findMany({
    where: {
      organizationId: user.organizationId,
      status: "Pending",
      contact: {
        assignedUserId: user.id // Only get items assigned to this agent
      }
    },
    include: {
      contact: true,
      campaign: true
    },
    orderBy: [
      { priority: 'desc' },
      { nextAttemptAt: 'asc' }, // nulls first, then oldest
      { createdAt: 'asc' }
    ],
    take: 50 // Limit to 50 in memory
  });

  return queueItems;
}

/**
 * Update Queue Item Status (e.g., when moving to next call)
 */
export async function completeQueueItem(queueItemId: string, newStatus: "Completed" | "Skipped" | "Requeued") {
  const user = await getAuthUser();

  await prisma.queueItem.update({
    where: { 
      id: queueItemId,
      organizationId: user.organizationId
    },
    data: { 
      status: newStatus,
      attempts: { increment: 1 }
    }
  });

  revalidatePath("/power-dialer");
  return { success: true };
}

/**
 * Bulk assign leads (e.g. from CSV import)
 */
export async function bulkAssignLeads(contactIds: string[]) {
  const admin = await getAuthUser();
  
  const settingStr = await prisma.setting.findUnique({
    where: {
      organizationId_key: {
        organizationId: admin.organizationId,
        key: "distributionMode"
      }
    }
  });
  
  const mode = settingStr?.value || "round_robin";
  if (mode === "manual") return { success: true };

  const agents = await prisma.user.findMany({
    where: { 
      organizationId: admin.organizationId,
      isActive: true,
      role: { in: ["AGENT", "MANAGER"] }
    },
    include: { _count: { select: { leadAssignments: true } } },
    orderBy: { createdAt: 'asc' }
  });

  if (agents.length === 0) return { success: true };

  // Naive round robin for bulk
  let agentIndex = 0;
  
  for (const contactId of contactIds) {
    const agent = agents[agentIndex];
    
    await prisma.contact.update({
      where: { id: contactId },
      data: { assignedUserId: agent.id }
    });

    await prisma.leadAssignment.create({
      data: { userId: agent.id, organizationId: admin.organizationId }
    });

    await prisma.queueItem.create({
      data: { contactId, organizationId: admin.organizationId, status: "Pending", priority: 1 }
    });

    agentIndex = (agentIndex + 1) % agents.length;
  }

  return { success: true };
}
