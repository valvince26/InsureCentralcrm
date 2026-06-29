"use client";

import React, { useState, useEffect, useRef } from "react";
import { sendMessage, getConversationMessages } from "@/features/messaging/actions/messaging.actions";

export default function ActiveChat({ conversation }: { conversation?: any }) {
  const [messages, setMessages] = useState<any[]>([]);
  const [inputStr, setInputStr] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (conversation) {
      getConversationMessages(conversation.id).then(msgs => setMessages(msgs));
    } else {
      setMessages([]);
    }
  }, [conversation]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!inputStr.trim() || !conversation) return;
    const body = inputStr.trim();
    setInputStr("");

    // Optimistic UI
    const tempMsg = {
      id: "temp-" + Date.now(),
      body,
      direction: "Outbound",
      status: "Sending",
      createdAt: new Date()
    };
    setMessages(prev => [...prev, tempMsg]);

    try {
      await sendMessage(conversation.id, body);
      // Re-fetch to get accurate DB state
      const updated = await getConversationMessages(conversation.id);
      setMessages(updated);
    } catch (e) {
      console.error(e);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!conversation) {
    return (
      <section className="flex-1 bg-white flex flex-col h-full overflow-hidden items-center justify-center text-on-surface-variant">
        <span className="material-symbols-outlined text-[64px] opacity-30 mb-4">chat</span>
        <p className="text-title-md">Select a conversation to start messaging</p>
      </section>
    );
  }

  const contactName = `${conversation.contact?.firstName || ''} ${conversation.contact?.lastName || ''}`.trim();
  const contactPhone = conversation.contact?.phone || "No Phone";
  const contactEmail = conversation.contact?.email || "No Email";
  const initials = contactName ? contactName.substring(0, 2).toUpperCase() : "NA";

  return (
    <section className="flex-1 bg-white flex flex-col h-full overflow-hidden z-0">
      {/* Chat Header */}
      <div className="h-[72px] border-b border-outline-variant flex items-center justify-between px-6 bg-surface-container-lowest">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-secondary text-white flex items-center justify-center font-bold">
              {initials}
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#22c55e] border-2 border-white rounded-full"></span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-title-md font-bold text-on-surface">{contactName}</span>
              <span className="text-[11px] px-2 py-0.5 bg-secondary-container text-on-secondary-container rounded-full font-bold uppercase">
                {conversation.contact?.status || 'Active'}
              </span>
            </div>
            <p className="text-label-md text-on-surface-variant">{contactPhone} • {contactEmail}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-surface-container rounded-lg text-on-surface-variant cursor-pointer"><span className="material-symbols-outlined">call</span></button>
          <button className="p-2 hover:bg-surface-container rounded-lg text-on-surface-variant cursor-pointer"><span className="material-symbols-outlined">videocam</span></button>
          <div className="h-6 w-[1px] bg-outline-variant mx-2"></div>
          <button className="p-2 hover:bg-surface-container rounded-lg text-on-surface-variant cursor-pointer"><span className="material-symbols-outlined">person_add</span></button>
          <button className="p-2 hover:bg-surface-container rounded-lg text-on-surface-variant cursor-pointer"><span className="material-symbols-outlined">more_vert</span></button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 custom-scrollbar bg-surface-container-lowest">
        <div className="max-w-3xl mx-auto space-y-6 pb-4">
          <div className="flex justify-center">
            <span className="text-[11px] font-bold text-outline uppercase tracking-widest px-3 py-1 bg-surface-container-low rounded-full">Chat Started</span>
          </div>
          
          {messages.map((msg: any) => {
            const isInbound = msg.direction === "Inbound";
            const timeStr = new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            if (isInbound) {
              return (
                <div key={msg.id} className="flex gap-3 max-w-[80%]">
                  <div className="w-8 h-8 rounded-full flex-shrink-0 bg-secondary text-white flex items-center justify-center text-[10px] font-bold">
                    {initials}
                  </div>
                  <div>
                    <div className="bg-surface-container-low rounded-[4px_16px_16px_16px] p-3 text-body-md text-on-surface">
                      {msg.body}
                    </div>
                    <span className="text-[10px] text-outline mt-1 ml-1">{timeStr}</span>
                  </div>
                </div>
              );
            } else {
              return (
                <div key={msg.id} className="flex flex-row-reverse gap-3 max-w-[80%] ml-auto">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
                    ME
                  </div>
                  <div className="text-right">
                    <div className="bg-primary text-white rounded-[16px_16px_4px_16px] p-3 text-body-md">
                      {msg.body}
                    </div>
                    <div className="flex items-center justify-end gap-1 mt-1 mr-1">
                      <span className="text-[10px] text-outline">{timeStr}</span>
                      <span className="material-symbols-outlined text-[14px] text-primary">
                        {msg.status === "Sending" ? "schedule" : "done_all"}
                      </span>
                    </div>
                  </div>
                </div>
              );
            }
          })}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-outline-variant bg-surface-container-lowest">
        <div className="max-w-3xl mx-auto flex items-end gap-2 bg-surface-container-low rounded-2xl p-2 border border-outline-variant focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
          <button className="p-2 text-on-surface-variant hover:bg-surface-container rounded-full transition-colors cursor-pointer">
            <span className="material-symbols-outlined">add_circle</span>
          </button>
          <textarea 
            value={inputStr}
            onChange={(e) => setInputStr(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-none focus:ring-0 text-body-md py-2 px-2 resize-none max-h-32 custom-scrollbar outline-none" 
            placeholder="Type a message..." 
            rows={1}
          />
          <button className="p-2 text-on-surface-variant hover:bg-surface-container rounded-full transition-colors cursor-pointer">
            <span className="material-symbols-outlined">mood</span>
          </button>
          <button 
            onClick={handleSend}
            disabled={!inputStr.trim()}
            className="p-3 bg-primary text-on-primary rounded-xl hover:bg-primary-container shadow-md transition-all cursor-pointer disabled:opacity-50"
          >
            <span className="material-symbols-outlined">send</span>
          </button>
        </div>
        <p className="max-w-3xl mx-auto text-[10px] text-outline mt-2 px-4 flex justify-between">
          <span>Press Enter to send, Shift+Enter for new line</span>
          <span>Carrier: CRM Network</span>
        </p>
      </div>
    </section>
  );
}
