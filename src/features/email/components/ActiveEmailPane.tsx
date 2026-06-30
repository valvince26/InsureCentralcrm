"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { sendEmail, getEmailMessages, updateEmailThreadStatus } from "@/features/email/actions/email.actions";

export default function ActiveEmailPane({ thread }: { thread?: any }) {
  const [messages, setMessages] = useState<any[]>([]);
  const [replyText, setReplyText] = useState("");
  const [isReplying, setIsReplying] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleAction = async (action: 'Trash' | 'Archived') => {
    if (!thread) return;
    try {
      await updateEmailThreadStatus(thread.id, action);
      router.push('/email');
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (thread) {
      getEmailMessages(thread.id).then(msgs => setMessages(msgs));
      setIsReplying(false);
      setReplyText("");
    } else {
      setMessages([]);
    }
  }, [thread]);

  const handleSend = async () => {
    if (!replyText.trim() || !thread) return;
    
    const bodyText = `<p>${replyText.replace(/\\n/g, '<br/>')}</p>`;
    
    // Optimistic UI
    const tempMsg = {
      id: "temp-" + Date.now(),
      from: "Me",
      body: bodyText,
      direction: "Outbound",
      createdAt: new Date()
    };
    setMessages(prev => [...prev, tempMsg]);
    setReplyText("");
    setIsReplying(false);

    try {
      await sendEmail(thread.id, bodyText);
      const updated = await getEmailMessages(thread.id);
      setMessages(updated);
      setTimeout(() => {
        scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
      }, 100);
    } catch (e) {
      console.error(e);
    }
  };

  if (!thread) {
    return (
      <section className="flex-1 bg-white flex flex-col h-full overflow-hidden items-center justify-center text-on-surface-variant z-0">
        <span className="material-symbols-outlined text-[64px] opacity-30 mb-4">mail</span>
        <p className="text-title-md">Select an email to read</p>
      </section>
    );
  }

  const contactName = `${thread.contact?.firstName || ''} ${thread.contact?.lastName || ''}`.trim() || "Unknown";
  const initials = contactName !== "Unknown" ? contactName.substring(0, 2).toUpperCase() : "NA";

  return (
    <section className="flex-1 bg-white flex flex-col h-full overflow-hidden z-0 relative">
      {/* Email Toolbar */}
      <div className="h-14 border-b border-outline-variant flex items-center justify-between px-6 bg-surface-container-lowest sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsReplying(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 hover:bg-surface-container rounded-lg text-on-surface-variant transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">reply</span>
            <span className="text-label-md">Reply</span>
          </button>
          <button 
            onClick={() => setIsReplying(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 hover:bg-surface-container rounded-lg text-on-surface-variant transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">forward</span>
            <span className="text-label-md">Forward</span>
          </button>
          <div className="h-4 w-[1px] bg-outline-variant mx-1"></div>
          <button 
            onClick={() => handleAction('Trash')}
            className="p-2 hover:bg-error/10 hover:text-error rounded-lg text-on-surface-variant transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">delete</span>
          </button>
          <button 
            onClick={() => handleAction('Archived')}
            className="p-2 hover:bg-surface-container rounded-lg text-on-surface-variant transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">archive</span>
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-surface-container rounded-lg text-on-surface-variant cursor-pointer"><span className="material-symbols-outlined">print</span></button>
          <button className="p-2 hover:bg-surface-container rounded-lg text-on-surface-variant cursor-pointer"><span className="material-symbols-outlined">more_vert</span></button>
        </div>
      </div>

      {/* Email Content Area */}
      <div className="flex-1 overflow-y-auto p-10 custom-scrollbar" ref={scrollRef}>
        <div className="max-w-4xl mx-auto pb-24">
          
          {/* Header */}
          <div className="mb-8 flex justify-between items-start">
            <div>
              <h2 className="text-headline-md font-headline-md text-on-surface mb-6">{thread.subject}</h2>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary text-white flex items-center justify-center text-lg font-bold ring-2 ring-primary/20 shrink-0">
                  {initials}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-title-md font-bold text-on-surface">{contactName}</span>
                    <span className="text-label-md text-outline-variant">&lt;{thread.contact?.email}&gt;</span>
                  </div>
                  <div className="flex items-center gap-2 text-label-md text-on-surface-variant">
                    <span>to Me</span>
                    <span className="material-symbols-outlined text-[14px]">expand_more</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-right">
              <span className="text-label-md text-outline block">
                {new Date(thread.lastActivityAt).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
              </span>
              <span className="text-label-md text-primary font-bold mt-1 inline-block px-2 py-0.5 bg-primary/10 rounded">Internal Thread</span>
            </div>
          </div>

          {/* Messages */}
          <div className="space-y-8">
            {messages.map((msg: any, idx: number) => (
              <div key={msg.id} className={`pt-6 ${idx > 0 ? 'border-t border-outline-variant/50' : 'border-t border-outline-variant'}`}>
                {msg.direction === 'Outbound' && (
                  <div className="flex items-center gap-2 mb-4 text-label-md text-on-surface-variant">
                    <span className="material-symbols-outlined text-[16px]">reply</span>
                    <strong>You</strong> replied on {new Date(msg.createdAt).toLocaleString()}
                  </div>
                )}
                <div 
                  className="text-body-lg text-on-surface-variant leading-relaxed space-y-4 prose prose-p:my-2 prose-a:text-primary max-w-none"
                  dangerouslySetInnerHTML={{ __html: msg.body }} 
                />
              </div>
            ))}
          </div>

          {/* Attachments Mock */}
          {thread.subject.includes("Urgent") && (
            <div className="mt-12 border-t border-outline-variant pt-8">
              <p className="text-label-md font-bold text-outline-variant uppercase mb-4 tracking-widest">Attachments (2)</p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-3 p-3 border border-outline-variant rounded-xl hover:border-primary hover:bg-primary/5 cursor-pointer transition-all w-64 group">
                  <div className="w-10 h-10 bg-error/10 text-error rounded flex items-center justify-center">
                    <span className="material-symbols-outlined">picture_as_pdf</span>
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <p className="text-body-md font-bold truncate text-on-surface">Risk_Assessment_PX.pdf</p>
                    <p className="text-[10px] text-outline-variant">2.4 MB</p>
                  </div>
                  <span className="material-symbols-outlined text-outline-variant group-hover:text-primary">download</span>
                </div>
                <div className="flex items-center gap-3 p-3 border border-outline-variant rounded-xl hover:border-primary hover:bg-primary/5 cursor-pointer transition-all w-64 group">
                  <div className="w-10 h-10 bg-primary/10 text-primary rounded flex items-center justify-center">
                    <span className="material-symbols-outlined">description</span>
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <p className="text-body-md font-bold truncate text-on-surface">Henderson_Policy_Terms.docx</p>
                    <p className="text-[10px] text-outline-variant">1.1 MB</p>
                  </div>
                  <span className="material-symbols-outlined text-outline-variant group-hover:text-primary">download</span>
                </div>
              </div>
            </div>
          )}

          {/* Reply Box */}
          {isReplying ? (
            <div className="mt-12 border border-primary rounded-2xl overflow-hidden shadow-sm bg-surface-container-lowest">
              <div className="bg-surface-container-low px-4 py-2 border-b border-outline-variant flex items-center gap-4 text-on-surface-variant">
                <span className="material-symbols-outlined text-[18px] cursor-pointer hover:text-on-surface">format_bold</span>
                <span className="material-symbols-outlined text-[18px] cursor-pointer hover:text-on-surface">format_italic</span>
                <span className="material-symbols-outlined text-[18px] cursor-pointer hover:text-on-surface">format_underlined</span>
                <div className="h-4 w-[1px] bg-outline-variant mx-1"></div>
                <span className="material-symbols-outlined text-[18px] cursor-pointer hover:text-on-surface">format_list_bulleted</span>
                <span className="material-symbols-outlined text-[18px] cursor-pointer hover:text-on-surface">format_list_numbered</span>
              </div>
              <textarea 
                className="w-full min-h-[150px] p-4 bg-transparent border-none focus:ring-0 resize-y text-body-md outline-none"
                placeholder="Type your reply here..."
                value={replyText}
                onChange={e => setReplyText(e.target.value)}
                autoFocus
              />
              <div className="px-4 py-3 bg-surface-container-low border-t border-outline-variant flex justify-between items-center">
                <div className="flex gap-2">
                  <button className="p-2 text-on-surface-variant hover:bg-surface-container-highest rounded-lg transition-colors cursor-pointer">
                    <span className="material-symbols-outlined text-[20px]">attachment</span>
                  </button>
                  <button className="p-2 text-on-surface-variant hover:bg-surface-container-highest rounded-lg transition-colors cursor-pointer">
                    <span className="material-symbols-outlined text-[20px]">image</span>
                  </button>
                </div>
                <div className="flex gap-3">
                  <button 
                    onClick={() => setIsReplying(false)}
                    className="px-4 py-2 text-label-md font-bold text-on-surface-variant hover:bg-surface-container-highest rounded-lg transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleSend}
                    disabled={!replyText.trim()}
                    className="px-6 py-2 bg-primary text-on-primary rounded-lg font-bold text-label-md hover:bg-primary-container hover:shadow-md transition-all cursor-pointer disabled:opacity-50 flex items-center gap-2"
                  >
                    <span>Send</span>
                    <span className="material-symbols-outlined text-[16px]">send</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div 
              onClick={() => setIsReplying(true)}
              className="mt-12 p-6 bg-surface-container rounded-2xl border border-outline-variant cursor-text hover:border-primary/50 transition-colors"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-[10px] font-bold">
                  ME
                </div>
                <span className="text-body-md text-on-surface-variant font-medium">
                  Click here to <span className="text-primary font-bold">Reply</span> or <span className="text-primary font-bold">Forward</span> this email
                </span>
              </div>
              <div className="flex justify-end gap-2">
                <button className="p-2 text-on-surface-variant hover:bg-surface-container-highest rounded-lg transition-colors cursor-pointer">
                  <span className="material-symbols-outlined">attachment</span>
                </button>
                <button className="p-2 text-on-surface-variant hover:bg-surface-container-highest rounded-lg transition-colors cursor-pointer">
                  <span className="material-symbols-outlined">image</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
