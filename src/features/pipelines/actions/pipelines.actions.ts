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
  
  const pipelines = await prisma.pipeline.findMany({
    where: { organizationId: user.organizationId },
    include: {
      stages: {
        orderBy: { order: 'asc' },
        include: {
          opportunities: {
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

    // Create a couple of mock opportunities to show off the board
    const stage1 = defaultPipeline.stages.find(s => s.order === 1);
    const stage2 = defaultPipeline.stages.find(s => s.order === 2);

    if (stage1 && stage2) {
      // Create a mock contact
      const contact1 = await prisma.contact.create({
        data: {
          firstName: "Robert",
          lastName: "Patterson",
          organizationId: user.organizationId,
        }
      });
      const contact2 = await prisma.contact.create({
        data: {
          firstName: "Samantha",
          lastName: "Reed",
          organizationId: user.organizationId,
        }
      });

      // Create opportunities
      await prisma.opportunity.createMany({
        data: [
          {
            title: "Auto Policy Renewal",
            value: 1200,
            contactId: contact1.id,
            stageId: stage1.id,
            organizationId: user.organizationId,
          },
          {
            title: "Home Insurance Quote",
            value: 2450,
            contactId: contact2.id,
            stageId: stage2.id,
            organizationId: user.organizationId,
          }
        ]
      });
    }

    // Refetch to get the nested opportunities
    return await prisma.pipeline.findMany({
      where: { organizationId: user.organizationId },
      include: {
        stages: {
          orderBy: { order: 'asc' },
          include: {
            opportunities: { include: { contact: true } }
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
