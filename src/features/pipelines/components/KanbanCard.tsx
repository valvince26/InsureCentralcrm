import React from "react";

export type KanbanCardProps = {
  id: string;
  badgeType: "LIFE" | "AUTO" | "HEALTH" | "HOME" | "COMMERCIAL";
  badgeBg: string;
  badgeText: string;
  duration: string;
  name: string;
  value: string;
  avatarSrc: string;
  iconBg?: string;
  iconText?: string;
  actionIcon?: string;
  actionColor?: string;
  borderColor: string;
  isWon?: boolean;
};

export default function KanbanCard({ 
  badgeBg, 
  badgeText, 
  duration, 
  name, 
  value, 
  avatarSrc, 
  actionIcon, 
  actionColor, 
  borderColor,
  isWon 
}: KanbanCardProps) {
  if (isWon) {
    return (
      <div className={`bg-secondary-container/10 border border-secondary/20 rounded-xl p-4 shadow-sm border-l-4 ${borderColor}`}>
        <div className="flex justify-between items-start mb-2">
          <span className={`${badgeBg} ${badgeText} px-2 py-0.5 rounded text-[10px] font-bold tracking-wider`}>LIFE</span>
          <span className="material-symbols-outlined text-secondary text-[16px]">verified</span>
        </div>
        <h4 className="text-title-md font-title-md mb-1">{name}</h4>
        <p className="text-body-md font-bold text-secondary mb-4">{value}</p>
      </div>
    );
  }

  return (
    <div className={`bg-surface-container-lowest border border-outline-variant rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing border-l-4 ${borderColor}`}>
      <div className="flex justify-between items-start mb-2">
        <span className={`${badgeBg} ${badgeText} px-2 py-0.5 rounded text-[10px] font-bold tracking-wider`}>
          {badgeBg.includes("primary") && !badgeBg.includes("primary-fixed-dim") ? "LIFE" :
           badgeBg.includes("secondary") && !badgeBg.includes("secondary-fixed-dim") ? "AUTO" :
           badgeBg.includes("primary-fixed-dim") ? "HEALTH" :
           badgeBg.includes("secondary-fixed-dim") ? "HOME" : "COMMERCIAL"}
        </span>
        <span className="text-label-md text-on-surface-variant">{duration}</span>
      </div>
      <h4 className="text-title-md font-title-md mb-1">{name}</h4>
      <p className="text-body-md font-bold text-primary mb-4">{value}</p>
      <div className="flex justify-between items-center">
        {avatarSrc ? (
          <div className="flex -space-x-2">
            <img className="w-6 h-6 rounded-full border border-outline-variant object-cover" alt={name} src={avatarSrc} />
          </div>
        ) : null}
        
        {actionIcon === "connected" ? (
          <div className="flex gap-1">
            <span className="material-symbols-outlined text-secondary text-[18px]">check_circle</span>
            <span className="material-symbols-outlined text-on-surface-variant text-[18px]">call</span>
          </div>
        ) : actionIcon ? (
          <span className={`material-symbols-outlined ${actionColor} text-[18px]`}>{actionIcon}</span>
        ) : null}
      </div>
    </div>
  );
}
