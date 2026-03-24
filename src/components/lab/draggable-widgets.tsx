'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { motion } from 'framer-motion';
import { GripVertical, Minus, TrendingDown, TrendingUp } from 'lucide-react';
import type { ServerWidget } from '@/store/use-widget-store';

interface SortableWidgetProps {
  widget: ServerWidget;
}

function getWidgetIcon(type: ServerWidget['type']) {
  switch (type) {
    case 'cpu':
      return <span className="text-brand-primary font-mono">◈</span>;
    case 'memory':
      return <span className="text-brand-accent font-mono">◇</span>;
    case 'network':
      return <span className="text-brand-primary font-mono">◉</span>;
    case 'disk':
      return <span className="text-brand-accent font-mono">◎</span>;
  }
}

function getWidgetColor(type: ServerWidget['type']) {
  switch (type) {
    case 'cpu':
      return 'from-brand-primary/20 to-brand-primary/5 border-brand-primary/30';
    case 'memory':
      return 'from-brand-accent/20 to-brand-accent/5 border-brand-accent/30';
    case 'network':
      return 'from-success/20 to-success/5 border-success/30';
    case 'disk':
      return 'from-warning/20 to-warning/5 border-warning/30';
  }
}

function getTrendIcon(trend: ServerWidget['trend']) {
  switch (trend) {
    case 'up':
      return <TrendingUp size={14} className="text-error" />;
    case 'down':
      return <TrendingDown size={14} className="text-success" />;
    case 'stable':
      return <Minus size={14} className="text-foreground/40" />;
  }
}

export function SortableWidget({ widget }: SortableWidgetProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: widget.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{
        opacity: isDragging ? 0.5 : 1,
        scale: isDragging ? 1.05 : 1,
        zIndex: isDragging ? 50 : 0,
      }}
      className={`
        relative rounded-xl border bg-gradient-to-br p-4
        ${isDragging ? 'shadow-neon-cyan shadow-lg' : ''}
        ${getWidgetColor(widget.type)}
      `}
    >
      {/* Drag Handle */}
      <div
        {...attributes}
        {...listeners}
        className="absolute top-2 right-2 p-1 cursor-grab active:cursor-grabbing hover:bg-surface/50 rounded transition-colors"
      >
        <GripVertical size={16} className="text-foreground/30 hover:text-brand-primary" />
      </div>

      {/* Widget Content */}
      <div className="flex flex-col gap-2">
        {/* Header */}
        <div className="flex items-center gap-2">
          {getWidgetIcon(widget.type)}
          <span className="text-xs font-mono text-foreground/70">{widget.title}</span>
        </div>

        {/* Value */}
        <div className="flex items-end justify-between">
          <div>
            <span className="text-2xl font-mono text-foreground">{widget.value}</span>
            <span className="text-xs font-mono text-foreground/50 ml-1">{widget.unit}</span>
          </div>
          <div className="flex items-center gap-1">{getTrendIcon(widget.trend)}</div>
        </div>

        {/* Mini bar chart visualization */}
        <div className="flex items-center gap-0.5 h-8">
          {Array.from({ length: 20 }, (_, i) => {
            const height = Math.sin(i * 0.5 + widget.value * 0.1) * 50 + 50;
            const isActive = i > 20 - widget.value / 5;
            return (
              <div
                key={`bar-${widget.id}-${String(i).padStart(2, '0')}`}
                className={`flex-1 rounded-sm transition-colors ${
                  isActive ? 'bg-brand-primary/60' : 'bg-surface/30'
                }`}
                style={{ height: `${height}%` }}
              />
            );
          })}
        </div>
      </div>

      {/* Drag overlay glow */}
      {isDragging && (
        <div className="absolute inset-0 rounded-xl pointer-events-none">
          <div className="absolute inset-0 rounded-xl border-2 border-brand-primary/50 animate-pulse" />
        </div>
      )}
    </motion.div>
  );
}

interface DraggableWidgetsGridProps {
  widgets: ServerWidget[];
  order: string[];
}

export function DraggableWidgetsGrid({ widgets, order }: DraggableWidgetsGridProps) {
  // Sort widgets according to order
  const sortedWidgets = order
    .map((id) => widgets.find((w) => w.id === id))
    .filter(Boolean) as ServerWidget[];

  return (
    <div className="w-full h-full grid grid-cols-2 gap-3 content-start">
      {sortedWidgets.map((widget) => (
        <SortableWidget key={widget.id} widget={widget} />
      ))}
    </div>
  );
}
