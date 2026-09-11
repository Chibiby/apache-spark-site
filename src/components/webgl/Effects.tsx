// path: src/components/webgl/Effects.tsx
'use client';

import React from 'react';
import { PaperGrainPass } from './PaperGrainPass';

export interface EffectsProps {
  inverted?: boolean;
}

export const Effects: React.FC<EffectsProps> = ({ inverted = false }) => {
  return (
    <group>
      <PaperGrainPass opacity={0.04} inverted={inverted} />
    </group>
  );
};
