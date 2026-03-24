'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

interface ParallaxBackgroundProps {
  /** Speed multiplier for grid lines (0.5 = half speed) */
  gridSpeed?: number;
  /** Speed multiplier for decorative elements (1.2 = faster than scroll) */
  decorationSpeed?: number;
  /** Show decorative floating brackets */
  showDecorations?: boolean;
  className?: string;
}

/**
 * Creates a parallax background with grid lines and optional decorative elements.
 * Grid moves at 0.5x scroll speed, decorations at 1.2x for depth effect.
 * Respects prefers-reduced-motion by disabling parallax animations.
 */
export function ParallaxBackground({
  gridSpeed = 0.5,
  decorationSpeed = 1.2,
  showDecorations = true,
  className = '',
}: ParallaxBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Always call scroll hooks unconditionally to maintain consistent hook order
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  // Compute parallax transforms (only used if not reduced motion)
  const gridY = useTransform(scrollYProgress, [0, 1], [0, -300 * gridSpeed]);
  const decorationY = useTransform(scrollYProgress, [0, 1], [0, 200 * decorationSpeed]);
  const deco1Y = decorationY;
  const deco2Y = useTransform(decorationY, (v) => -v * 0.8);
  const deco3Y = useTransform(decorationY, (v) => v * 0.5);

  // Static grid pattern for reduced motion - no parallax movement
  if (prefersReducedMotion) {
    return (
      <div
        ref={ref}
        className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      >
        {/* Static grid - no motion */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 240, 255, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 240, 255, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Static decorations */}
        {showDecorations && (
          <>
            <div className="absolute top-20 left-10 text-brand-primary/10 font-mono text-6xl">
              [ ]
            </div>
            <div className="absolute top-40 right-20 text-brand-accent/10 font-mono text-8xl">
              {'{ }'}
            </div>
            <div className="absolute bottom-40 left-1/4 text-brand-primary/5 font-mono text-4xl">
              {'</>'}
            </div>
          </>
        )}

        {/* Gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-transparent" />
      </div>
    );
  }

  return (
    <div ref={ref} className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Parallax Grid Lines */}
      <motion.div
        className="absolute inset-0"
        style={{
          y: gridY,
          backgroundImage: `
            linear-gradient(rgba(0, 240, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 240, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Decorative floating brackets */}
      {showDecorations && (
        <>
          <motion.div
            className="absolute top-20 left-10 text-brand-primary/10 font-mono text-6xl"
            style={{ y: deco1Y }}
          >
            [ ]
          </motion.div>
          <motion.div
            className="absolute top-40 right-20 text-brand-accent/10 font-mono text-8xl"
            style={{ y: deco2Y }}
          >
            {'{ }'}
          </motion.div>
          <motion.div
            className="absolute bottom-40 left-1/4 text-brand-primary/5 font-mono text-4xl"
            style={{ y: deco3Y }}
          >
            {'</>'}
          </motion.div>
        </>
      )}

      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-transparent" />
    </div>
  );
}

/**
 * A single parallax layer that can be used for custom effects.
 */
export function ParallaxLayer({
  children,
  speed = 1,
  className = '',
}: {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed]);

  // For reduced motion, don't apply parallax
  if (prefersReducedMotion) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}
