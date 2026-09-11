// path: src/components/webgl/PlotterField.tsx
'use client';

import React, { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import {
  plotterNodeVertexShader,
  plotterNodeFragmentShader,
  plotterLineVertexShader,
  plotterLineFragmentShader,
} from '@/shaders/plotterField';

export interface PlotterFieldProps {
  progress?: number;
  mouse?: { normalizedX: number; normalizedY: number };
  inverted?: boolean;
}

export const PlotterField: React.FC<PlotterFieldProps> = ({
  progress = 1.0,
  mouse,
  inverted = false,
}) => {
  const { size, viewport } = useThree();
  const nodeMaterialRef = useRef<THREE.ShaderMaterial | null>(null);
  const lineMaterialRef = useRef<THREE.ShaderMaterial | null>(null);

  // Generate deterministic grid and network topology
  const { nodePositions, initialPosArray, randomArray, linePositions, lineRandoms } =
    useMemo(() => {
      const nodeCount = 96;
      const nodes: [number, number, number][] = [];
      const initPos: number[] = [];
      const rands: number[] = [];

      // Create structured network topology suggesting racks and routes
      for (let i = 0; i < nodeCount; i++) {
        // Grid clusters
        const col = (i % 12) - 5.5;
        const row = Math.floor(i / 12) - 3.5;
        const jitterX = ((i * 37) % 100) / 300 - 0.16;
        const jitterY = ((i * 53) % 100) / 300 - 0.16;

        const x = (col / 6.0) * 1.8 + jitterX;
        const y = (row / 4.0) * 1.1 + jitterY;
        const z = 0;

        nodes.push([x, y, z]);
        initPos.push(x, y, z);
        rands.push(((i * 73) % 100) / 100);
      }

      // Generate connecting segments between nearest neighbours with balanced airiness
      const lines: number[] = [];
      const lRands: number[] = [];

      for (let i = 0; i < nodes.length; i++) {
        let connections = 0;
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i][0] - nodes[j][0];
          const dy = nodes[i][1] - nodes[j][1];
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 0.32 && connections < 2) {
            lines.push(
              nodes[i][0], nodes[i][1], nodes[i][2],
              nodes[j][0], nodes[j][1], nodes[j][2]
            );
            const isAccent = (i + j) % 11 === 0 ? 0.95 : 0.1;
            lRands.push(isAccent, isAccent);
            connections++;
          }
        }
      }

      return {
        nodePositions: new Float32Array(initPos),
        initialPosArray: new Float32Array(initPos),
        randomArray: new Float32Array(rands),
        linePositions: new Float32Array(lines),
        lineRandoms: new Float32Array(lRands),
      };
    }, []);

  const nodeUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uProgress: { value: progress },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uAspect: { value: size.width / Math.max(1, size.height) },
      uInverted: { value: inverted },
    }),
    [progress, size.width, size.height, inverted]
  );

  const lineUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uProgress: { value: progress },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uAspect: { value: size.width / Math.max(1, size.height) },
      uInverted: { value: inverted },
    }),
    [progress, size.width, size.height, inverted]
  );

  useFrame((_, delta) => {
    const timeVal = delta;
    const aspect = size.width / Math.max(1, size.height);
    const mx = mouse ? mouse.normalizedX : 0;
    const my = mouse ? mouse.normalizedY : 0;

    if (nodeMaterialRef.current) {
      nodeMaterialRef.current.uniforms.uTime.value += timeVal;
      nodeMaterialRef.current.uniforms.uProgress.value = progress;
      nodeMaterialRef.current.uniforms.uMouse.value.set(mx, my);
      nodeMaterialRef.current.uniforms.uAspect.value = aspect;
      nodeMaterialRef.current.uniforms.uInverted.value = inverted;
    }

    if (lineMaterialRef.current) {
      lineMaterialRef.current.uniforms.uTime.value += timeVal;
      lineMaterialRef.current.uniforms.uProgress.value = progress;
      lineMaterialRef.current.uniforms.uMouse.value.set(mx, my);
      lineMaterialRef.current.uniforms.uAspect.value = aspect;
      lineMaterialRef.current.uniforms.uInverted.value = inverted;
    }
  });

  return (
    <group position={[0, 0, 0]} scale={[viewport.width / 2.4, viewport.height / 2.0, 1]}>
      {/* Network Lines */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
          <bufferAttribute
            attach="attributes-aRandom"
            args={[lineRandoms, 1]}
          />
        </bufferGeometry>
        <shaderMaterial
          ref={lineMaterialRef}
          vertexShader={plotterLineVertexShader}
          fragmentShader={plotterLineFragmentShader}
          uniforms={lineUniforms}
          transparent
          depthTest={false}
          depthWrite={false}
        />
      </lineSegments>

      {/* Network Nodes */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[nodePositions, 3]}
          />
          <bufferAttribute
            attach="attributes-aInitialPos"
            args={[initialPosArray, 3]}
          />
          <bufferAttribute
            attach="attributes-aRandom"
            args={[randomArray, 1]}
          />
        </bufferGeometry>
        <shaderMaterial
          ref={nodeMaterialRef}
          vertexShader={plotterNodeVertexShader}
          fragmentShader={plotterNodeFragmentShader}
          uniforms={nodeUniforms}
          transparent
          depthTest={false}
          depthWrite={false}
        />
      </points>
    </group>
  );
};
