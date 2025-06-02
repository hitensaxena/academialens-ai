'use client';

import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check } from 'lucide-react';

import { cn } from '@/lib/utils';

export interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  /** Error state for the checkbox */
  error?: boolean;
  /** Description text for the checkbox */
  description?: string;
  /** Label text for the checkbox */
  label?: string;
  /** Whether the label should be visually hidden */
  hideLabel?: boolean;
  /** Whether the checkbox is in a loading state */
  isLoading?: boolean;
  /** Additional class name for the container */
  containerClassName?: string;
}

/**
 * A customizable checkbox component that integrates with the form system.
 * Supports labels, descriptions, error states, and loading states.
 */
const Checkbox = React.forwardRef<React.ElementRef<typeof CheckboxPrimitive.Root>, CheckboxProps>(
  (
    {
      className,
      id,
      error = false,
      description,
      label,
      hideLabel = false,
      disabled = false,
      isLoading = false,
      containerClassName,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const checkboxId = id || generatedId;
    const isDisabled = disabled || isLoading;

    const checkbox = (
      <div className={cn('flex items-start space-x-2', containerClassName)}>
        <div className="flex h-5 items-center">
          <CheckboxPrimitive.Root
            ref={ref}
            id={checkboxId}
            disabled={isDisabled}
            className={cn(
              'peer h-4 w-4 shrink-0 rounded-sm border border-input ring-offset-background',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
              'disabled:cursor-not-allowed disabled:opacity-50',
              'data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
              {
                'border-destructive focus-visible:ring-destructive data-[state=checked]:bg-destructive':
                  error,
                'opacity-50': isLoading,
              },
              className
            )}
            aria-describedby={description ? `${checkboxId}-description` : undefined}
            {...props}
          >
            <CheckboxPrimitive.Indicator
              className={cn('flex items-center justify-center text-current')}
            >
              {isLoading ? (
                <svg
                  className="h-3 w-3 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              ) : (
                <Check className="h-3 w-3" />
              )}
            </CheckboxPrimitive.Indicator>
          </CheckboxPrimitive.Root>
        </div>
        {(label || description) && (
          <div className="grid gap-1.5 leading-none">
            {label && (
              <label
                htmlFor={checkboxId}
                className={cn(
                  'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
                  hideLabel && 'sr-only',
                  error && 'text-destructive'
                )}
              >
                {label}
              </label>
            )}
            {description && (
              <p
                id={`${checkboxId}-description`}
                className={cn('text-sm', error ? 'text-destructive' : 'text-muted-foreground')}
              >
                {description}
              </p>
            )}
          </div>
        )}
      </div>
    );

    return checkbox;
  }
);

Checkbox.displayName = 'Checkbox';

export { Checkbox };
