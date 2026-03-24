'use client';

import { CommandPalette } from '@/components/layout/command-palette';
import { Header } from '@/components/layout/header';
import { Sidebar } from '@/components/layout/sidebar';

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* TRON Background with perspective grid */}
      <div className="tron-background" aria-hidden="true">
        {/* Floating geometric decorations */}
        <div className="tron-decoration tron-decoration-1" />
        <div className="tron-decoration tron-decoration-2" />
        <div className="tron-decoration tron-decoration-3" />
      </div>

      {/* CRT Film Grain Overlay */}
      <div className="crt-grain" aria-hidden="true" />

      {/* App Shell Layout */}
      <div className="app-shell">
        <Sidebar />
        <Header />
        <div className="app-main">{children}</div>
      </div>

      {/* Global Command Palette */}
      <CommandPalette />
    </>
  );
}
