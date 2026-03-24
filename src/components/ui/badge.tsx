import { cva, type VariantProps } from 'class-variance-authority';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  ['inline-flex items-center rounded-md px-2 py-0.5 text-small font-medium transition-colors'],
  {
    variants: {
      variant: {
        default: 'bg-surface-elevated text-fg-base border border-border',
        primary: 'bg-brand-primary/10 text-brand-primary border border-brand-primary/20',
        accent: 'bg-brand-accent/10 text-brand-accent border border-brand-accent/20',
        success: 'bg-success/10 text-success border border-success/20',
        warning: 'bg-warning/10 text-warning border border-warning/20',
        error: 'bg-error/10 text-error border border-error/20',
        outline: 'border border-border text-fg-base',
      },
      size: {
        sm: 'text-xs px-1.5 py-0',
        md: 'text-small px-2 py-0.5',
        lg: 'text-base px-3 py-1',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface BadgeProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, size, ...props }, ref) => (
    <div ref={ref} className={cn(badgeVariants({ variant, size, className }))} {...props} />
  )
);
Badge.displayName = 'Badge';

export { Badge, badgeVariants };
