'use client';

import { useCallback, useEffect, useState } from 'react';

interface UseTypewriterOptions {
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  initialDelay?: number;
}

interface UseTypewriterReturn {
  displayText: string;
  isTyping: boolean;
  currentIndex: number;
  currentLineIndex: number;
  isDeleting: boolean;
  startSequence: () => void;
  reset: () => void;
}

export function useTypewriter(
  lines: string[],
  options: UseTypewriterOptions = {}
): UseTypewriterReturn {
  const {
    typingSpeed = 50,
    deletingSpeed = 30,
    pauseDuration = 1000,
    initialDelay = 500,
  } = options;

  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const currentLine = lines[currentLineIndex] || '';
  const displayText = currentLine.slice(0, currentIndex);

  const startSequence = useCallback(() => {
    if (!hasStarted) {
      setHasStarted(true);
      setIsTyping(true);
    }
  }, [hasStarted]);

  const reset = useCallback(() => {
    setCurrentLineIndex(0);
    setCurrentIndex(0);
    setIsTyping(false);
    setIsDeleting(false);
    setHasStarted(false);
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    let timeout: ReturnType<typeof setTimeout>;

    if (!isTyping && !isDeleting) {
      // Initial pause before starting
      timeout = setTimeout(() => {
        setIsTyping(true);
      }, initialDelay);
    } else if (isTyping) {
      // Typing character by character
      if (currentIndex < currentLine.length) {
        timeout = setTimeout(() => {
          setCurrentIndex((prev) => prev + 1);
        }, typingSpeed);
      } else {
        // Finished typing current line
        timeout = setTimeout(() => {
          setIsTyping(false);
          // Move to next line or start deleting if last line
          if (currentLineIndex < lines.length - 1) {
            setCurrentLineIndex((prev) => prev + 1);
            setCurrentIndex(0);
            setIsTyping(true);
          } else {
            // Last line reached - start deleting after pause
            timeout = setTimeout(() => {
              setIsDeleting(true);
            }, pauseDuration);
          }
        }, pauseDuration);
      }
    } else if (isDeleting) {
      // Deleting character by character
      if (currentIndex > 0) {
        timeout = setTimeout(() => {
          setCurrentIndex((prev) => prev - 1);
        }, deletingSpeed);
      } else {
        // Finished deleting
        setIsDeleting(false);
        setCurrentLineIndex((prev) => (prev < lines.length - 1 ? prev + 1 : 0));
      }
    }

    return () => clearTimeout(timeout);
  }, [
    hasStarted,
    isTyping,
    isDeleting,
    currentIndex,
    currentLine,
    currentLineIndex,
    lines.length,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
    initialDelay,
  ]);

  return {
    displayText,
    isTyping,
    currentIndex,
    currentLineIndex,
    isDeleting,
    startSequence,
    reset,
  };
}
