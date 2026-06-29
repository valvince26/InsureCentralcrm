"use client";

import React from "react";
import { useCrmStore } from "@/store/crmStore";

export default function ContactsPagination() {
  const { totalFromAPI, page, rowsPerPage, setPage, setRowsPerPage } = useCrmStore();

  const totalContacts = totalFromAPI;
  const totalPages = Math.max(1, Math.ceil(totalContacts / rowsPerPage));
  
  const startIdx = totalContacts === 0 ? 0 : (page - 1) * rowsPerPage + 1;
  const endIdx = Math.min(page * rowsPerPage, totalContacts);

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (page <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (page >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', page - 1, page, page + 1, '...', totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="p-4 bg-surface-container-low border-t border-outline-variant flex flex-wrap justify-between items-center gap-4">
      <div className="text-xs text-on-surface-variant font-medium">
        Showing <span className="text-on-surface font-bold">{startIdx}-{endIdx}</span> of <span className="text-on-surface font-bold">{totalContacts.toLocaleString()}</span> contacts
      </div>
      
      <div className="flex items-center gap-2">
        <button 
          onClick={() => setPage(Math.max(1, page - 1))}
          disabled={page === 1}
          className="p-2 border border-outline-variant rounded-lg bg-white text-on-surface-variant hover:bg-surface-container-lowest disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
        >
          <span className="material-symbols-outlined text-[18px]">chevron_left</span>
        </button>
        
        <div className="flex gap-1">
          {getPageNumbers().map((p, i) => (
            p === '...' ? (
              <span key={`ellipsis-${i}`} className="px-2 self-center text-on-surface-variant text-xs font-bold">...</span>
            ) : (
              <button 
                key={p}
                onClick={() => setPage(p as number)}
                className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-bold shadow-sm cursor-pointer ${
                  page === p 
                    ? "bg-primary text-white" 
                    : "bg-white border border-outline-variant text-on-surface-variant hover:bg-surface-container-lowest"
                }`}
              >
                {p}
              </button>
            )
          ))}
        </div>
        
        <button 
          onClick={() => setPage(Math.min(totalPages, page + 1))}
          disabled={page === totalPages}
          className="p-2 border border-outline-variant rounded-lg bg-white text-on-surface-variant hover:bg-surface-container-lowest disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
        >
          <span className="material-symbols-outlined text-[18px]">chevron_right</span>
        </button>
      </div>
      
      <div className="flex items-center gap-3">
        <span className="text-xs text-on-surface-variant">Rows per page:</span>
        <div className="relative">
          <select 
            value={rowsPerPage}
            onChange={(e) => setRowsPerPage(Number(e.target.value))}
            className="appearance-none bg-white border border-outline-variant px-3 py-1 pr-8 rounded-md text-xs font-bold focus:ring-0 cursor-pointer"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          <span className="material-symbols-outlined absolute right-1.5 top-1 text-[16px] pointer-events-none text-on-surface-variant">expand_more</span>
        </div>
      </div>
    </div>
  );
}
