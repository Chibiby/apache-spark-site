// path: src/components/webgl/PaperGrainPass.tsx
'use client';

import React, { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { paperGrainVertexShader, paperGrainFragmentShader } from '@/shaders/paperGrain';

export interface PaperGrainPassProps {
  opacity?: number;
  inverted?: boolean;
}

export const PaperGrainPass: React.FC<PaperGrainPassProps> = ({
  opacity = 0.045,
  inverted = false,
}) => {
  const { size } = useThree();
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);

  const uniforms = useMemo(
    () => ({
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
      uTime: { value: 0 },
      uOpacity: { value: opacity },
      uInverted: { value: inverted },
    }),
    [size.width, size.height, opacity, inverted]
  );

  useFrame((_, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value += delta;
      materialRef.current.uniforms.uResolution.value.set(size.width, size.height);
      materialRef.current.uniforms.uOpacity.value = opacity;
      materialRef.current.uniforms.uInverted.value = inverted;
    }
  });

  return (
    <mesh position={[0, 0, 0]}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={paperGrainVertexShader}
        fragmentShader={paperGrainFragmentShader}
        uniforms={uniforms}
        transparent
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  );
};
