import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

const alertVariants = cva(
  'relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground',
  {
    variants: {
      variant: {
        default: 'bg-background text-foreground',
        destructive:
          'border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive',
        success: 'border-green-500/50 text-green-700 dark:text-green-400 [&>svg]:text-green-500',
        warning: 'border-amber-500/50 text-amber-700 dark:text-amber-400 [&>svg]:text-amber-500',
        info: 'border-blue-500/50 text-blue-700 dark:text-blue-400 [&>svg]:text-blue-500',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> &
    VariantProps<typeof alertVariants> & {
      onDismiss?: () => void;
    }
>(({ className, variant, onDismiss, children, ...props }, ref) => {
  const hasDismiss = !!onDismiss;

  return (
    <div
      ref={ref}
      role="alert"
      className={cn(alertVariants({ variant }), className, {
        'pr-10': hasDismiss,
      })}
      {...props}
    >
      {children}
      {hasDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className="absolute right-2 top-2 rounded-md p-0.5 text-foreground/50 hover:bg-foreground/10 hover:text-foreground focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-foreground/20"
          aria-label="Dismiss"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
});
Alert.displayName = 'Alert';

const AlertTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h5
      ref={ref}
      className={cn('mb-1 font-medium leading-none tracking-tight', className)}
      {...props}
    />
  )
);
AlertTitle.displayName = 'AlertTitle';

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('text-sm [&_p]:leading-relaxed', className)} {...props} />
));
AlertDescription.displayName = 'AlertDescription';

export { Alert, AlertTitle, AlertDescription };
