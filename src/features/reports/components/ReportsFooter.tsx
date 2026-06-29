import React from "react";

export default function ReportsFooter() {
  return (
    <footer className="flex justify-between items-center py-6 border-t border-outline-variant/20 text-on-surface-variant text-[12px]">
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-secondary-fixed animate-pulse"></span> Systems Active
        </span>
        <span>Last Updated: 12:42 PM</span>
      </div>
      <div className="flex gap-6">
        <a className="hover:text-primary transition-colors cursor-pointer" href="#">Documentation</a>
        <a className="hover:text-primary transition-colors cursor-pointer" href="#">API Status</a>
        <span>© 2023 InsureFlow Enterprise</span>
      </div>
    </footer>
  );
}
