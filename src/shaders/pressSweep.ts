// path: src/shaders/pressSweep.ts
import { GLSL_PALETTE } from './lib.glsl';

export const pressSweepVertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`;

export const pressSweepFragmentShader = `
uniform vec2 uResolution;
uniform float uProgress; // 0.0 to 1.0
uniform bool uInverted;
varying vec2 vUv;

${GLSL_PALETTE}

void main() {
  vec2 pixel = vUv * uResolution;
  float barX = uProgress * uResolution.x;
  
  // 3px solid accent bar
  float distToBar = abs(pixel.x - barX);
  float isBar = step(distToBar, 1.5);
  
  // Ink lift behind the bar
  float isPassed = step(pixel.x, barX);
  
  vec3 accentColor = uInverted ? ACCENT_LT : ACCENT;
  vec3 baseColor = uInverted ? PAPER : INK;
  
  // If directly on the 3px bar, output pure accent
  if (isBar > 0.5) {
    gl_FragColor = vec4(accentColor, 1.0);
    return;
  }
  
  // Otherwise fade and lift behind the front
  float alpha = isPassed * (1.0 - uProgress) * 0.12;
  gl_FragColor = vec4(baseColor, alpha);
}
`;
