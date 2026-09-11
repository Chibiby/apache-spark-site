// path: src/hooks/useWebGLSupport.ts
'use client';

import { useState, useEffect } from 'react';
import { useReducedMotion } from './useReducedMotion';
import { useLowPowerMode } from './useLowPowerMode';

export interface WebGLSupportResult {
  supported: boolean;
  checked: boolean;
  reason?: string;
}

export function useWebGLSupport(): WebGLSupportResult {
  const prefersReduced = useReducedMotion();
  const isLowPower = useLowPowerMode();
  const [result, setResult] = useState<WebGLSupportResult>({
    supported: false,
    checked: false,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (prefersReduced) {
      setResult({
        supported: false,
        checked: true,
        reason: 'prefers-reduced-motion active',
      });
      return;
    }

    if (isLowPower) {
      setResult({
        supported: false,
        checked: true,
        reason: 'low-power mode active',
      });
      return;
    }

    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl2');
      if (!gl) {
        setResult({
          supported: false,
          checked: true,
          reason: 'WebGL2 unavailable',
        });
        return;
      }

      setResult({
        supported: true,
        checked: true,
      });
    } catch {
      setResult({
        supported: false,
        checked: true,
        reason: 'WebGL context initialization error',
      });
    }
  }, [prefersReduced, isLowPower]);

  return result;
}
