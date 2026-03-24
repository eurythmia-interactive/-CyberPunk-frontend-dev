'use client';

import { useReducedMotion as useFramerReducedMotion } from 'framer-motion';

/**
 * Hook to detect user's motion preference.
 * Returns true if the user prefers reduced motion.
 * Falls back to false if the preference cannot be determined.
 */
export function useReducedMotion(): boolean {
  return useFramerReducedMotion() ?? false;
}
