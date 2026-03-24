'use client';

import { useEffect } from 'react';
import { Cursor } from '@/components/ui/cursor';
import { useCyberTyper } from '@/hooks/use-cyber-typer';

interface TypingHeaderProps {
  /** The text to type out */
  text: string;
  /** Tag for the heading element */
  as?: 'h1' | 'h2' | 'h3';
  /** CSS classes for the wrapper */
  className?: string;
  /** CSS classes for the text */
  textClassName?: string;
  /** Delay before starting the typing effect */
  startDelay?: number;
  /** Minimum delay between keystrokes */
  minDelay?: number;
  /** Maximum delay between keystrokes */
  maxDelay?: number;
  /** Callback when typing completes */
  onComplete?: () => void;
}

/**
 * A heading component that types out text character by character
 * with a realistic terminal-style cursor.
 */
export function TypingHeader({
  text,
  as: Tag = 'h1',
  className = '',
  textClassName = '',
  startDelay = 500,
  minDelay = 40,
  maxDelay = 120,
  onComplete,
}: TypingHeaderProps) {
  const { displayText, isTyping, isCorrectingTypo, hasStarted, start } = useCyberTyper(text, {
    minDelay,
    maxDelay,
    startDelay,
    typoProbability: 0,
    linePauseDuration: 200,
  });

  useEffect(() => {
    // Start typing when component mounts
    const timeout = setTimeout(() => {
      start();
    }, 100);

    return () => clearTimeout(timeout);
  }, [start]);

  useEffect(() => {
    // Call onComplete when typing is done
    if (hasStarted && !isTyping && displayText === text && onComplete) {
      onComplete();
    }
  }, [hasStarted, isTyping, displayText, text, onComplete]);

  return (
    <Tag className={className}>
      <span className={textClassName}>{displayText}</span>
      <Cursor isTyping={isTyping} isCorrecting={isCorrectingTypo} />
    </Tag>
  );
}

/**
 * A prefix + typing header combination.
 * Useful for commands like "> cd ./engineering && ls -la"
 */
export function TypingCommand({
  prefix,
  command,
  className = '',
  textClassName = '',
  startDelay = 500,
}: {
  prefix: string;
  command: string;
  className?: string;
  textClassName?: string;
  startDelay?: number;
}) {
  const fullText = `${prefix} ${command}`;
  const { displayText, isTyping, isCorrectingTypo, hasStarted, start } = useCyberTyper(fullText, {
    minDelay: 30,
    maxDelay: 80,
    startDelay,
    typoProbability: 0,
    linePauseDuration: 100,
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      start();
    }, 100);

    return () => clearTimeout(timeout);
  }, [start]);

  return (
    <div className={className}>
      <span className={textClassName}>{displayText}</span>
      <Cursor
        isTyping={hasStarted && (isTyping || displayText.length < fullText.length)}
        isCorrecting={isCorrectingTypo}
      />
    </div>
  );
}
