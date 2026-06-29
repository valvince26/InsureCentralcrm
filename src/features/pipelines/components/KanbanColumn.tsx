import React from "react";

export type KanbanColumnProps = {
  title: string;
  count: number;
  countColor?: string;
  countBg?: string;
  titleColor?: string;
  opacity?: string;
  isDropTarget?: boolean;
  children?: React.ReactNode;
};

export default function KanbanColumn({ 
  title, 
  count, 
  countColor = "text-label-md font-bold", 
  countBg = "bg-surface-container-highest", 
  titleColor = "text-on-surface", 
  opacity = "opacity-100",
  isDropTarget = false,
  children 
}: KanbanColumnProps) {
  return (
    <div className={`min-w-[300px] max-w-[300px] flex flex-col ${opacity}`}>
      <div className="flex items-center justify-between mb-4 px-2">
        <div className="flex items-center gap-2">
          <span className={`text-title-md font-title-md ${titleColor}`}>{title}</span>
          <span className={`${countBg} ${countColor} px-2 py-0.5 rounded`}>{count}</span>
        </div>
        <button className="text-on-surface-variant hover:text-primary cursor-pointer"><span className="material-symbols-outlined">more_horiz</span></button>
      </div>
      
      <div className="flex-1 space-y-3 overflow-y-auto custom-scrollbar pr-1">
        {isDropTarget ? (
          <div className="border-2 border-dashed border-outline-variant rounded-xl h-24 flex items-center justify-center text-on-surface-variant">
            <span className="material-symbols-outlined mr-2">add</span>
            <span className="text-label-md font-label-md">Drop here</span>
          </div>
        ) : children}
      </div>
    </div>
  );
}
