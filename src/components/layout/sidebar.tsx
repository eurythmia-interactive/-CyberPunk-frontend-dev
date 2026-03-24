'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
  Briefcase,
  ChevronRight,
  Code2,
  Cpu,
  FileText,
  FlaskConical,
  Folder,
  FolderOpen,
  Github,
  Mail,
  Terminal,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

interface NavFolder {
  label: string;
  items: NavItem[];
}

const navStructure: NavFolder[] = [
  {
    label: '~/home',
    items: [
      { label: 'terminal', href: '/', icon: <Terminal size={16} /> },
      { label: 'design-system', href: '/design-system', icon: <Code2 size={16} /> },
    ],
  },
  {
    label: '~/projects',
    items: [
      { label: 'architecture', href: '/architecture', icon: <Cpu size={16} /> },
      { label: 'engineering', href: '/engineering', icon: <FileText size={16} /> },
      { label: 'projects', href: '/projects', icon: <Briefcase size={16} /> },
    ],
  },
  {
    label: '~/lab',
    items: [{ label: 'experiments', href: '/lab', icon: <FlaskConical size={16} /> }],
  },
];

const socialLinks: NavItem[] = [
  { label: 'github', href: 'https://github.com', icon: <Github size={16} /> },
  { label: 'contact', href: 'mailto:hello@cyberpunk.dev', icon: <Mail size={16} /> },
];

function isExternalHref(href: string): boolean {
  return href.startsWith('http') || href.startsWith('mailto');
}

function FileTreeItem({ item, isActive }: { item: NavItem; isActive: boolean }) {
  const isExternal = isExternalHref(item.href);

  if (isExternal) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          'group flex items-center gap-2 px-3 py-1.5 mx-2 rounded-md text-sm font-mono transition-all duration-150',
          'hover:bg-surface-elevated',
          isActive &&
            'bg-surface-elevated border-l-2 border-brand-primary text-brand-primary shadow-neon-primary/20'
        )}
      >
        <span className={cn('opacity-60', isActive && 'opacity-100')}>{item.icon}</span>
        <span className={cn(isActive && 'text-glow-cyan')}>{item.label}</span>
        {isActive && (
          <motion.div
            className="ml-auto w-1.5 h-1.5 rounded-full bg-brand-primary shadow-neon-cyan"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </a>
    );
  }

  return (
    <Link href={item.href}>
      <motion.div
        className={cn(
          'group flex items-center gap-2 px-3 py-1.5 mx-2 rounded-md text-sm font-mono transition-all duration-150',
          'hover:bg-surface-elevated',
          isActive &&
            'bg-surface-elevated border-l-2 border-brand-primary text-brand-primary shadow-neon-primary/20'
        )}
        whileHover={{ x: 2 }}
        transition={{ duration: 0.15 }}
      >
        <span className={cn('opacity-60', isActive && 'opacity-100')}>{item.icon}</span>
        <span className={cn(isActive && 'text-glow-cyan')}>{item.label}</span>
        {isActive && (
          <motion.div
            className="ml-auto w-1.5 h-1.5 rounded-full bg-brand-primary shadow-neon-cyan"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </motion.div>
    </Link>
  );
}

function FolderGroup({ folder, currentPath }: { folder: NavFolder; currentPath: string }) {
  const [isOpen, setIsOpen] = useState(true);
  const hasActiveItem = folder.items.some((item) => currentPath === item.href);

  return (
    <div className="mb-1">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center gap-1.5 w-full px-3 py-1.5 text-xs font-mono uppercase tracking-wider',
          'text-foreground/60 hover:text-foreground transition-colors'
        )}
      >
        <motion.div animate={{ rotate: isOpen ? 90 : 0 }} transition={{ duration: 0.15 }}>
          <ChevronRight size={12} />
        </motion.div>
        {isOpen ? <FolderOpen size={14} /> : <Folder size={14} />}
        <span className={cn(hasActiveItem && 'text-brand-primary')}>{folder.label}</span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <div className="pt-1">
              {folder.items.map((item) => (
                <FileTreeItem key={item.href} item={item} isActive={currentPath === item.href} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="app-sidebar flex flex-col">
      {/* Logo / Title */}
      <div className="px-4 py-4 border-b border-border">
        <Link href="/">
          <h1 className="font-mono text-sm font-bold tracking-tight">
            <span className="text-brand-primary">&#91;</span>
            <span className="text-foreground">cyberpunk</span>
            <span className="text-brand-accent">.dev</span>
            <span className="text-brand-primary">&#93;</span>
          </h1>
          <p className="text-xs text-foreground/40 font-mono mt-0.5">
            v1.0.0 {/* FRONTEND ENGINEER */}
          </p>
        </Link>
      </div>

      {/* File Tree Navigation */}
      <nav className="flex-1 py-3 overflow-y-auto">
        <div className="px-3 mb-2 text-[10px] font-mono uppercase tracking-widest text-foreground/30">
          Explorer
        </div>
        {navStructure.map((folder) => (
          <FolderGroup key={folder.label} folder={folder} currentPath={pathname} />
        ))}
      </nav>

      {/* Social Links */}
      <div className="p-3 border-t border-border">
        <div className="px-3 mb-2 text-[10px] font-mono uppercase tracking-widest text-foreground/30">
          Connect
        </div>
        <div className="space-y-1">
          {socialLinks.map((item) => (
            <FileTreeItem key={item.href} item={item} isActive={false} />
          ))}
        </div>
      </div>

      {/* Version Tag */}
      <div className="px-4 py-2 border-t border-border">
        <p className="text-[10px] font-mono text-foreground/30">NEXT.JS 16.2.1 {/* STATIC */}</p>
      </div>
    </aside>
  );
}
