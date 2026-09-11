// path: src/shaders/plotterField.ts
import { GLSL_NOISE, GLSL_PALETTE } from './lib.glsl';

export const plotterNodeVertexShader = `
uniform float uTime;
uniform float uProgress; // 0.0 to 1.0 plotter draw front
uniform vec2 uMouse;     // -1.0 to 1.0 normalized
uniform float uAspect;
attribute float aRandom;
attribute vec3 aInitialPos;

varying float vAlpha;
varying float vIsAccent;

${GLSL_NOISE}

void main() {
  vec3 pos = aInitialPos;
  
  // Pen-plotter reveal: compare normalized X (-1.0..1.0) against progress
  float normX = (pos.x + 1.2) / 2.4;
  float revealFront = step(normX, uProgress);
  
  // Idle curl drift at low amplitude
  vec2 curl = vec2(
    snoise(pos.xy * 1.5 + vec2(uTime * 0.05, 0.0)),
    snoise(pos.xy * 1.5 + vec2(0.0, uTime * 0.05))
  ) * 0.035;
  pos.xy += curl;
  
  // Gentle mouse deflection within radius
  vec2 mouseDist = pos.xy - uMouse;
  mouseDist.x *= uAspect;
  float d = length(mouseDist);
  if (d < 0.25) {
    float push = (1.0 - d / 0.25) * 0.02;
    pos.xy += normalize(mouseDist) * push;
  }
  
  vAlpha = revealFront;
  vIsAccent = step(0.92, aRandom); // Accent on under 10% of nodes/edges
  
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  gl_PointSize = vIsAccent > 0.5 ? 2.4 : 1.8;
}
`;

export const plotterNodeFragmentShader = `
uniform bool uInverted;
varying float vAlpha;
varying float vIsAccent;

${GLSL_PALETTE}

void main() {
  if (vAlpha < 0.01) discard;
  
  // Square point to match drafting aesthetic
  vec3 color = vIsAccent > 0.5
    ? (uInverted ? ACCENT_LT : ACCENT)
    : (uInverted ? PAPER : INK);
    
  // Faded node opacity so text remains clear
  float nodeAlpha = vIsAccent > 0.5 ? 0.24 : 0.12;
  gl_FragColor = vec4(color, vAlpha * nodeAlpha);
}
`;

export const plotterLineVertexShader = `
uniform float uTime;
uniform float uProgress;
uniform vec2 uMouse;
uniform float uAspect;
attribute float aRandom;

varying float vAlpha;
varying float vIsAccent;

${GLSL_NOISE}

void main() {
  vec3 pos = position;
  
  float normX = (pos.x + 1.2) / 2.4;
  float revealFront = step(normX, uProgress);
  
  vec2 curl = vec2(
    snoise(pos.xy * 1.5 + vec2(uTime * 0.05, 0.0)),
    snoise(pos.xy * 1.5 + vec2(0.0, uTime * 0.05))
  ) * 0.035;
  pos.xy += curl;
  
  // Gentle mouse deflection within radius
  vec2 mouseDist = pos.xy - uMouse;
  mouseDist.x *= uAspect;
  float d = length(mouseDist);
  if (d < 0.25) {
    float push = (1.0 - d / 0.25) * 0.02;
    pos.xy += normalize(mouseDist) * push;
  }
  
  vAlpha = revealFront;
  vIsAccent = step(0.92, aRandom);
  
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

export const plotterLineFragmentShader = `
uniform bool uInverted;
varying float vAlpha;
varying float vIsAccent;

${GLSL_PALETTE}

void main() {
  if (vAlpha < 0.01) discard;
  
  vec3 color = vIsAccent > 0.5
    ? (uInverted ? ACCENT_LT : ACCENT)
    : (uInverted ? PAPER : INK);
    
  // Faded architectural watermark line alpha (faded, unobtrusive)
  float lineAlpha = vIsAccent > 0.5 ? 0.16 : 0.065;
  gl_FragColor = vec4(color, vAlpha * lineAlpha);
}
`;
