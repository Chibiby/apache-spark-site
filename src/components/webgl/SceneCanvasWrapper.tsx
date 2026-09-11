'use client';
// path: src/components/webgl/SceneCanvasWrapper.tsx
import React from 'react';
import dynamic from 'next/dynamic';

const SceneCanvas = dynamic(
  () => import('./SceneCanvas').then((mod) => mod.SceneCanvas),
  { ssr: false }
);

export function SceneCanvasWrapper() {
  return <SceneCanvas />;
}
