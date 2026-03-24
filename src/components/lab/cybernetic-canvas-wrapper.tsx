'use client';

import dynamic from 'next/dynamic';

// Dynamically import the R3F canvas to avoid SSR issues
const CyberneticCanvas = dynamic(
  () => import('./cybernetic-canvas').then((mod) => mod.CyberneticCanvas),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center bg-surface/30 rounded-lg border border-border">
        <div className="text-center">
          <div className="w-8 h-8 mx-auto mb-2 rounded border-2 border-brand-primary/30 border-t-brand-primary animate-spin" />
          <p className="text-xs font-mono text-foreground/50">Loading WebGL...</p>
        </div>
      </div>
    ),
  }
);

export { CyberneticCanvas };
