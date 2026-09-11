// path: src/hooks/useLowPowerMode.ts
'use client';

import { useState, useEffect } from 'react';

export function useLowPowerMode(): boolean {
  const [isLowPower, setIsLowPower] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (typeof navigator.hardwareConcurrency === 'number' && navigator.hardwareConcurrency < 4) {
      setIsLowPower(true);
      return;
    }

    const conn = (navigator as unknown as { connection?: { saveData?: boolean } }).connection;
    if (conn && conn.saveData === true) {
      setIsLowPower(true);
      return;
    }

    setIsLowPower(false);
  }, []);

  return isLowPower;
}
