'use client';

import { motion } from 'framer-motion';
import { useCallback, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface MagneticButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  strength?: number;
  disabled?: boolean;
}

export function MagneticButton({
  children,
  onClick,
  className,
  strength = 0.3,
  disabled = false,
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!buttonRef.current || disabled) return;

      const rect = buttonRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;

      setPosition({ x: deltaX, y: deltaY });
    },
    [strength, disabled]
  );

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setPosition({ x: 0, y: 0 });
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (!disabled) {
      setIsHovered(true);
    }
  }, [disabled]);

  return (
    <motion.button
      ref={buttonRef}
      type="button"
      onClick={onClick}
      disabled={disabled}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      animate={{
        x: position.x,
        y: position.y,
        scale: isHovered ? 1.05 : 1,
      }}
      transition={{
        type: 'spring',
        stiffness: 150,
        damping: 15,
        mass: 0.1,
      }}
      className={cn(
        'relative overflow-hidden rounded-lg bg-brand-primary px-8 py-4',
        'font-mono text-sm font-bold uppercase tracking-wider',
        'text-bg-base transition-shadow duration-300',
        'hover:shadow-neon-cyan',
        'focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 focus:ring-offset-bg-base',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none',
        className
      )}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
    >
      {/* Shine effect on hover */}
      {isHovered && !disabled && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      )}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
