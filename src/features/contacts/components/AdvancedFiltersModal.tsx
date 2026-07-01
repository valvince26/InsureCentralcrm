"use client";

import React from "react";
import { useCrmStore, AdvancedFilterGroup, AdvancedFilterRule } from "@/store/crmStore";

export default function AdvancedFiltersModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { advancedFilterGroups, setAdvancedFilterGroups } = useCrmStore();

  if (!isOpen) return null;

  const addGroup = () => {
    const newGroup: AdvancedFilterGroup = {
      id: "group-" + Date.now(),
      logic: 'AND',
      rules: [{ id: "rule-" + Date.now(), field: 'Tag', operator: 'Is', value: '' }]
    };
    setAdvancedFilterGroups([...advancedFilterGroups, newGroup]);
  };

  const addRuleToGroup = (groupId: string) => {
    setAdvancedFilterGroups(advancedFilterGroups.map(g => {
      if (g.id === groupId) {
        return { ...g, rules: [...g.rules, { id: "rule-" + Date.now(), field: 'Tag', operator: 'Is', value: '' }] };
      }
      return g;
    }));
  };

  const updateRule = (groupId: string, ruleId: string, updates: Partial<AdvancedFilterRule>) => {
    setAdvancedFilterGroups(advancedFilterGroups.map(g => {
      if (g.id === groupId) {
        return {
          ...g,
          rules: g.rules.map(r => r.id === ruleId ? { ...r, ...updates } : r)
        };
      }
      return g;
    }));
  };

  const removeRule = (groupId: string, ruleId: string) => {
    setAdvancedFilterGroups(advancedFilterGroups.map(g => {
      if (g.id === groupId) {
        return { ...g, rules: g.rules.filter(r => r.id !== ruleId) };
      }
      return g;
    }).filter(g => g.rules.length > 0)); // Remove empty groups automatically
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-surface shadow-2xl w-full max-w-lg rounded-2xl flex flex-col max-h-[calc(100vh-4rem)]">
        <div className="px-6 py-4 border-b border-outline-variant flex justify-between items-center">
          <h2 className="text-title-lg font-semibold text-on-surface">Advanced filters</h2>
          <button onClick={onClose} className="p-2 text-on-surface-variant hover:text-on-surface rounded-full hover:bg-surface-container cursor-pointer">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="p-6 flex-1 overflow-y-auto space-y-6 bg-surface-container-lowest">
          {advancedFilterGroups.length === 0 && (
            <div className="text-center py-8 text-on-surface-variant">
              No advanced filters applied.
            </div>
          )}

          {advancedFilterGroups.map((group, groupIndex) => (
            <div key={group.id} className="relative">
              {groupIndex > 0 && (
                <div className="flex items-center justify-center mb-6">
                  <span className="bg-surface-container px-3 py-1 rounded-full text-xs font-bold text-on-surface-variant">OR</span>
                </div>
              )}
              
              <div className="border border-outline-variant rounded-xl p-4 bg-white shadow-sm">
                {group.rules.map((rule, ruleIndex) => (
                  <div key={rule.id}>
                    {ruleIndex > 0 && (
                      <div className="flex items-center my-4 relative">
                        <div className="absolute w-full border-t border-outline-variant"></div>
                        <div className="mx-auto bg-surface-container px-3 py-0.5 rounded-full text-[10px] font-bold text-on-surface-variant relative z-10 uppercase">{group.logic}</div>
                      </div>
                    )}
                    
                    <div className="flex flex-col gap-3">
                      <div className="flex gap-3 items-center">
                        <div className="flex-1 border border-outline-variant rounded-lg px-3 py-2 flex justify-between items-center bg-surface-container-lowest">
                          <span className="text-sm font-medium">{rule.field}</span>
                          <span className="material-symbols-outlined text-[16px] text-outline-variant">edit</span>
                        </div>
                        <select 
                          className="flex-1 border border-outline-variant rounded-lg px-3 py-2 text-sm outline-none bg-surface-container-lowest appearance-none cursor-pointer"
                          value={rule.operator}
                          onChange={(e) => updateRule(group.id, rule.id, { operator: e.target.value })}
                        >
                          <option>Is</option>
                          <option>Is not</option>
                        </select>
                      </div>
                      
                      <div className="flex gap-3">
                        <div className="flex-1 relative">
                          <input 
                            className="w-full border border-outline-variant rounded-lg px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                            placeholder="Enter tag name..."
                            value={rule.value}
                            onChange={(e) => updateRule(group.id, rule.id, { value: e.target.value })}
                          />
                        </div>
                        <button 
                          onClick={() => removeRule(group.id, rule.id)}
                          className="w-10 h-10 border border-outline-variant rounded-lg flex items-center justify-center text-on-surface-variant hover:text-error hover:border-error transition-colors cursor-pointer bg-white"
                        >
                          <span className="material-symbols-outlined text-[20px]">delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                
                <button 
                  onClick={() => addRuleToGroup(group.id)}
                  className="mt-6 flex items-center gap-1.5 text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">add</span>
                  Add nested filter
                </button>
              </div>
            </div>
          ))}

          <button 
            onClick={addGroup}
            className="flex items-center gap-1.5 px-4 py-2 border border-outline-variant rounded-lg text-sm font-semibold text-on-surface-variant hover:bg-surface-container-low transition-colors cursor-pointer bg-white shadow-sm"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            Add Filter
          </button>
        </div>
      </div>
    </div>
  );
}
