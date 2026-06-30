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

export async function getPipelines() {
  const user = await getAuthUser();
  const isAgent = user.role === "AGENT";
  
  const opportunitiesFilter = isAgent ? { contact: { assignedUserId: user.id } } : {};

  const pipelines = await prisma.pipeline.findMany({
    where: { organizationId: user.organizationId },
    include: {
      stages: {
        orderBy: { order: 'asc' },
        include: {
          opportunities: {
            where: opportunitiesFilter,
            include: { contact: true }
          }
        }
      }
    }
  });

  // If no pipeline exists, create a default one
  if (pipelines.length === 0) {
    const defaultPipeline = await prisma.pipeline.create({
      data: {
        name: "Standard Sales Pipeline",
        organizationId: user.organizationId,
        stages: {
          create: [
            { name: "New Lead", order: 1 },
            { name: "Attempted", order: 2 },
            { name: "Connected", order: 3 },
            { name: "Interested", order: 4 },
            { name: "Follow Up", order: 5 },
            { name: "Closed (Won)", order: 6 },
            { name: "Lost", order: 7 },
          ]
        }
      },
      include: {
        stages: {
          orderBy: { order: 'asc' }
        }
      }
    });



    // Refetch to get the nested opportunities
    return await prisma.pipeline.findMany({
      where: { organizationId: user.organizationId },
      include: {
        stages: {
          orderBy: { order: 'asc' },
          include: {
            opportunities: { 
              where: opportunitiesFilter,
              include: { contact: true } 
            }
          }
        }
      }
    });
  }

  return pipelines;
}

export async function updateOpportunityStage(opportunityId: string, newStageId: string) {
  const user = await getAuthUser();

  await prisma.opportunity.update({
    where: { 
      id: opportunityId,
      organizationId: user.organizationId
    },
    data: { stageId: newStageId }
  });

  revalidatePath("/pipelines");
  return { success: true };
}
