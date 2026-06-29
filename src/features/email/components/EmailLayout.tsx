import React from "react";

export default function EmailLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="fixed inset-0 top-[64px] left-[260px] flex overflow-hidden z-10 print:hidden">
      {children}
    </main>
  );
}
