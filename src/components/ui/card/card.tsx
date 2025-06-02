import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const cardVariants = cva(
  'rounded-lg border bg-card text-card-foreground shadow-sm transition-colors',
  {
    variants: {
      variant: {
        default: 'border-border',
        primary: 'border-primary/20 hover:border-primary/40',
        secondary: 'border-secondary/20 hover:border-secondary/40',
        destructive: 'border-destructive/20 hover:border-destructive/40',
        outline: 'border-border hover:border-primary/50',
        ghost: 'border-transparent hover:bg-accent/50',
      },
      elevation: {
        sm: 'shadow-sm',
        md: 'shadow',
        lg: 'shadow-md',
        xl: 'shadow-lg',
        none: 'shadow-none',
      },
      hoverable: {
        true: 'hover:shadow-md transition-shadow duration-200',
      },
      fullWidth: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      elevation: 'sm',
      hoverable: false,
      fullWidth: false,
    },
  }
);

interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  asChild?: boolean;
  disabled?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, elevation, hoverable, fullWidth, disabled, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          cardVariants({ variant, elevation, hoverable, fullWidth, className }),
          disabled && 'opacity-50 cursor-not-allowed',
          'relative overflow-hidden',
          className
        )}
        aria-disabled={disabled}
        {...props}
      />
    );
  }
);
Card.displayName = 'Card';

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { withBorder?: boolean }
>(({ className, withBorder = false, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex flex-col space-y-1.5 p-6',
      withBorder && 'border-b border-border',
      className
    )}
    {...props}
  />
));
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn('text-2xl font-semibold leading-none tracking-tight', className)}
      {...props}
    />
  )
);
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props} />
));
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
  )
);
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { withBorder?: boolean }
>(({ className, withBorder = false, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center p-6 pt-0', withBorder && 'border-t border-border', className)}
    {...props}
  />
));
CardFooter.displayName = 'CardFooter';

// Additional Components
const CardMedia = React.forwardRef<HTMLDivElement, React.ImgHTMLAttributes<HTMLImageElement>>(
  ({ className, alt = '', ...props }, ref) => (
    <div className="relative w-full overflow-hidden">
      <img
        ref={ref as React.RefObject<HTMLImageElement>}
        className={cn('w-full h-auto object-cover', className)}
        alt={alt}
        {...props}
      />
    </div>
  )
);
CardMedia.displayName = 'CardMedia';

interface CardActionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

const CardAction = React.forwardRef<HTMLButtonElement, CardActionProps>(
  ({ className, children, asChild = false, ...props }, ref) => {
    if (asChild) {
      return (
        <div
          ref={ref as unknown as React.Ref<HTMLDivElement>}
          className={cn(
            'inline-flex items-center justify-center rounded-md text-sm font-medium',
            'transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
            'bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2',
            className
          )}
          {...(props as React.HTMLAttributes<HTMLDivElement>)}
        >
          {children}
        </div>
      );
    }

    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-md text-sm font-medium',
          'transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
          'bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2',
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
CardAction.displayName = 'CardAction';

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  CardMedia,
  CardAction,
  type CardProps,
};
