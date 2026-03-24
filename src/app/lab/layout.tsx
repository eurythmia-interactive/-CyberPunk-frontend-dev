import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Lab',
  description:
    'Experimental sandbox for bleeding-edge browser capabilities. Explore React Three Fiber 3D WebGL, @dnd-kit drag-and-drop, Framer Motion animations, and terminal simulators.',
  openGraph: {
    title: 'Lab | Cyberpunk Portfolio',
    description:
      'Experimental sandbox with React Three Fiber, @dnd-kit, and Framer Motion animations.',
  },
};

export default function LabLayout({ children }: { children: React.ReactNode }) {
  return children;
}
