"use client";

import React, { useState, useEffect, useTransition } from "react";
import { getPipelines, createPipeline, deletePipeline } from "@/features/settings/actions/crm.actions";
import { useUiStore } from "@/store/uiStore";

export default function PipelinesSettings() {
  const [pipelines, setPipelines] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { showConfirm } = useUiStore();
  const [isPending, startTransition] = useTransition();
  
  const [newName, setNewName] = useState("");

  const loadData = () => {
    getPipelines().then(data => {
      setPipelines(data);
      setLoading(false);
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreate = async () => {
    if (!newName.trim()) return;
    setSaving(true);
    await createPipeline(newName);
    setNewName("");
    loadData();
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    const confirmed = await showConfirm("Are you sure you want to delete this pipeline? All related stages and opportunity relations might be affected.");
    if (!confirmed) return;
    
    startTransition(async () => {
      await deletePipeline(id);
      loadData();
    });
  };

  if (loading) {
    return <div className="p-8 flex justify-center"><span className="material-symbols-outlined animate-spin text-[32px] text-primary">progress_activity</span></div>;
  }

  return (
    <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-8 shadow-sm">
      <div className="mb-6">
        <h2 className="text-title-lg font-bold text-on-surface">Pipelines & Stages</h2>
        <p className="text-body-md text-on-surface-variant mt-1">Manage your sales pipelines and customize the stages within each workflow.</p>
      </div>

      <div className="flex gap-4 items-end bg-surface-container-low p-6 rounded-lg border border-outline-variant mb-8">
        <div className="flex-1">
          <label className="block text-label-md font-bold text-on-surface mb-2">New Pipeline Name</label>
          <input 
            value={newName} 
            onChange={e => setNewName(e.target.value)} 
            placeholder="e.g. B2B Commercial Sales"
            className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-2.5 text-body-md focus:border-primary outline-none" 
          />
        </div>
        <button 
          onClick={handleCreate} 
          disabled={saving || !newName.trim()}
          className="px-6 py-2.5 bg-primary text-on-primary font-bold text-label-md rounded-lg hover:bg-primary-container disabled:opacity-50 transition-colors"
        >
          Create Pipeline
        </button>
      </div>

      <div className="space-y-6">
        {pipelines.map(pipeline => (
          <div key={pipeline.id} className="border border-outline-variant rounded-xl overflow-hidden shadow-sm">
            <div className="bg-surface-container-low px-6 py-4 flex items-center justify-between border-b border-outline-variant">
              <h3 className="text-title-md font-bold text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-primary">account_tree</span>
                {pipeline.name}
              </h3>
              <button 
                onClick={() => handleDelete(pipeline.id)}
                disabled={saving}
                className="text-on-surface-variant hover:text-error transition-colors p-1"
              >
                <span className="material-symbols-outlined text-[20px]">delete</span>
              </button>
            </div>
            <div className="p-6 bg-surface-container-lowest">
              <p className="text-label-md font-bold text-outline-variant uppercase mb-4 tracking-wider">Stages</p>
              
              {pipeline.stages?.length > 0 ? (
                <div className="space-y-2">
                  {pipeline.stages.map((stage: any) => (
                    <div key={stage.id} className="flex items-center gap-4 p-3 border border-outline-variant rounded-lg bg-surface">
                      <span className="material-symbols-outlined text-outline cursor-grab">drag_indicator</span>
                      <span className="font-medium text-on-surface flex-1">{stage.name}</span>
                      <span className="text-[10px] text-outline">Order: {stage.order}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 border border-dashed border-outline-variant rounded-lg text-center text-on-surface-variant italic">
                  No stages defined. Add stages to this pipeline to start tracking opportunities.
                </div>
              )}
              
              <button className="mt-4 flex items-center gap-2 text-primary font-bold text-label-md hover:bg-primary/10 px-4 py-2 rounded-lg transition-colors">
                <span className="material-symbols-outlined text-[18px]">add</span>
                Add Stage
              </button>
            </div>
          </div>
        ))}

        {pipelines.length === 0 && (
          <div className="p-8 text-center text-on-surface-variant italic border border-outline-variant rounded-xl">
            No pipelines created yet.
          </div>
        )}
      </div>
    </div>
  );
}
