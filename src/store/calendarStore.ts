import { create } from 'zustand';

interface CalendarState {
  currentDate: Date;
  viewMode: 'month' | 'week' | 'day';
  setCurrentDate: (date: Date) => void;
  setViewMode: (mode: 'month' | 'week' | 'day') => void;
  nextMonth: () => void;
  prevMonth: () => void;
  setToday: () => void;
}

export const useCalendarStore = create<CalendarState>((set) => ({
  currentDate: new Date(),
  viewMode: 'month',
  setCurrentDate: (date) => set({ currentDate: date }),
  setViewMode: (mode) => set({ viewMode: mode }),
  nextMonth: () => set((state) => {
    const next = new Date(state.currentDate);
    next.setMonth(next.getMonth() + 1);
    return { currentDate: next };
  }),
  prevMonth: () => set((state) => {
    const prev = new Date(state.currentDate);
    prev.setMonth(prev.getMonth() - 1);
    return { currentDate: prev };
  }),
  setToday: () => set({ currentDate: new Date() }),
}));
