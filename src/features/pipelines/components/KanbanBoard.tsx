"use client";

import React, { useState, useTransition } from "react";
import KanbanColumn from "@/features/pipelines/components/KanbanColumn";
import KanbanCard from "@/features/pipelines/components/KanbanCard";
import { updateOpportunityStage } from "@/features/pipelines/actions/pipelines.actions";

export default function KanbanBoard({ pipeline }: { pipeline?: any }) {
  const [optimisticStages, setOptimisticStages] = useState(pipeline?.stages || []);
  const [isPending, startTransition] = useTransition();

  if (!pipeline) {
    return <div className="p-8 text-on-surface-variant">No pipeline found.</div>;
  }

  const handleDragStart = (e: React.DragEvent, opportunityId: string, sourceStageId: string) => {
    e.dataTransfer.setData("opportunityId", opportunityId);
    e.dataTransfer.setData("sourceStageId", sourceStageId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault(); // Necessary to allow dropping
  };

  const handleDrop = (e: React.DragEvent, targetStageId: string) => {
    e.preventDefault();
    const opportunityId = e.dataTransfer.getData("opportunityId");
    const sourceStageId = e.dataTransfer.getData("sourceStageId");

    if (!opportunityId || sourceStageId === targetStageId) return;

    // Optimistic UI Update
    const newStages = [...optimisticStages];
    
    let oppToMove: any = null;
    
    // Remove from source stage
    const sourceStageIndex = newStages.findIndex(s => s.id === sourceStageId);
    if (sourceStageIndex > -1) {
      const oppIndex = newStages[sourceStageIndex].opportunities.findIndex((o: any) => o.id === opportunityId);
      if (oppIndex > -1) {
        oppToMove = newStages[sourceStageIndex].opportunities.splice(oppIndex, 1)[0];
      }
    }

    // Add to target stage
    const targetStageIndex = newStages.findIndex(s => s.id === targetStageId);
    if (targetStageIndex > -1 && oppToMove) {
      newStages[targetStageIndex].opportunities.push({ ...oppToMove, stageId: targetStageId });
    }

    setOptimisticStages(newStages);

    // Persist to DB
    startTransition(async () => {
      try {
        await updateOpportunityStage(opportunityId, targetStageId);
      } catch (err) {
        console.error("Failed to update opportunity stage", err);
        // Revert on error (for simplicity, we just trigger a full reload or let server state catch up)
      }
    });
  };

  return (
    <section className="flex-1 overflow-x-auto px-8 pb-8 custom-scrollbar">
      <div className="flex h-full gap-4 pt-4">
        {optimisticStages.map((stage: any) => {
          // Calculate colors based on stage name for aesthetics
          const isWon = stage.name.toLowerCase().includes("won");
          const isLost = stage.name.toLowerCase().includes("lost");
          
          let titleColor = "text-on-surface";
          let countBg = "bg-surface-container-highest";
          let countColor = "text-label-md font-bold";
          let opacity = "opacity-100";

          if (isWon) {
            titleColor = "text-secondary";
            countBg = "bg-secondary-container";
            countColor = "text-on-secondary-container text-label-md font-bold";
          } else if (isLost) {
            titleColor = "text-error";
            countBg = "bg-error-container";
            countColor = "text-on-error-container text-label-md font-bold";
            opacity = "opacity-60";
          }

          return (
            <div 
              key={stage.id}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, stage.id)}
              className="h-full"
            >
              <KanbanColumn 
                title={stage.name} 
                count={stage.opportunities.length}
                titleColor={titleColor}
                countBg={countBg}
                countColor={countColor}
                opacity={opacity}
                isDropTarget={stage.opportunities.length === 0}
              >
                {stage.opportunities.map((opp: any) => (
                  <div
                    key={opp.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, opp.id, stage.id)}
                  >
                    <KanbanCard 
                      id={opp.id}
                      badgeType="LIFE" // Mock
                      badgeBg="bg-primary-fixed"
                      badgeText="text-on-primary-fixed"
                      duration={new Date(opp.createdAt).toLocaleDateString()}
                      name={opp.contact?.firstName + " " + (opp.contact?.lastName || "")}
                      value={`$${opp.value || 0}/yr`}
                      avatarSrc=""
                      borderColor="border-l-primary"
                      isWon={isWon}
                    />
                  </div>
                ))}
              </KanbanColumn>
            </div>
          );
        })}
      </div>
    </section>
  );
}
