'use client';

import { motion } from 'framer-motion';
import { Moon, Search, Sun, Terminal } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useClock } from '@/hooks/use-clock';
import { useCommandStore } from '@/store/use-command-store';

function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  const breadcrumbs = [
    { label: 'root', href: '/' },
    ...segments.map((segment, index) => ({
      label: segment,
      href: `/${segments.slice(0, index + 1).join('/')}`,
    })),
  ];

  return (
    <div className="flex items-center gap-1.5 font-mono text-sm">
      <Terminal size={14} className="opacity-40" />
      <span className="text-foreground/40">admin@portfolio:</span>
      {breadcrumbs.map((crumb, index) => (
        <span key={crumb.href} className="flex items-center">
          {index > 0 && <span className="mx-1 text-foreground/30">/</span>}
          {index === breadcrumbs.length - 1 ? (
            <span className="text-brand-primary text-glow-cyan">{crumb.label}</span>
          ) : (
            <Link
              href={crumb.href}
              className="text-foreground/60 hover:text-foreground transition-colors"
            >
              {crumb.label}
            </Link>
          )}
        </span>
      ))}
    </div>
  );
}

function SystemStatus() {
  const { time, date } = useClock();

  return (
    <div className="flex items-center gap-4 font-mono text-xs">
      <div className="flex items-center gap-2">
        <motion.span
          className="w-2 h-2 rounded-full bg-success shadow-neon-green"
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <span className="text-success">SYSTEM ONLINE</span>
      </div>

      <div className="hidden sm:flex items-center gap-3 text-foreground/50">
        <span>{date}</span>
        <span className="text-foreground/30">|</span>
        <span>{time}</span>
      </div>
    </div>
  );
}

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch by rendering placeholder until mounted
  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="opacity-60" disabled aria-label="Toggle theme">
        <Sun size={18} />
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      className="opacity-60 hover:opacity-100"
      aria-label="Toggle theme"
    >
      {resolvedTheme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
    </Button>
  );
}

function CommandPaletteTrigger() {
  const open = useCommandStore((state) => state.open);

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={open}
      className="font-mono text-xs gap-2 opacity-60 hover:opacity-100 transition-opacity border-border"
    >
      <Search size={14} />
      <span className="hidden sm:inline">Search</span>
      <kbd className="hidden sm:inline-flex h-5 items-center gap-1 rounded border border-border bg-surface-elevated px-1.5 font-mono text-[10px] text-foreground/50">
        <span className="text-xs">⌘</span>K
      </kbd>
    </Button>
  );
}

export function Header() {
  return (
    <header className="app-header flex items-center justify-between px-4">
      <Breadcrumbs />

      <div className="flex items-center gap-2">
        <SystemStatus />

        <div className="w-px h-4 bg-border mx-2" />

        <CommandPaletteTrigger />
        <ThemeToggle />
      </div>
    </header>
  );
}
