// path: src/components/webgl/PressSweepPass.tsx
'use client';

import React, { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { pressSweepVertexShader, pressSweepFragmentShader } from '@/shaders/pressSweep';

export interface PressSweepPassProps {
  progress?: number;
  inverted?: boolean;
}

export const PressSweepPass: React.FC<PressSweepPassProps> = ({
  progress = 0,
  inverted = false,
}) => {
  const { size } = useThree();
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);

  const uniforms = useMemo(
    () => ({
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
      uProgress: { value: progress },
      uInverted: { value: inverted },
    }),
    [size.width, size.height, progress, inverted]
  );

  useFrame(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.uProgress.value = progress;
      materialRef.current.uniforms.uResolution.value.set(size.width, size.height);
      materialRef.current.uniforms.uInverted.value = inverted;
    }
  });

  if (progress <= 0 || progress >= 1) return null;

  return (
    <mesh position={[0, 0, 0.1]}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={pressSweepVertexShader}
        fragmentShader={pressSweepFragmentShader}
        uniforms={uniforms}
        transparent
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  );
};
