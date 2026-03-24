'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { CyberneticCanvas } from '@/components/lab/cybernetic-canvas-wrapper';
import { DndWidgetsProvider } from '@/components/lab/dnd-provider';
import { Cursor } from '@/components/ui/cursor';
import { ParallaxBackground } from '@/components/ui/parallax-background';
import { Reveal } from '@/components/ui/reveal';
import { useCyberTyper } from '@/hooks/use-cyber-typer';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

// Lab Experiment Widget Component
interface LabWidgetProps {
  title: string;
  description: string;
  sourceCode: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

function LabWidget({ title, description, sourceCode, children, icon }: LabWidgetProps) {
  const [showSource, setShowSource] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);

  const handleToggle = () => {
    setIsFlipping(true);
    setTimeout(() => {
      setShowSource(!showSource);
      setIsFlipping(false);
    }, 150);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="relative h-[300px]"
    >
      <motion.div
        animate={{ rotateY: isFlipping ? 90 : showSource ? 180 : 0 }}
        transition={{ duration: 0.15 }}
        className="absolute inset-0"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front - Experiment View */}
        <div
          className="absolute inset-0 rounded-xl border border-border bg-surface/50 backdrop-blur-sm overflow-hidden"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {/* Widget Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-surface/80">
            <div className="flex items-center gap-2">
              {icon}
              <span className="font-mono text-sm text-brand-primary">{title}</span>
            </div>
            <button
              type="button"
              onClick={handleToggle}
              className="px-2 py-1 text-xs font-mono text-foreground/50 hover:text-brand-primary transition-colors border border-border hover:border-brand-primary/50 rounded"
            >
              {showSource ? 'View Demo' : 'View Source'}
            </button>
          </div>

          {/* Widget Content */}
          <div className="p-4 h-[calc(100%-52px)]">
            <p className="text-xs text-foreground/60 mb-4">{description}</p>
            <div className="h-[calc(100%-40px)]">{children}</div>
          </div>
        </div>

        {/* Back - Source Code View */}
        <div
          className="absolute inset-0 rounded-xl border border-brand-primary/30 bg-surface overflow-hidden"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          {/* Widget Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-surface/80">
            <div className="flex items-center gap-2">
              {icon}
              <span className="font-mono text-sm text-brand-primary">{title}</span>
            </div>
            <button
              type="button"
              onClick={handleToggle}
              className="px-2 py-1 text-xs font-mono text-foreground/50 hover:text-brand-primary transition-colors border border-border hover:border-brand-primary/50 rounded"
            >
              {showSource ? 'View Demo' : 'View Source'}
            </button>
          </div>

          {/* Source Code */}
          <pre className="p-4 h-[calc(100%-52px)] overflow-auto">
            <code className="font-mono text-xs text-foreground/80 leading-relaxed">
              {sourceCode}
            </code>
          </pre>
        </div>
      </motion.div>
    </motion.div>
  );
}

// 3D Canvas with React Three Fiber
function ThreeDWidget() {
  return (
    <div className="w-full h-full rounded-lg border border-border overflow-hidden">
      <CyberneticCanvas />
    </div>
  );
}

// Drag-and-drop widget with @dnd-kit
function DragDropWidget() {
  return (
    <div className="w-full h-full">
      <DndWidgetsProvider />
    </div>
  );
}

// Animation playground placeholder
function AnimationWidget() {
  const prefersReducedMotion = useReducedMotion();

  // Respect reduced motion preference
  if (prefersReducedMotion) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-brand-primary to-brand-accent opacity-80" />
      </div>
    );
  }

  return (
    <div className="w-full h-full flex items-center justify-center">
      <motion.div
        className="w-12 h-12 rounded-lg bg-gradient-to-br from-brand-primary to-brand-accent"
        animate={{
          rotate: 360,
          scale: [1, 1.1, 1],
        }}
        transition={{
          rotate: { duration: 4, repeat: Infinity, ease: 'linear' },
          scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
        }}
      />
    </div>
  );
}

// Terminal widget placeholder
function TerminalWidget() {
  const { displayText, isTyping } = useCyberTyper(
    `> Initializing lab environment...\n> Loading experiments...\n> Ready.\n\nType 'help' for available commands.`,
    { minDelay: 20, maxDelay: 50, typoProbability: 0 }
  );

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-1 p-3 font-mono text-xs text-foreground/80 overflow-auto">
        <div>
          {displayText}
          <Cursor isTyping={isTyping} size="sm" />
        </div>
      </div>
      <div className="flex items-center gap-2 px-3 py-2 border-t border-border bg-surface/50">
        <span className="text-brand-primary font-mono text-xs">admin@lab:</span>
        <span className="flex-1 font-mono text-xs text-foreground/60">~</span>
        <Cursor isTyping={isTyping} size="sm" />
      </div>
    </div>
  );
}

