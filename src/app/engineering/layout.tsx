import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Engineering',
  description:
    'Forms showcase demonstrating React Hook Form, Zod validation, and accessible form components. Features password strength indicators, real-time validation, and error state animations.',
  openGraph: {
    title: 'Engineering | Cyberpunk Portfolio',
    description:
      'Forms showcase with React Hook Form, Zod validation, and accessible form components.',
  },
};

export default function EngineeringLayout({ children }: { children: React.ReactNode }) {
  return children;
}
