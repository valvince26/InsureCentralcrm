import React from "react";
import MessagingLayout from "@/features/messaging/components/MessagingLayout";
import MessagingFolders from "@/features/messaging/components/MessagingFolders";
import ConversationList from "@/features/messaging/components/ConversationList";
import ActiveChat from "@/features/messaging/components/ActiveChat";
import ContactDetailsPane from "@/features/messaging/components/ContactDetailsPane";
import { getConversations } from "@/features/messaging/actions/messaging.actions";

export const dynamic = "force-dynamic";

export default async function MessagingPage({ searchParams }: { searchParams: Promise<{ c?: string }> }) {
  try {
    const params = await searchParams;
    const conversations = await getConversations();
    const activeConvId = params.c || (conversations.length > 0 ? conversations[0].id : null);
    
    const activeConversation = conversations.find((c: any) => c.id === activeConvId);

    return (
      <MessagingLayout>
        <MessagingFolders activeCount={conversations.length} />
        <ConversationList conversations={conversations} activeId={activeConvId} />
        <ActiveChat conversation={activeConversation} />
        <ContactDetailsPane conversation={activeConversation} />
      </MessagingLayout>
    );
  } catch (error: any) {
    return (
      <div className="p-8 mt-[64px] ml-[260px] text-error break-words">
        <h1 className="text-title-lg font-bold">Failed to load Messaging:</h1>
        <p className="mt-4 bg-surface-container-high p-4 rounded-lg text-body-md font-mono">{error?.message || String(error)}</p>
        <pre className="mt-4 text-[10px] opacity-70">{error?.stack}</pre>
      </div>
    );
  }
}
