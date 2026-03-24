import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Design System',
  description:
    'Interactive showcase of cyberpunk-themed UI components. Explore buttons, badges, cards, dialogs, tabs, and form elements built with CVA, Radix UI, and Tailwind CSS v4.',
  openGraph: {
    title: 'Design System | Cyberpunk Portfolio',
    description:
      'Interactive showcase of cyberpunk-themed UI components. Explore buttons, badges, cards, dialogs, tabs, and form elements.',
  },
};

export default function DesignSystemLayout({ children }: { children: React.ReactNode }) {
  return children;
}
