// path: src/shaders/paperGrain.ts
import { GLSL_DITHER_8X8, GLSL_NOISE, GLSL_PALETTE } from './lib.glsl';

export const paperGrainVertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`;

export const paperGrainFragmentShader = `
uniform vec2 uResolution;
uniform float uTime;
uniform float uOpacity;
uniform bool uInverted;
varying vec2 vUv;

${GLSL_PALETTE}
${GLSL_DITHER_8X8}
${GLSL_NOISE}

void main() {
  vec2 screenCoord = vUv * uResolution;
  
  // Fibre noise: high-frequency procedural paper texture
  float fibre1 = snoise(screenCoord * 0.45);
  float fibre2 = snoise(screenCoord * 1.8 + vec2(uTime * 0.02, 0.0));
  float combinedFibre = (fibre1 * 0.65 + fibre2 * 0.35) * 0.5 + 0.5;
  
  // Ordered dither threshold
  float dither = dither8x8(screenCoord);
  float grain = step(dither, combinedFibre);
  
  // Luminance modulation only: strict opacity under 0.05
  float strength = (grain * 0.035) * clamp(uOpacity, 0.0, 0.05);
  
  // Render ink on paper or paper on ink
  vec3 grainColor = uInverted ? PAPER : INK;
  
  gl_FragColor = vec4(grainColor, strength);
}
`;
