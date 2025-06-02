'use client';

import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const labelVariants = cva(
  'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
  {
    variants: {
      variant: {
        default: '',
        error: 'text-destructive',
        success: 'text-green-600',
        warning: 'text-amber-500',
        info: 'text-blue-500',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants> & {
      required?: boolean;
      tooltip?: string;
    }
>(({ className, variant, required, children, ...props }, ref) => (
  <div className="flex items-center">
    <LabelPrimitive.Root ref={ref} className={cn(labelVariants({ variant }), className)} {...props}>
      {children}
      {required && <span className="ml-1 text-destructive">*</span>}
    </LabelPrimitive.Root>
  </div>
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
