// path: src/components/webgl/CoverEngraveMesh.tsx
'use client';

import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { coverEngraveVertexShader, coverEngraveFragmentShader } from '@/shaders/coverEngrave';

export interface CoverEngraveMeshProps {
  texture: THREE.Texture;
  isHovered?: boolean;
  aspectRatio?: number;
}

export const CoverEngraveMesh: React.FC<CoverEngraveMeshProps> = ({
  texture,
  isHovered = false,
  aspectRatio = 16 / 9,
}) => {
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const hoverSpring = useRef<number>(0);

  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uResolution: { value: new THREE.Vector2(800, 800 / aspectRatio) },
      uHover: { value: 0 },
    }),
    [texture, aspectRatio]
  );

  useFrame((_, delta) => {
    // Spring physics towards target hover (0 or 1)
    const target = isHovered ? 1.0 : 0.0;
    const diff = target - hoverSpring.current;
    hoverSpring.current += diff * Math.min(1.0, delta * 12.0);

    if (materialRef.current) {
      materialRef.current.uniforms.uHover.value = hoverSpring.current;
    }
  });

  return (
    <mesh position={[0, 0, 0]}>
      <planeGeometry args={[2, 2 / aspectRatio]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={coverEngraveVertexShader}
        fragmentShader={coverEngraveFragmentShader}
        uniforms={uniforms}
        transparent
      />
    </mesh>
  );
};
