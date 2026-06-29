"use server";

import prisma from "@/lib/prisma";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

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

export async function getReportMetrics() {
  const user = await getAuthUser();
  const orgId = user.organizationId;
  const isAgent = user.role === "AGENT";

  // 1. Total Contacts
  const totalLeads = await prisma.contact.count({
    where: { 
      organizationId: orgId, 
      isDeleted: false,
      ...(isAgent ? { assignedUserId: user.id } : {})
    }
  });

  // 2. Call Metrics
  const callLogs = await prisma.callLog.findMany({
    where: { 
      organizationId: orgId,
      ...(isAgent ? { userId: user.id } : {})
    }
  });

  const totalCalls = callLogs.length;
  
  let totalDurationSecs = 0;
  let interestedCalls = 0;
  
  callLogs.forEach(log => {
    totalDurationSecs += log.durationSecs || 0;
    if (log.disposition === "interested") {
      interestedCalls++;
    }
  });

  const avgDurationMins = totalCalls > 0 ? Math.round((totalDurationSecs / totalCalls) / 60) : 0;
  const conversionRate = totalCalls > 0 ? ((interestedCalls / totalCalls) * 100).toFixed(1) : "0.0";

  // 3. Top Agents
  const agents = await prisma.user.findMany({
    where: { 
      organizationId: orgId, 
      isActive: true,
      ...(isAgent ? { id: user.id } : {})
    },
    include: {
      callLogs: true
    }
  });

  const agentStats = agents.map(agent => {
    const agentCalls = agent.callLogs.length;
    let agentInterested = 0;
    let agentSecs = 0;
    agent.callLogs.forEach(log => {
      agentSecs += log.durationSecs || 0;
      if (log.disposition === "interested") agentInterested++;
    });

    const agentConv = agentCalls > 0 ? ((agentInterested / agentCalls) * 100).toFixed(1) : "0.0";

    return {
      id: agent.id,
      name: agent.firstName + " " + (agent.lastName || ""),
      callsMade: agentCalls,
      conversionRate: agentConv + "%",
      talkTime: agentSecs > 0 ? Math.floor(agentSecs / 60) + "m" : "0m",
      avatarSrc: ""
    };
  }).sort((a, b) => b.callsMade - a.callsMade).slice(0, 5); // Top 5

  return {
    kpis: {
      totalLeads,
      totalCalls,
      avgDurationMins: avgDurationMins + "m",
      conversionRate: conversionRate + "%"
    },
    topAgents: agentStats
  };
}
