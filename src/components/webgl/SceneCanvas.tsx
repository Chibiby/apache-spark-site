// path: src/components/webgl/SceneCanvas.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { WebGLGuard } from './WebGLGuard';
import { PlotterField } from './PlotterField';
import { PaperGrainPass } from './PaperGrainPass';
import { PressSweepPass } from './PressSweepPass';
import { useMousePosition } from '@/hooks/useMousePosition';

export interface SceneCanvasProps {
  inverted?: boolean;
  heroProgress?: number;
  sweepProgress?: number;
}

export const SceneCanvas: React.FC<SceneCanvasProps> = ({
  inverted = false,
  heroProgress = 1.0,
  sweepProgress = 0.0,
}) => {
  const mouse = useMousePosition();
  const [isVisible, setIsVisible] = useState<boolean>(true);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(document.visibilityState === 'visible');
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Fallback SVG representation when WebGL is unavailable or disabled by user settings
  const fallback = (
    <div
      className="fixed inset-0 pointer-events-none select-none z-[-1] overflow-hidden"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-grid-draft opacity-40" />
      <svg
        className="w-full h-full opacity-20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line
          x1="10%"
          y1="20%"
          x2="90%"
          y2="20%"
          stroke="var(--rule)"
          strokeWidth="1"
          strokeDasharray="4 4"
        />
        <line
          x1="25%"
          y1="10%"
          x2="25%"
          y2="90%"
          stroke="var(--rule)"
          strokeWidth="1"
          strokeDasharray="4 4"
        />
        <circle cx="25%" cy="20%" r="4" fill="var(--accent)" />
        <circle cx="75%" cy="60%" r="4" fill="var(--ink)" />
        <line
          x1="25%"
          y1="20%"
          x2="75%"
          y2="60%"
          stroke="var(--rule)"
          strokeWidth="1"
        />
      </svg>
    </div>
  );

  return (
    <WebGLGuard fallback={fallback}>
      <div
        className="fixed inset-0 pointer-events-none select-none z-[-1] overflow-hidden"
        aria-hidden="true"
      >
        <Canvas
          dpr={[1, 1.75]}
          frameloop={isVisible ? 'always' : 'never'}
          gl={{
            antialias: true,
            alpha: true,
            depth: false,
            stencil: false,
            powerPreference: 'high-performance',
          }}
          camera={{ position: [0, 0, 1], fov: 60 }}
          style={{ width: '100%', height: '100%' }}
        >
          <PlotterField
            progress={heroProgress}
            mouse={{ normalizedX: mouse.normalizedX, normalizedY: mouse.normalizedY }}
            inverted={inverted}
          />
          <PaperGrainPass opacity={0.035} inverted={inverted} />
          {sweepProgress > 0 && sweepProgress < 1 && (
            <PressSweepPass progress={sweepProgress} inverted={inverted} />
          )}
        </Canvas>
      </div>
    </WebGLGuard>
  );
};
