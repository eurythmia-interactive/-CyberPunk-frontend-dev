'use client';

import { Command } from 'cmdk';
import {
  Briefcase,
  Code2,
  Cpu,
  ExternalLink,
  FlaskConical,
  Mail,
  Moon,
  Search,
  Sun,
  Terminal,
  TerminalIcon,
  Zap,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useCommandStore } from '@/store/use-command-store';

const routes = [
  { label: 'terminal', href: '/', icon: <Terminal size={16} />, group: 'Navigation' },
  {
    label: 'design-system',
    href: '/design-system',
    icon: <Code2 size={16} />,
    group: 'Navigation',
  },
  { label: 'architecture', href: '/architecture', icon: <Cpu size={16} />, group: 'Projects' },
  { label: 'engineering', href: '/engineering', icon: <Briefcase size={16} />, group: 'Projects' },
  { label: 'projects', href: '/projects', icon: <Briefcase size={16} />, group: 'Projects' },
  { label: 'lab', href: '/lab', icon: <FlaskConical size={16} />, group: 'Experiments' },
];

const easterEggs: Record<string, () => void> = {
  matrix: () => {
    triggerMatrixRain();
  },
  'sudo rm -rf /': () => {
    triggerGlitch();
  },
};

function triggerMatrixRain() {
  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.zIndex = '99999';
  canvas.style.pointerEvents = 'none';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
  const fontSize = 14;
  const columns = canvas.width / fontSize;
  const drops: number[] = Array(Math.floor(columns)).fill(1);

  const draw = () => {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#00ff41';
    ctx.font = `${fontSize}px monospace`;

    drops.forEach((y, i) => {
      const charIndex = Math.floor(Math.random() * chars.length);
      const char = chars[charIndex] ?? 'A';
      ctx.fillText(char, i * fontSize, y * fontSize);

      if (y * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      const currentDrop = drops[i];
      if (currentDrop !== undefined) {
        drops[i] = currentDrop + 1;
      }
    });
  };

  const interval = setInterval(draw, 50);
  setTimeout(() => {
    clearInterval(interval);
    document.body.removeChild(canvas);
  }, 5000);
}

function triggerGlitch() {
  const body = document.body;
  body.classList.add('animate-flicker');
  setTimeout(() => {
    body.classList.remove('animate-flicker');
  }, 500);
}

export function CommandPalette() {
  const { isOpen, close } = useCommandStore();
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        useCommandStore.getState().toggle();
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const handleSelect = (href: string) => {
    router.push(href);
    close();
  };

  const handleEasterEgg = (key: string) => {
    const egg = easterEggs[key];
    if (egg) {
      egg();
      close();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && close()}>
      <DialogContent className="p-0 overflow-hidden border-border glass-strong max-w-lg">
        <Command
          className="[&_[cmdk-input-wrapper]]:px-4 [&_[cmdk-input-wrapper]]:py-3 [&_[cmdk-input]]:font-mono"
          loop
        >
          <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
            <Search size={18} className="opacity-50" />
            <Command.Input
              placeholder="Type a command or search..."
              className="flex-1 bg-transparent outline-none font-mono text-sm placeholder:text-foreground/30"
              autoFocus
            />
            <kbd className="text-xs font-mono text-foreground/30 border border-border rounded px-1.5 py-0.5">
              ESC
            </kbd>
          </div>

          <Command.List className="max-h-[300px] overflow-y-auto p-2">
            <Command.Empty className="py-6 text-center text-sm text-foreground/50 font-mono">
              No results found.
            </Command.Empty>

            <Command.Group
              heading="Navigation"
              className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-foreground/40"
            >
              {routes.map((route) => (
                <Command.Item
                  key={route.href}
                  value={route.label}
                  onSelect={() => handleSelect(route.href)}
                  className="flex items-center gap-3 px-3 py-2 rounded-md font-mono text-sm cursor-pointer hover:bg-surface-elevated data-[selected=true]:bg-surface-elevated"
                >
                  <span className="opacity-50">{route.icon}</span>
                  <span>{route.label}</span>
                </Command.Item>
              ))}
            </Command.Group>

            <Command.Separator className="my-2 border-t border-border" />

            <Command.Group
              heading="Actions"
              className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-foreground/40"
            >
              <Command.Item
                value="toggle-theme"
                onSelect={() => {
                  setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
                  close();
                }}
                className="flex items-center gap-3 px-3 py-2 rounded-md font-mono text-sm cursor-pointer hover:bg-surface-elevated data-[selected=true]:bg-surface-elevated"
              >
                {resolvedTheme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
                <span>Toggle Dark/Light Theme</span>
              </Command.Item>

              <Command.Item
                value="copy-email"
                onSelect={() => {
                  navigator.clipboard.writeText('hello@cyberpunk.dev');
                  close();
                }}
                className="flex items-center gap-3 px-3 py-2 rounded-md font-mono text-sm cursor-pointer hover:bg-surface-elevated data-[selected=true]:bg-surface-elevated"
              >
                <Mail size={16} />
                <span>Copy Email Address</span>
              </Command.Item>

              <Command.Item
                value="view-resume"
                onSelect={() => {
                  window.open('/resume.pdf', '_blank');
                  close();
                }}
                className="flex items-center gap-3 px-3 py-2 rounded-md font-mono text-sm cursor-pointer hover:bg-surface-elevated data-[selected=true]:bg-surface-elevated"
              >
                <ExternalLink size={16} />
                <span>View Resume (PDF)</span>
              </Command.Item>
            </Command.Group>

            <Command.Separator className="my-2 border-t border-border" />

            <Command.Group
              heading="Easter Eggs"
              className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-foreground/40"
            >
              <Command.Item
                value="matrix"
                onSelect={() => handleEasterEgg('matrix')}
                className="flex items-center gap-3 px-3 py-2 rounded-md font-mono text-sm cursor-pointer hover:bg-surface-elevated data-[selected=true]:bg-surface-elevated"
              >
                <Zap size={16} className="text-success" />
                <span className="text-success">matrix</span>
              </Command.Item>

              <Command.Item
                value="sudo rm -rf /"
                onSelect={() => handleEasterEgg('sudo rm -rf /')}
                className="flex items-center gap-3 px-3 py-2 rounded-md font-mono text-sm cursor-pointer hover:bg-surface-elevated data-[selected=true]:bg-surface-elevated"
              >
                <TerminalIcon size={16} className="text-error" />
                <span className="text-error">sudo rm -rf /</span>
              </Command.Item>
            </Command.Group>
          </Command.List>

          <div className="px-4 py-2 border-t border-border text-[10px] font-mono text-foreground/30">
            <span className="opacity-50">↑↓</span> Navigate
            <span className="mx-2 opacity-50">·</span>
            <span className="opacity-50">↵</span> Select
            <span className="mx-2 opacity-50">·</span>
            <span className="opacity-50">esc</span> Close
          </div>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
