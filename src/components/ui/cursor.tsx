'use client';

import { type MotionProps, motion } from 'framer-motion';

interface CursorProps extends MotionProps {
  /** Whether the cursor is actively typing (stops blinking) */
  isTyping?: boolean;
  /** Whether the cursor is correcting a typo */
  isCorrecting?: boolean;
  /** Color of the cursor */
  color?: 'cyan' | 'green' | 'primary';
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * A terminal-style blinking cursor that syncs with typing states.
 * - Solid block cursor that blinks when idle
 * - Stops blinking while actively typing
 * - Shows different state for typo correction
 */
export function Cursor({
  isTyping = false,
  isCorrecting = false,
  color = 'cyan',
  size = 'md',
  className = '',
  ...props
}: CursorProps) {
  const sizeClasses = {
    sm: 'w-2 h-4',
    md: 'w-3 h-5',
    lg: 'w-4 h-6',
  };

  const colorClasses = {
    cyan: 'bg-neon-cyan',
    green: 'bg-neon-green',
    primary: 'bg-brand-primary',
  };

  const getStateClass = () => {
    if (isCorrecting) {
      return 'bg-error'; // Red cursor during typo correction
    }
    return colorClasses[color];
  };

  return (
    <motion.div
      className={`inline-block ${sizeClasses[size]} ${getStateClass()} ${className}`}
      animate={{
        opacity: isTyping ? 1 : [1, 0, 1],
      }}
      transition={{
        opacity: isTyping ? { duration: 0.1 } : { duration: 1, repeat: Infinity },
      }}
      {...props}
    />
  );
}

/**
 * A text typing cursor that appears inline with text.
 * Includes the blinking animation via CSS when not typing.
 */
export function TypingCursor({
  text,
  isTyping,
  isCorrecting,
  className = '',
}: {
  text: string;
  isTyping: boolean;
  isCorrecting?: boolean;
  className?: string;
}) {
  return (
    <span className={`inline ${className}`}>
      {text}
      <Cursor isTyping={isTyping} isCorrecting={isCorrecting} />
    </span>
  );
}