export default function LabPage() {
  return (
    <main id="main-content" className="min-h-screen text-fg-base relative overflow-hidden">
      {/* Parallax Background */}
      <ParallaxBackground gridSpeed={0.3} decorationSpeed={0.8} />

      <div className="mx-auto max-w-7xl px-6 py-20 relative z-10">
        {/* Header */}
        <Reveal className="mb-12">
          <motion.div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-primary/30 bg-brand-primary/5 mb-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
            <span className="text-xs font-mono text-brand-primary">EXPERIMENTAL</span>
          </motion.div>
          <h1 className="text-display text-gradient-cyber mb-4">Lab</h1>
          <p className="text-h3 font-mono text-brand-accent mb-4">Sandbox Environment</p>
          <p className="text-body text-foreground/70 max-w-2xl">
            A dedicated playground for bleeding-edge browser capabilities. Each widget represents an
            experiment in GPU-accelerated rendering, physics-based animation, or complex
            drag-and-drop interactions.
          </p>
        </Reveal>

        {/* Lab Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 3D WebGL Experiment */}
          <Reveal delay={0.1}>
            <LabWidget
              title="3D WebGL"
              description="React Three Fiber with raycasting mouse interaction"
              icon={<span className="text-brand-primary">◈</span>}
              sourceCode={`// React Three Fiber setup
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

function CyberneticTorus() {
  return (
    <Torus>
      <meshBasicMaterial wireframe color={themeColor} />
    </Torus>
  )
}

// Mouse tracking with useFrame
useFrame(({ mouse }) => {
  mesh.rotation.x = mouse.y * 0.5
  mesh.rotation.y = mouse.x * 0.5
})`}
            >
              <ThreeDWidget />
            </LabWidget>
          </Reveal>

          {/* Drag and Drop */}
          <Reveal delay={0.15}>
            <LabWidget
              title="Drag & Drop"
              description="@dnd-kit sortable server status widgets"
              icon={<span className="text-brand-accent">⇄</span>}
              sourceCode={`// DndContext setup
<DndContext
  sensors={sensors}
  collisionDetection={closestCenter}
  onDragEnd={handleDragEnd}
>
  <SortableContext items={widgets}>
    {widgets.map((widget) => (
      <SortableWidget key={widget.id} {...widget} />
    ))}
  </SortableContext>
</DndContext>

// Zustand persistence
const useWidgetStore = create(
  persist((set) => ({
    order: [],
    setOrder: (order) => set({ order }),
  }), { name: 'widget-layout' })
)`}
            >
              <DragDropWidget />
            </LabWidget>
          </Reveal>

          {/* Animation Playground */}
          <Reveal delay={0.2}>
            <LabWidget
              title="Animations"
              description="Framer Motion spring physics"
              icon={<span className="text-brand-primary">∞</span>}
              sourceCode={`// Spring physics animation
const springTransition = {
  type: "spring",
  stiffness: 260,
  damping: 20,
}

// Staggered children
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

// Shared layout animation
<motion.div layoutId="card" />`}
            >
              <AnimationWidget />
            </LabWidget>
          </Reveal>

          {/* Terminal Simulator */}
          <Reveal delay={0.25}>
            <LabWidget
              title="Terminal"
              description="useCyberTyper with human-like timing"
              icon={<span className="text-brand-accent">&gt;_</span>}
              sourceCode={`// CyberTyper hook
const { displayText, isTyping } = useCyberTyper(
  text,
  {
    minDelay: 30,
    maxDelay: 100,
    typoProbability: 0.02,
    typoCorrectionDelay: 800,
  }
)

// Cursor blink sync
<Cursor
  isTyping={isTyping}
  isCorrecting={isCorrectingTypo}
/>`}
            >
              <TerminalWidget />
            </LabWidget>
          </Reveal>

          {/* Placeholder widgets for future experiments */}
          <Reveal delay={0.3}>
            <div className="h-[300px] rounded-xl border border-dashed border-foreground/20 bg-surface/20 flex items-center justify-center">
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full border border-dashed border-foreground/20 flex items-center justify-center">
                  <span className="text-foreground/30">+</span>
                </div>
                <p className="text-sm font-mono text-foreground/30">Coming Soon</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.35}>
            <div className="h-[300px] rounded-xl border border-dashed border-foreground/20 bg-surface/20 flex items-center justify-center">
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full border border-dashed border-foreground/20 flex items-center justify-center">
                  <span className="text-foreground/30">+</span>
                </div>
                <p className="text-sm font-mono text-foreground/30">Coming Soon</p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Lab Stats Footer */}
        <Reveal delay={0.4}>
          <div className="mt-12 flex items-center justify-between px-6 py-4 rounded-xl border border-border bg-surface/30">
            <div className="flex items-center gap-8">
              <div>
                <p className="text-xs font-mono text-foreground/40">Experiments</p>
                <p className="text-h3 font-mono text-brand-primary">4</p>
              </div>
              <div>
                <p className="text-xs font-mono text-foreground/40">Technologies</p>
                <p className="text-h3 font-mono text-brand-accent">6</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs font-mono text-foreground/40">Last Updated</p>
              <p className="text-small font-mono text-foreground/60">2026-03-22</p>
            </div>
          </div>
        </Reveal>
      </div>
    </main>
  );
}
