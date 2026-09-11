// path: src/hooks/useLockBodyScroll.ts
'use client';

import { useEffect } from 'react';

export function useLockBodyScroll(lock: boolean = true): void {
  useEffect(() => {
    if (typeof window === 'undefined' || !lock) return;

    const originalOverflow = document.documentElement.style.overflow;
    const originalBodyOverflow = document.body.style.overflow;

    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    return () => {
      document.documentElement.style.overflow = originalOverflow;
      document.body.style.overflow = originalBodyOverflow;
    };
  }, [lock]);
}
