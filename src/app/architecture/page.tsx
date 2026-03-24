'use client';

import { motion } from 'framer-motion';
import {
  ArrowRight,
  Box,
  CheckCircle,
  Cloud,
  Code2,
  FileCode,
  GitBranch,
  Github,
  Globe,
  Layers,
  Server,
  Sparkles,
} from 'lucide-react';
import { ParallaxBackground } from '@/components/ui/parallax-background';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/reveal';
import { TypingCommand } from '@/components/ui/typing-header';

const TECH_STACK = [
  {
    name: 'Next.js 16',
    description: 'App Router with React Server Components',
    icon: <Box size={24} />,
    color: 'from-white to-zinc-400',
  },
  {
    name: 'TypeScript',
    description: 'Ultra-strict mode with strictNullChecks',
    icon: <Code2 size={24} />,
    color: 'from-blue-400 to-blue-600',
  },
  {
    name: 'Tailwind CSS v4',
    description: 'CSS-first configuration with @theme',
    icon: <Layers size={24} />,
    color: 'from-cyan-400 to-cyan-600',
  },
  {
    name: 'Radix UI',
    description: 'Unstyled, accessible primitives',
    icon: <Sparkles size={24} />,
    color: 'from-purple-400 to-purple-600',
  },
  {
    name: 'Framer Motion',
    description: 'Spring physics animations',
    icon: <GitBranch size={24} />,
    color: 'from-pink-400 to-pink-600',
  },
  {
    name: 'Zustand',
    description: 'Lightweight state management',
    icon: <Server size={24} />,
    color: 'from-yellow-400 to-yellow-600',
  },
];

const BUILD_PIPELINE = [
  { label: 'Next.js Dev', description: 'pnpm dev', icon: <Code2 size={20} /> },
  { label: 'Static Export', description: 'output: export', icon: <Globe size={20} /> },
  { label: 'GitHub Actions', description: 'CI/CD Pipeline', icon: <Cloud size={20} /> },
  { label: 'GitHub Pages', description: 'Deployed', icon: <Github size={20} /> },
];

const CODE_SNIPPETS = [
  {
    filename: 'next.config.ts',
    language: 'typescript',
    content: `import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;`,
  },
  {
    filename: 'biome.json',
    language: 'json',
    content: `{
  "$schema": "https://biomejs.dev/schemas/1.9.4/schema.json",
  "vcs": {
    "enabled": true,
    "clientKind": "git",
    "useIgnoreFile": true
  },
  "organizeImports": { "enabled": true },
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true,
      "suspicious": {
        "noExplicitAny": "warn"
      }
    }
  },
  "formatter": {
    "indentStyle": "space",
    "indentWidth": 2,
    "lineWidth": 100
  }
}`,
  },
  {
    filename: '.lintstagedrc.mjs',
    language: 'javascript',
    content: `export default {
  '*.{ts,tsx,js,jsx}': [
    'biome format --write',
    'biome lint',
    'tsc --noEmit',
  ],
};`,
  },
];

