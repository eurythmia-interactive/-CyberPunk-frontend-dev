'use client';

import { type MotionProps, motion, useInView, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';
import { useRef } from 'react';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

interface RevealProps extends MotionProps {
  children: ReactNode;
  /** Delay in ms before animation starts */
  delay?: number;
  /** Duration of the animation in seconds */
  duration?: number;
  /** Vertical distance to move during animation */
  y?: number;
  /** Horizontal distance to move during animation */
  x?: number;
  /** Scale start value */
  scale?: number;
  /** Use spring physics for smoother animation */
  spring?: boolean;
  /** Direction of reveal */
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  className?: string;
}

const springTransition = {
  type: 'spring' as const,
  stiffness: 260,
  damping: 20,
};

const tweenTransition = {
  duration: 0.5,
  ease: [0.25, 0.46, 0.45, 0.94] as const,
};

export function Reveal({
  children,
  delay = 0,
  duration = 0.5,
  y = 20,
  x = 0,
  scale = 0.95,
  spring = true,
  direction = 'up',
  className,
  ...props
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const prefersReducedMotion = useReducedMotion();

  const getInitialPosition = () => {
    switch (direction) {
      case 'up':
        return { y, x: 0 };
      case 'down':
        return { y: -y, x: 0 };
      case 'left':
        return { x, y: 0 };
      case 'right':
        return { x: -x, y: 0 };
      case 'none':
        return { x: 0, y: 0 };
    }
  };

  // Simplified animation for reduced motion - just fade in
  if (prefersReducedMotion) {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.2, delay }}
        className={className}
        {...props}
      >
        {children}
      </motion.div>
    );
  }

  const initial = {
    opacity: 0,
    scale,
    ...getInitialPosition(),
  };

  const animate = {
    opacity: isInView ? 1 : 0,
    scale: isInView ? 1 : scale,
    x: isInView ? 0 : getInitialPosition().x,
    y: isInView ? 0 : getInitialPosition().y,
  };

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={animate}
      transition={spring ? { ...springTransition, delay } : { ...tweenTransition, delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

interface RevealGroupProps extends MotionProps {
  children: ReactNode;
  /** Stagger interval between children in seconds */
  staggerInterval?: number;
  /** Initial delay before stagger starts */
  staggerDelay?: number;
  className?: string;
}

export function RevealGroup({
  children,
  staggerInterval = 0.1,
  staggerDelay = 0,
  className,
  ...props
}: RevealGroupProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const prefersReducedMotion = useReducedMotion();

  // Simplified variants for reduced motion - just fade in
  const reducedVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerInterval,
        delayChildren: staggerDelay,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={prefersReducedMotion ? reducedVariants : containerVariants}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: springTransition,
  },
};

interface RevealItemProps extends MotionProps {
  children: React.ReactNode;
  className?: string;
}

export function RevealItem({ children, className, ...props }: RevealItemProps) {
  const prefersReducedMotion = useReducedMotion();

  // Simplified variants for reduced motion
  const reducedItemVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <motion.div
      variants={prefersReducedMotion ? reducedItemVariants : itemVariants}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
