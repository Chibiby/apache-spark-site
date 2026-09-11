// path: src/lib/animations.ts

/**
 * Brand easing functions (mathematically exact)
 */
export const easeOutQuart = (t: number): number => 1 - Math.pow(1 - t, 4);
export const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);
export const easeInOutQuart = (t: number): number =>
  t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
export const easeOutBack = (t: number): number => {
  const c = 1.70158;
  return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2);
};

export function seg(
  t: number,
  start: number,
  dur: number,
  ease: (val: number) => number = easeOutQuart
): number {
  let u = (t - start) / dur;
  u = u < 0 ? 0 : u > 1 ? 1 : u;
  return ease(u);
}

/**
 * Cubic-bezier curves for CSS / Motion
 */
export const BEZIER = {
  easeOutQuart: [0.165, 0.84, 0.44, 1],
  easeOutCubic: [0.33, 1, 0.68, 1],
  easeInOutQuart: [0.76, 0, 0.24, 1],
  easeOutBack: [0.34, 1.56, 0.64, 1],
} as const;

/**
 * Preloader Cue Sheet (Seconds, exact)
 */
export const CUE_SHEET = {
  TOTAL: 3.0,
  LOCATE: 0.00,
  DRAFT: 0.62,
  SET: 1.42,
  PRINT: 2.50,
  MIN_HOLD: 1.1,
  HOLD_CAP: 4.0,
} as const;

/**
 * Motion animation presets reflecting the five gestures
 */
export const GESTURES = {
  drawStroke: {
    initial: { strokeDashoffset: 1 },
    animate: { strokeDashoffset: 0 },
    transition: { duration: 0.48, ease: BEZIER.easeInOutQuart },
  },
  wipeWord: {
    initial: { clipPath: 'inset(0 100% 0 0)' },
    animate: { clipPath: 'inset(0 0 0 0)' },
    transition: { duration: 0.42, ease: BEZIER.easeInOutQuart },
  },
  scaleXRule: {
    initial: { transformOrigin: '0% 50%', scaleX: 0 },
    animate: { scaleX: 1 },
    transition: { duration: 0.46, ease: BEZIER.easeInOutQuart },
  },
  popItem: {
    initial: { opacity: 0, scale: 0.82 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.32, ease: BEZIER.easeOutCubic },
  },
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.36, ease: BEZIER.easeOutQuart },
  },
};

export const staggerContainer = (delayChildren = 0.08, staggerChildren = 0.12) => ({
  initial: {},
  animate: {
    transition: {
      delayChildren,
      staggerChildren,
    },
  },
});

/**
 * Bidirectional scroll presets that animate forward on scroll down and reverse on scroll backward
 */
export const BIDIRECTIONAL = {
  fadeUp: {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: false, amount: 0.2 },
    transition: { duration: 0.48, ease: BEZIER.easeOutQuart },
  },
  fadeSlideRight: {
    initial: { opacity: 0, x: -28 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: false, amount: 0.2 },
    transition: { duration: 0.5, ease: BEZIER.easeOutQuart },
  },
  scaleUp: {
    initial: { opacity: 0, scale: 0.92 },
    whileInView: { opacity: 1, scale: 1 },
    viewport: { once: false, amount: 0.2 },
    transition: { duration: 0.44, ease: BEZIER.easeOutCubic },
  },
  expandRule: {
    initial: { scaleX: 0, transformOrigin: '0% 50%' },
    whileInView: { scaleX: 1 },
    viewport: { once: false, amount: 0.2 },
    transition: { duration: 0.56, ease: BEZIER.easeInOutQuart },
  },
};