export default function ArchitecturePage() {
  return (
    <main id="main-content" className="min-h-screen text-fg-base relative overflow-hidden">
      {/* Parallax Background */}
      <ParallaxBackground gridSpeed={0.5} decorationSpeed={1.2} />

      <div className="mx-auto max-w-5xl px-6 py-20 relative z-10">
        {/* Header */}
        <header className="mb-20">
          <Reveal delay={0.3}>
            <TypingCommand
              prefix="admin@portfolio:"
              command="cd ./architecture"
              className="mb-4"
              textClassName="text-h3 font-mono text-brand-primary"
            />
            <h1 className="text-display text-gradient-cyber mb-4">Architecture</h1>
            <p className="text-h3 font-mono text-brand-primary mb-4">Tech Stack Manifesto</p>
            <p className="text-body text-foreground/70 max-w-2xl">
              Every decision made here is intentional. This is not just a portfolio—it is a proof of
              concept demonstrating mastery of modern frontend development practices.
            </p>
          </Reveal>
        </header>

        {/* Interactive Build Pipeline */}
        <section className="mb-20">
          <Reveal>
            <h2 className="text-h2 font-mono text-brand-primary mb-8">Build Pipeline</h2>
          </Reveal>

          <div className="relative">
            {/* Animated pathway */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-surface -translate-y-1/2 hidden md:block" />

            <RevealGroup staggerInterval={0.1} staggerDelay={0.2}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                {BUILD_PIPELINE.map((step, index) => (
                  <RevealItem key={step.label} className="relative">
                    <div className="glass-strong rounded-xl border border-border p-6 text-center relative z-10">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-surface border border-brand-primary/30 text-brand-primary mb-4">
                        {step.icon}
                      </div>
                      <h3 className="text-small font-mono text-brand-primary mb-1">{step.label}</h3>
                      <p className="text-xs font-mono text-foreground/50">{step.description}</p>
                    </div>

                    {/* Animated arrow between steps */}
                    {index < BUILD_PIPELINE.length - 1 && (
                      <div className="hidden md:flex absolute top-1/2 -right-4 -translate-y-1/2 z-20">
                        <ArrowRight size={20} className="text-brand-primary" />
                      </div>
                    )}
                  </RevealItem>
                ))}
              </div>
            </RevealGroup>
          </div>
        </section>

        {/* Tech Stack Grid */}
        <section className="mb-20">
          <Reveal>
            <h2 className="text-h2 font-mono text-brand-primary mb-8">Technology Stack</h2>
          </Reveal>

          <RevealGroup staggerInterval={0.05} staggerDelay={0.2}>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {TECH_STACK.map((tech) => (
                <RevealItem key={tech.name}>
                  <motion.div
                    whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                    className="group"
                  >
                    <div className="relative rounded-xl border border-border bg-surface/50 p-6 overflow-hidden">
                      {/* Gradient background on hover */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${tech.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                      />

                      <div className="relative z-10">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-surface border border-border mb-4 text-brand-primary group-hover:border-brand-primary/50 transition-colors">
                          {tech.icon}
                        </div>
                        <h3 className="text-h3 font-mono mb-2 group-hover:text-brand-primary transition-colors">
                          {tech.name}
                        </h3>
                        <p className="text-small text-foreground/60">{tech.description}</p>
                      </div>
                    </div>
                  </motion.div>
                </RevealItem>
              ))}
            </div>
          </RevealGroup>
        </section>

        {/* Configuration Code Blocks */}
        <section className="mb-20">
          <Reveal>
            <h2 className="text-h2 font-mono text-brand-primary mb-8">Configuration</h2>
          </Reveal>

          <RevealGroup staggerInterval={0.1} staggerDelay={0.2}>
            <div className="grid md:grid-cols-2 gap-6">
              {CODE_SNIPPETS.map((snippet) => (
                <RevealItem key={snippet.filename}>
                  <div className="rounded-xl border border-border bg-surface/50 overflow-hidden">
                    {/* File header */}
                    <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-surface">
                      <FileCode size={14} className="text-brand-primary" />
                      <span className="font-mono text-xs text-foreground/70">
                        {snippet.filename}
                      </span>
                    </div>

                    {/* Code content */}
                    <pre className="p-4 overflow-x-auto">
                      <code className="font-mono text-xs text-foreground/80 leading-relaxed">
                        {snippet.content.split('\n').map((line, i) => (
                          // biome-ignore lint/suspicious/noArrayIndexKey: line numbers are stable for this static content
                          <div key={i} className="flex">
                            <span className="w-8 text-foreground/30 select-none">{i + 1}</span>
                            <span>{line}</span>
                          </div>
                        ))}
                      </code>
                    </pre>
                  </div>
                </RevealItem>
              ))}
            </div>
          </RevealGroup>
        </section>

        {/* Key Principles */}
        <section className="mb-20">
          <Reveal>
            <h2 className="text-h2 font-mono text-brand-primary mb-8">Key Principles</h2>
          </Reveal>

          <RevealGroup staggerInterval={0.1} staggerDelay={0.2}>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: 'Performance First',
                  description:
                    'Static export ensures lightning-fast page loads. Zero JavaScript shipped for purely static pages.',
                },
                {
                  title: 'Type Safety',
                  description:
                    'Strict TypeScript with noUncheckedIndexedAccess catches bugs at compile time, not runtime.',
                },
                {
                  title: 'Developer Experience',
                  description:
                    'Biome for format/lint, Husky for git hooks, and fast refresh for instant feedback.',
                },
              ].map((principle) => (
                <RevealItem key={principle.title}>
                  <div className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-brand-accent mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="text-h3 font-mono mb-2">{principle.title}</h3>
                      <p className="text-small text-foreground/60">{principle.description}</p>
                    </div>
                  </div>
                </RevealItem>
              ))}
            </div>
          </RevealGroup>
        </section>
      </div>
    </main>
  );
}
