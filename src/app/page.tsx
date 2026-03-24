'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { BootAnimation } from '@/components/layout/boot-animation';
import { Hero } from '@/components/layout/hero';
import { useBootStore } from '@/store/use-boot-store';

export default function Home() {
  const { isBooted } = useBootStore();

  return (
    <>
      {/* Boot Animation - shown until booted */}
      <AnimatePresence>{!isBooted && <BootAnimation />}</AnimatePresence>

      {/* Hero Content - shown after booted */}
      <AnimatePresence>
        {isBooted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Hero />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
