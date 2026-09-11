// path: src/components/webgl/WebGLGuard.tsx
'use client';

import React from 'react';
import { useWebGLSupport } from '@/hooks/useWebGLSupport';

export interface WebGLGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const WebGLGuard: React.FC<WebGLGuardProps> = ({ children, fallback = null }) => {
  const { supported, checked } = useWebGLSupport();

  // If not yet verified or WebGL is unsupported / disabled by user settings, render fallback
  if (!checked || !supported) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};
