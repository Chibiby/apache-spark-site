// path: src/lib/events.ts
'use client';

export const openScheduleModal = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('spark:open-schedule'));
  }
};
