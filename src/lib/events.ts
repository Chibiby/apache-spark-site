// path: src/lib/events.ts
'use client';

import React from 'react';

export interface ScheduleModalDetail {
  interest?: string;
  notes?: string;
}

export const openScheduleModal = (detail?: ScheduleModalDetail | React.MouseEvent) => {
  if (typeof window !== 'undefined') {
    const payload =
      detail && typeof detail === 'object' && !('nativeEvent' in detail)
        ? (detail as ScheduleModalDetail)
        : undefined;
    window.dispatchEvent(new CustomEvent('spark:open-schedule', { detail: payload }));
  }
};
