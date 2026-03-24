'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

interface UseCyberTyperOptions {
  /** Minimum delay between keystrokes in ms */
  minDelay?: number;
  /** Maximum delay between keystrokes in ms */
  maxDelay?: number;
  /** Delay before starting the typing effect in ms */
  startDelay?: number;
  /** Probability of making a typo (0-1) */
  typoProbability?: number;
  /** Delay before correcting a typo in ms */
  typoCorrectionDelay?: number;
  /** Pause duration after completing a line in ms */
  linePauseDuration?: number;
}

interface UseCyberTyperReturn {
  /** The current displayed text */
  displayText: string;
  /** Whether the hook is actively typing */
  isTyping: boolean;
  /** Whether a typo is currently being corrected */
  isCorrectingTypo: boolean;
  /** Index of the current character being typed */
  charIndex: number;
  /** Index of the current line being typed */
  lineIndex: number;
  /** Whether the typing sequence has started */
  hasStarted: boolean;
  /** Start or resume the typing sequence */
  start: () => void;
  /** Pause the typing sequence */
  pause: () => void;
  /** Reset the typing sequence */
  reset: () => void;
}

/**
 * A realistic terminal typing simulator with human-like timing and typo correction.
 * Uses randomized delays and occasional typo simulation for authenticity.
 */
export function useCyberTyper(
  text: string,
  options: UseCyberTyperOptions = {}
): UseCyberTyperReturn {
  const {
    minDelay = 30,
    maxDelay = 100,
    startDelay = 500,
    typoProbability = 0.02,
    typoCorrectionDelay = 800,
    linePauseDuration = 400,
  } = options;

  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isCorrectingTypo, setIsCorrectingTypo] = useState(false);
  const [charIndex, setCharIndex] = useState(0);
  const [lineIndex, setLineIndex] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const textRef = useRef(text);

  // Update text ref when text changes
  useEffect(() => {
    textRef.current = text;
  }, [text]);

  const getRandomDelay = useCallback(() => {
    return Math.floor(Math.random() * (maxDelay - minDelay) + minDelay);
  }, [minDelay, maxDelay]);

  const getRandomChar = useCallback(() => {
    const chars = 'abcdefghijklmnopqrstuvwxyz!@#$%^&*';
    return chars[Math.floor(Math.random() * chars.length)];
  }, []);

  const clearTypingTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);

  const start = useCallback(() => {
    if (!hasStarted) {
      setHasStarted(true);
      setIsTyping(true);
    } else {
      setIsTyping(true);
    }
  }, [hasStarted]);

  const pause = useCallback(() => {
    setIsTyping(false);
    clearTypingTimeout();
  }, [clearTypingTimeout]);

  const reset = useCallback(() => {
    clearTypingTimeout();
    setDisplayText('');
    setIsTyping(false);
    setIsCorrectingTypo(false);
    setCharIndex(0);
    setLineIndex(0);
    setHasStarted(false);
  }, [clearTypingTimeout]);

  useEffect(() => {
    if (!hasStarted) return;

    const lines = textRef.current.split('\n');

    // Initial start delay
    if (charIndex === 0 && lineIndex === 0 && displayText === '') {
      timeoutRef.current = setTimeout(() => {
        setIsTyping(true);
      }, startDelay);
      return;
    }

    if (!isTyping) return;

    // Typing logic
    const typeCharacter = () => {
      if (lineIndex >= lines.length) {
        setIsTyping(false);
        return;
      }

      const currentLineText = lines[lineIndex] ?? '';

      // Check if we should make a typo
      if (
        charIndex < currentLineText.length &&
        Math.random() < typoProbability &&
        !isCorrectingTypo
      ) {
        // Make a typo
        const wrongChar = getRandomChar();
        setDisplayText((prev) => prev + wrongChar);
        setIsCorrectingTypo(true);

        // Correct the typo after a delay
        timeoutRef.current = setTimeout(() => {
          // Backspace the wrong character
          setDisplayText((prev) => prev.slice(0, -1));
          // Type the correct character
          const correctChar = currentLineText[charIndex] ?? '';
          setDisplayText((prev) => prev + correctChar);
          setCharIndex((prev) => prev + 1);
          setIsCorrectingTypo(false);
        }, typoCorrectionDelay);
        return;
      }

      // Normal typing
      if (charIndex < currentLineText.length) {
        const char = currentLineText[charIndex];
        setDisplayText((prev) => prev + char);
        setCharIndex((prev) => prev + 1);

        timeoutRef.current = setTimeout(typeCharacter, getRandomDelay());
      } else {
        // Move to next line
        if (lineIndex < lines.length - 1) {
          setLineIndex((prev) => prev + 1);
          setCharIndex(0);
          setDisplayText((prev) => `${prev}\n`);

          timeoutRef.current = setTimeout(typeCharacter, linePauseDuration);
        } else {
          // Finished typing all lines
          setIsTyping(false);
        }
      }
    };

    timeoutRef.current = setTimeout(typeCharacter, getRandomDelay());

    return () => clearTypingTimeout();
  }, [
    hasStarted,
    isTyping,
    charIndex,
    lineIndex,
    displayText,
    isCorrectingTypo,
    typoProbability,
    typoCorrectionDelay,
    linePauseDuration,
    startDelay,
    getRandomDelay,
    getRandomChar,
    clearTypingTimeout,
  ]);

  return {
    displayText,
    isTyping,
    isCorrectingTypo,
    charIndex,
    lineIndex,
    hasStarted,
    start,
    pause,
    reset,
  };
}
