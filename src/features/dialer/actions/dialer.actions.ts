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

export async function logCall(contactId: string, durationSecs: number, disposition: string) {
  try {
    const user = await getAuthUser();

    // Create the CallLog
    const callLog = await prisma.callLog.create({
      data: {
        contactId,
        userId: user.id,
        organizationId: user.organizationId,
        durationSecs,
        disposition,
      }
    });

    // Create a simulated recording if the call actually connected (duration > 0)
    if (durationSecs > 0) {
      await prisma.callRecording.create({
        data: {
          callLogId: callLog.id,
          url: `https://mock-s3-bucket.s3.amazonaws.com/recordings/${user.organizationId}/${callLog.id}.mp3`
        }
      });
    }

    // Update the Contact's Disposition status
    await prisma.contact.update({
      where: { id: contactId },
      data: { 
        disposition,
        status: disposition === "interested" ? "Working" 
              : disposition === "dnc" ? "Do Not Contact" 
              : "Contacted"
      }
    });

    revalidatePath("/power-dialer");
    revalidatePath("/contacts");
    
    return { success: true, callLogId: callLog.id };
  } catch (error: any) {
    console.error("Failed to log call:", error);
    return { success: false, error: error.message };
  }
}
