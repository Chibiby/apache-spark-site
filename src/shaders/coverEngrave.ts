// path: src/shaders/coverEngrave.ts
import { GLSL_DITHER_8X8, GLSL_PALETTE } from './lib.glsl';

export const coverEngraveVertexShader = `
uniform float uHover; // 0.0 to 1.0 spring
varying vec2 vUv;

void main() {
  vUv = uv;
  vec3 pos = position;
  
  // 1.02 scale on hover
  pos.xy *= (1.0 + uHover * 0.02);
  
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

export const coverEngraveFragmentShader = `
uniform sampler2D uTexture;
uniform vec2 uResolution;
uniform float uHover;
varying vec2 vUv;

${GLSL_PALETTE}
${GLSL_DITHER_8X8}

void main() {
  vec2 pixel = vUv * uResolution;
  
  // 1px Riso misregistration between ink and accent channels on hover (NOT RGB chromatic aberration)
  vec2 misregistration = vec2(1.0, 0.5) / uResolution * uHover;
  
  vec4 baseSample = texture2D(uTexture, vUv);
  vec4 offsetSample = texture2D(uTexture, vUv + misregistration);
  
  // Halftone dither threshold
  float dither = dither8x8(pixel);
  float luma = dot(baseSample.rgb, vec3(0.299, 0.587, 0.114));
  float engraved = step(dither, luma);
  
  // Base plate colors
  vec3 outColor = mix(INK, PAPER, engraved);
  
  // Inject accent channel on misregistered edge
  float edgeDiff = abs(baseSample.a - offsetSample.a) + abs(dot(baseSample.rgb - offsetSample.rgb, vec3(1.0)));
  if (edgeDiff > 0.15 && uHover > 0.05) {
    outColor = mix(outColor, ACCENT, clamp(edgeDiff * uHover, 0.0, 1.0));
  }
  
  gl_FragColor = vec4(outColor, baseSample.a);
}
`;
