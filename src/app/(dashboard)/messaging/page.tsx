import React from "react";
import MessagingLayout from "@/features/messaging/components/MessagingLayout";
import MessagingFolders from "@/features/messaging/components/MessagingFolders";
import ConversationList from "@/features/messaging/components/ConversationList";
import ActiveChat from "@/features/messaging/components/ActiveChat";
import ContactDetailsPane from "@/features/messaging/components/ContactDetailsPane";
import { getConversations } from "@/features/messaging/actions/messaging.actions";

export const dynamic = "force-dynamic";

export default async function MessagingPage({ searchParams }: { searchParams: { c?: string } }) {
  const conversations = await getConversations();
  const activeConvId = searchParams.c || (conversations.length > 0 ? conversations[0].id : null);
  
  const activeConversation = conversations.find((c: any) => c.id === activeConvId);

  return (
    <MessagingLayout>
      <MessagingFolders activeCount={conversations.length} />
      <ConversationList conversations={conversations} activeId={activeConvId} />
      <ActiveChat conversation={activeConversation} />
      <ContactDetailsPane conversation={activeConversation} />
    </MessagingLayout>
  );
}
