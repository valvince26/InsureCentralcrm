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
  if (!dbUser) throw new Error("User not found in database");
  return dbUser;
}
import { revalidatePath } from "next/cache";

export async function getTasksForDateRange(start: Date, end: Date) {
  const user = await getAuthUser();
  
  const tasks = await prisma.task.findMany({
    where: {
      assignedToId: user.id,
      dueDate: {
        gte: start,
        lte: end
      }
    },
    include: {
      contact: true
    },
    orderBy: {
      dueDate: 'asc'
    }
  });

  return tasks;
}

export async function getUpcomingTasks(limit: number = 5) {
  const user = await getAuthUser();
  const now = new Date();
  
  const tasks = await prisma.task.findMany({
    where: {
      assignedToId: user.id,
      dueDate: {
        gte: now
      },
      status: "Pending"
    },
    include: {
      contact: true
    },
    orderBy: {
      dueDate: 'asc'
    },
    take: limit
  });

  return tasks;
}

export async function createTask(data: { title: string, dueDate: Date, contactId?: string, description?: string }) {
  const user = await getAuthUser();
  
  const task = await prisma.task.create({
    data: {
      title: data.title,
      dueDate: data.dueDate,
      contactId: data.contactId,
      description: data.description,
      assignedToId: user.id,
      createdById: user.id,
      organizationId: user.organizationId
    }
  });

  revalidatePath("/calendar");
  return task;
}
