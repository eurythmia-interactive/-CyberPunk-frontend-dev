import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Architecture',
  description:
    'The tech stack manifesto behind this cyberpunk portfolio. A deep dive into Next.js 16, TypeScript strict mode, Tailwind CSS v4, Framer Motion, Zustand, and modern frontend architecture patterns.',
  openGraph: {
    title: 'Architecture | Cyberpunk Portfolio',
    description:
      'The tech stack manifesto behind this cyberpunk portfolio. A deep dive into modern frontend architecture.',
  },
};

export default function ArchitectureLayout({ children }: { children: React.ReactNode }) {
  return children;
}
