'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useTypewriter } from '@/hooks/use-typewriter';
import { useBootStore } from '@/store/use-boot-store';

const BOOT_SEQUENCE = [
  'INITIALIZING SYSTEM...',
  'LOADING KERNEL MODULES...',
  'MOUNTING FILE SYSTEMS...',
  'ESTABLISHING NEURAL LINK...',
  'CALIBRATING DISPLAY INTERFACE...',
  'LOADING USER PROFILE...',
  'ACCESS GRANTED',
];

const CURSOR_BLINK_SPEED = 530;

export function BootAnimation({ onComplete }: { onComplete?: () => void }) {
  const [showCursor, setShowCursor] = useState(true);
  const { setBooted, setBootProgress } = useBootStore();

  const { displayText, startSequence, isDeleting, currentIndex, currentLineIndex } = useTypewriter(
    BOOT_SEQUENCE,
    {
      typingSpeed: 40,
      deletingSpeed: 20,
      pauseDuration: 800,
      initialDelay: 300,
    }
  );

  const currentLine = BOOT_SEQUENCE[currentLineIndex] ?? '';

  // Calculate progress based on current line
  const totalLines = BOOT_SEQUENCE.length;
  const lineProgress = currentIndex / (currentLine.length || 1);
  const progress = ((currentLineIndex + lineProgress) / totalLines) * 100;

  // Update boot progress in store
  useEffect(() => {
    setBootProgress(progress);
  }, [progress, setBootProgress]);

  // Handle completion
  useEffect(() => {
    const lastLine = BOOT_SEQUENCE[BOOT_SEQUENCE.length - 1];
    if (!lastLine) return;

    if (
      currentLineIndex === BOOT_SEQUENCE.length - 1 &&
      currentIndex === lastLine.length &&
      !isDeleting
    ) {
      // Small delay before transitioning
      const timeout = setTimeout(() => {
        setBooted(true);
        onComplete?.();
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [currentLineIndex, currentIndex, isDeleting, setBooted, onComplete]);

  // Start boot sequence on mount
  useEffect(() => {
    const timeout = setTimeout(() => {
      startSequence();
    }, 100);
    return () => clearTimeout(timeout);
  }, [startSequence]);

  // Cursor blink effect
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, CURSOR_BLINK_SPEED);
    return () => clearInterval(interval);
  }, []);

  // Handle "ACCESS GRANTED" state specially
  const lastLine = BOOT_SEQUENCE[BOOT_SEQUENCE.length - 1] ?? '';
  const isAccessGranted =
    currentLineIndex === BOOT_SEQUENCE.length - 1 &&
    currentIndex === lastLine.length &&
    !isDeleting;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-bg-base"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-surface">
        <motion.div
          className="h-full bg-brand-primary shadow-neon-cyan"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      {/* Terminal container */}
      <div className="w-full max-w-2xl px-8">
        {/* Terminal header */}
        <div className="mb-4 flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-red-500/80" />
          <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
          <div className="h-3 w-3 rounded-full bg-green-500/80" />
          <span className="ml-4 font-mono text-xs text-foreground/40">boot_sequence.exe</span>
        </div>

        {/* Terminal body */}
        <div className="rounded-lg border border-border bg-surface/50 p-6 backdrop-blur-sm">
          {/* Boot text */}
          <div className="font-mono text-sm leading-relaxed">
            {BOOT_SEQUENCE.slice(0, currentLineIndex).map((line, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: static boot sequence lines
              <div key={i} className="text-foreground/60">
                {line}
              </div>
            ))}

            {/* Current line being typed */}
            <div className="text-brand-primary">
              {displayText}
              <span
                className={`inline-block w-2 h-4 bg-brand-primary ml-1 transition-opacity ${
                  showCursor ? 'opacity-100' : 'opacity-0'
                }`}
              />
            </div>

            {/* Access Granted with glow effect */}
            {isAccessGranted && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-4 text-h3 text-brand-accent text-glow-green font-bold"
              >
                ACCESS GRANTED
              </motion.div>
            )}
          </div>

          {/* Progress percentage */}
          <div className="mt-4 font-mono text-xs text-foreground/40">[{Math.round(progress)}%]</div>
        </div>
      </div>
    </motion.div>
  );
}
