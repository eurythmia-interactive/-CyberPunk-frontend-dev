'use client';

import { motion, type Variants } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { MagneticButton } from './magnetic-button';

const ROLE_TEXT = 'FRONTEND ENGINEER';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 100,
      damping: 10,
    },
  },
};

export function Hero() {
  return (
    <section
      id="main-content"
      className="relative min-h-[80vh] flex items-center justify-center px-6"
    >
      <div className="absolute inset-0 overflow-hidden">
        {/* Radial gradient spotlight */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-brand-primary/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        className="relative z-10 max-w-4xl mx-auto text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Pre-title */}
        <motion.div variants={itemVariants} className="mb-6">
          <span className="inline-block px-4 py-1.5 rounded-full border border-brand-primary/30 bg-brand-primary/5 font-mono text-xs text-brand-primary uppercase tracking-widest">
            Cyberpunk Portfolio v1.0
          </span>
        </motion.div>

        {/* Main title */}
        <motion.h1 variants={itemVariants} className="mb-6">
          <span className="block text-display font-bold text-gradient-cyber leading-tight">
            Hello, World.
          </span>
        </motion.h1>

        {/* Subtitle / Role */}
        <motion.div variants={itemVariants} className="mb-8">
          <TypewriterRole />
        </motion.div>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="text-lg text-foreground/70 mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          Crafting digital experiences at the intersection of design and code. Specializing in
          modern frontend technologies with a cyberpunk aesthetic.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <MagneticButton
            onClick={() =>
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
            }
          >
            INITIALIZE_CONTACT
          </MagneticButton>

          <Link href="/projects">
            <Button variant="outline" size="lg" className="group">
              VIEW_PROJECTS
              <ArrowRight
                size={16}
                className="ml-2 transition-transform group-hover:translate-x-1"
              />
            </Button>
          </Link>
        </motion.div>

        {/* Tech stack pills */}
        <motion.div variants={itemVariants} className="mt-16">
          <p className="text-xs font-mono text-foreground/40 uppercase tracking-widest mb-4">
            Tech Stack
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Radix UI', 'Zustand'].map(
              (tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-full border border-border bg-surface/50 font-mono text-xs text-foreground/60"
                >
                  {tech}
                </span>
              )
            )}
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <motion.div
          className="w-6 h-10 rounded-full border-2 border-foreground/30 flex justify-center"
          animate={{
            borderColor: ['rgba(255,255,255,0.3)', 'rgba(0,240,255,0.8)', 'rgba(255,255,255,0.3)'],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-brand-primary mt-2"
            animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

// Typewriter effect for role text
function TypewriterRole() {
  const [displayed, setDisplayed] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < ROLE_TEXT.length) {
      const timeout = setTimeout(() => {
        setDisplayed(ROLE_TEXT.slice(0, currentIndex + 1));
        setCurrentIndex((prev) => prev + 1);
      }, 80);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex]);

  return (
    <h2 className="text-h2 font-mono text-brand-accent text-glow-green">
      {displayed}
      <span className="animate-pulse">|</span>
    </h2>
  );
}
