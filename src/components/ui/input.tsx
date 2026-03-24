import { cva, type VariantProps } from 'class-variance-authority';
import type { InputHTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

const inputVariants = cva(
  [
    'flex h-10 w-full rounded-lg border border-border bg-surface px-3 py-2 text-small',
    'font-mono transition-colors',
    'file:border-0 file:bg-transparent file:text-small file:font-medium',
    'placeholder:text-zinc-500',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:border-brand-primary',
    'disabled:cursor-not-allowed disabled:opacity-50',
  ],
  {
    variants: {
      variant: {
        default: 'border-border',
        error: 'border-error focus-visible:ring-error',
        success: 'border-success focus-visible:ring-success',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input, inputVariants };
