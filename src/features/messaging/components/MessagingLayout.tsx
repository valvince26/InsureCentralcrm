import React from "react";

export default function MessagingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 top-[64px] left-[260px] flex overflow-hidden bg-background">
      {children}
    </div>
  );
}
