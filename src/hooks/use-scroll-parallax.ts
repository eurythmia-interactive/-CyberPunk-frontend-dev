'use client';

import { type MotionValue, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface UseScrollParallaxOptions {
  /** Speed multiplier for the parallax effect. 1 = normal, 0.5 = half speed, 2 = double speed */
  speed?: number;
  /** Direction of parallax: 'vertical' or 'horizontal' */
  direction?: 'vertical' | 'horizontal';
  /** Range of motion in pixels */
  range?: [number, number];
}

interface UseScrollParallaxReturn {
  ref: React.RefObject<HTMLDivElement | null>;
  scrollYProgress: MotionValue<number>;
  transform: MotionValue<number>;
}

/**
 * Creates a parallax effect tied to the scroll position.
 * @example
 * const { transform } = useScrollParallax({ speed: 0.5 });
 * <motion.div style={{ y: useTransform(scrollYProgress, [0, 1], [0, -100]) }} />
 */
export function useScrollParallax(options: UseScrollParallaxOptions = {}): UseScrollParallaxReturn {
  const { speed = 0.5, direction = 'vertical', range = [0, 1] } = options;
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const baseRange = range[1] - range[0];
  const translateRange = baseRange * speed * 100;

  const transform = useTransform(
    scrollYProgress,
    range,
    direction === 'vertical' ? [translateRange, -translateRange] : [0, 0]
  );

  return { ref, scrollYProgress, transform };
}

interface ParallaxLayer {
  speed: number;
  y: MotionValue<number>;
  opacity: MotionValue<number>;
}

/**
 * Creates multiple parallax layers at different speeds.
 * Useful for creating depth in background elements.
 * Note: Returns fixed layers (up to 3) to comply with React hooks rules.
 */
export function useParallaxLayers(): {
  ref: React.RefObject<HTMLDivElement | null>;
  layers: ParallaxLayer[];
  scrollYProgress: MotionValue<number>;
} {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Layer 1: slowest
  const layer1Y = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const layer1Opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Layer 2: medium
  const layer2Y = useTransform(scrollYProgress, [0, 1], [55, -55]);
  const layer2Opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Layer 3: fastest
  const layer3Y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const layer3Opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const layers: ParallaxLayer[] = [
    { speed: 0.3, y: layer1Y, opacity: layer1Opacity },
    { speed: 0.55, y: layer2Y, opacity: layer2Opacity },
    { speed: 0.8, y: layer3Y, opacity: layer3Opacity },
  ];

  return { ref, layers, scrollYProgress };
}
