"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useUiStore } from '@/store/uiStore';

export default function GlobalPopup() {
  const { isOpen, type, title, message, defaultValue, closePopup } = useUiStore();
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && type === 'prompt') {
      setInputValue(defaultValue);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen, type, defaultValue]);

  if (!isOpen) return null;

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (type === 'prompt') {
      closePopup(inputValue);
    } else if (type === 'confirm') {
      closePopup(true);
    } else {
      closePopup(undefined);
    }
  };

  const handleCancel = () => {
    if (type === 'prompt') {
      closePopup(null);
    } else if (type === 'confirm') {
      closePopup(false);
    } else {
      closePopup(undefined);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div 
        className="bg-surface rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col border border-outline-variant/30"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 pb-4">
          <div className="flex items-center gap-3 mb-2">
            {type === 'alert' && <span className="material-symbols-outlined text-error text-[28px]">error</span>}
            {type === 'confirm' && <span className="material-symbols-outlined text-primary text-[28px]">help</span>}
            {type === 'prompt' && <span className="material-symbols-outlined text-primary text-[28px]">edit_square</span>}
            <h2 className="text-title-lg font-bold text-on-surface">{title}</h2>
          </div>
          <p className="text-body-md text-on-surface-variant whitespace-pre-wrap leading-relaxed">
            {message}
          </p>
          
          {type === 'prompt' && (
            <form onSubmit={handleSubmit} className="mt-4">
              <input 
                ref={inputRef}
                className="w-full px-4 py-3 border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-body-md bg-surface-container-lowest"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter value..."
              />
            </form>
          )}
        </div>
        
        <div className="px-6 py-4 bg-surface-container-lowest border-t border-outline-variant/50 flex justify-end gap-3">
          {(type === 'confirm' || type === 'prompt') && (
            <button 
              onClick={handleCancel}
              className="px-5 py-2 rounded-xl text-on-surface-variant font-semibold hover:bg-surface-container-low transition-colors cursor-pointer text-sm"
            >
              Cancel
            </button>
          )}
          <button 
            onClick={() => handleSubmit()}
            className={`px-5 py-2 rounded-xl font-bold shadow-sm transition-all cursor-pointer text-sm flex items-center gap-2 ${
              type === 'alert' || (type === 'confirm' && message.toLowerCase().includes('delete'))
                ? 'bg-error text-on-error hover:bg-error/90' 
                : 'bg-primary text-on-primary hover:bg-primary/90'
            }`}
          >
            {type === 'alert' ? 'OK' : type === 'confirm' ? 'Confirm' : 'Submit'}
          </button>
        </div>
      </div>
    </div>
  );
}
