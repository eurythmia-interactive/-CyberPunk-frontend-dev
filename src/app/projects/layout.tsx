import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'A curated portfolio of frontend development projects. Featuring holographic cards with 3D tilt effects, tag-based filtering, and Framer Motion animations.',
  openGraph: {
    title: 'Projects | Cyberpunk Portfolio',
    description: 'A curated portfolio of frontend development projects with cyberpunk aesthetics.',
  },
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
