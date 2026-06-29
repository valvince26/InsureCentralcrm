import React from "react";

export default function TaskFAB() {
  return (
    <button className="fixed bottom-8 right-8 w-14 h-14 bg-primary text-on-primary rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50 md:hidden cursor-pointer">
      <span className="material-symbols-outlined text-[32px]">add</span>
    </button>
  );
}
