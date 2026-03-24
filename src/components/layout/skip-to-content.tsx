'use client';

export function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:rounded-lg focus:bg-surface focus:text-brand-primary focus:font-mono focus:text-sm focus:border focus:border-brand-primary focus:shadow-neon-cyan focus:outline-none"
    >
      Skip to main content
    </a>
  );
}
