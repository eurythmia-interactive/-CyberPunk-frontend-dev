'use client';

import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

const Tabs = TabsPrimitive.Root;

const tabsListVariants = cva(
  [
    'inline-flex items-center justify-center',
    'rounded-lg bg-surface-elevated p-1',
    'border border-border',
  ],
  {
    variants: {
      variant: {
        default: '',
        pills: 'bg-transparent p-0 gap-1',
        underline: 'bg-transparent p-0 border-b border-border rounded-none',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const tabsTriggerVariants = cva(
  [
    'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-small font-medium',
    'transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary',
    'disabled:pointer-events-none disabled:opacity-50',
  ],
  {
    variants: {
      variant: {
        default: [
          'text-zinc-500 hover:text-fg-base',
          'data-[state=active]:bg-surface data-[state=active]:text-brand-primary data-[state=active]:shadow-sm',
        ],
        pills: [
          'text-zinc-500 hover:text-fg-base',
          'data-[state=active]:bg-brand-primary data-[state=active]:text-bg-base',
          'rounded-full',
        ],
        underline: [
          'text-zinc-500 hover:text-fg-base rounded-none',
          'data-[state=active]:text-brand-primary border-b-2 border-brand-primary -mb-px',
          'data-[state=active]:shadow-none rounded-none',
        ],
      },
      size: {
        sm: 'text-xs px-2 py-1',
        md: 'text-small px-3 py-1.5',
        lg: 'text-base px-4 py-2',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

const tabsContentVariants = cva(
  ['mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary'],
  {
    variants: {
      variant: {
        default: '',
        ghost: '',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface TabsListProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>,
    VariantProps<typeof tabsListVariants> {}

const TabsList = forwardRef<React.ElementRef<typeof TabsPrimitive.List>, TabsListProps>(
  ({ className, variant, ...props }, ref) => (
    <TabsPrimitive.List
      ref={ref}
      className={cn(tabsListVariants({ variant, className }))}
      {...props}
    />
  )
);
TabsList.displayName = TabsPrimitive.List.displayName;

export interface TabsTriggerProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>,
    VariantProps<typeof tabsTriggerVariants> {}

const TabsTrigger = forwardRef<React.ElementRef<typeof TabsPrimitive.Trigger>, TabsTriggerProps>(
  ({ className, variant, size, ...props }, ref) => (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(tabsTriggerVariants({ variant, size, className }))}
      {...props}
    />
  )
);
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

export interface TabsContentProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>,
    VariantProps<typeof tabsContentVariants> {}

const TabsContent = forwardRef<React.ElementRef<typeof TabsPrimitive.Content>, TabsContentProps>(
  ({ className, variant, ...props }, ref) => (
    <TabsPrimitive.Content
      ref={ref}
      className={cn(tabsContentVariants({ variant, className }))}
      {...props}
    />
  )
);
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsContent, TabsList, TabsTrigger };
