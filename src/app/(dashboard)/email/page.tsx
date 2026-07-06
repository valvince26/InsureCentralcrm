import React from "react";
import EmailLayout from "@/features/email/components/EmailLayout";
import EmailFolders from "@/features/email/components/EmailFolders";
import EmailList from "@/features/email/components/EmailList";
import ActiveEmailPane from "@/features/email/components/ActiveEmailPane";
import EmailRealtimeRefresher from "@/features/email/components/EmailRealtimeRefresher";
import { getEmailThreads } from "@/features/email/actions/email.actions";

export const dynamic = "force-dynamic";

export default async function EmailPage({ searchParams }: { searchParams: Promise<{ t?: string, folder?: string }> }) {
  try {
    const params = await searchParams;
    const folder = params.folder || "Inbox";
    const allThreads = await getEmailThreads();
    
    const threads = allThreads.filter((t: any) => t.status === folder);
    
    const activeThreadId = params.t || (threads.length > 0 ? threads[0].id : null);
    
    // allow viewing thread even if it's not in the current folder, just in case
    const activeThread = threads.find((t: any) => t.id === activeThreadId) || allThreads.find((t: any) => t.id === activeThreadId);

    // Calculate unread count
    const unreadCount = allThreads.filter((t: any) => t.status === "Inbox").length;

    return (
      <EmailLayout>
        <EmailRealtimeRefresher />
        <EmailFolders unreadCount={unreadCount} currentFolder={folder} />
        <EmailList threads={threads} activeId={activeThreadId} folder={folder} />
        <ActiveEmailPane thread={activeThread} />
      </EmailLayout>
    );
  } catch (error: any) {
    return (
      <div className="p-8 mt-[64px] ml-[260px] text-error break-words">
        <h1 className="text-title-lg font-bold">Failed to load Email Inbox:</h1>
        <p className="mt-4 bg-surface-container-high p-4 rounded-lg text-body-md font-mono">{error?.message || String(error)}</p>
        <pre className="mt-4 text-[10px] opacity-70">{error?.stack}</pre>
      </div>
    );
  }
}
