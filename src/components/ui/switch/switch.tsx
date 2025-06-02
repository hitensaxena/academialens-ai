'use client';

import * as React from 'react';
import * as SwitchPrimitives from '@radix-ui/react-switch';
import { cn } from '@/lib/utils';

export interface SwitchProps extends React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> {
  /** Label text for the switch */
  label?: string;
  /** Whether the label should be visually hidden */
  hideLabel?: boolean;
  /** Description text for the switch */
  description?: string;
  /** Error message to display */
  error?: string;
  /** Whether the switch is in a loading state */
  isLoading?: boolean;
  /** Whether the switch is in a success state */
  isSuccess?: boolean;
  /** Additional class name for the container */
  containerClassName?: string;
  /** Whether the switch is required */
  required?: boolean;
  /** Whether the switch is disabled */
  disabled?: boolean;
}

/**
 * A control that allows users to toggle between checked and not checked.
 * Built on Radix UI's Switch primitive with added features like labels, descriptions, and loading states.
 */
const Switch = React.forwardRef<React.ElementRef<typeof SwitchPrimitives.Root>, SwitchProps>(
  (
    {
      className,
      id,
      label,
      hideLabel = false,
      description,
      error,
      isLoading = false,
      isSuccess = false,
      required = false,
      disabled = false,
      containerClassName,
      checked,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const switchId = id || generatedId;
    const hasError = !!error;
    const showSuccess = !hasError && isSuccess;
    const isDisabled = disabled || isLoading;

    const switchElement = (
      <div className={cn('inline-flex items-center gap-2', containerClassName)}>
        <SwitchPrimitives.Root
          id={switchId}
          className={cn(
            'peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent',
            'transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'data-[state=checked]:bg-primary data-[state=unchecked]:bg-input',
            {
              'data-[state=checked]:bg-destructive': hasError,
              'data-[state=checked]:bg-success': showSuccess,
              'opacity-70': isLoading,
            },
            className
          )}
          checked={checked}
          disabled={isDisabled}
          aria-describedby={
            [error ? `${switchId}-error` : '', description ? `${switchId}-description` : '']
              .filter(Boolean)
              .join(' ') || undefined
          }
          aria-invalid={hasError ? 'true' : 'false'}
          {...props}
          ref={ref}
        >
          <SwitchPrimitives.Thumb
            className={cn(
              'pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform',
              'data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0',
              'flex items-center justify-center',
              {
                'animate-pulse': isLoading,
              }
            )}
          >
            {isLoading && (
              <svg
                className="h-3 w-3 text-muted-foreground"
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
            )}
            {showSuccess && !isLoading && (
              <svg
                className="h-3 w-3 text-success-foreground"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
            )}
          </SwitchPrimitives.Thumb>
        </SwitchPrimitives.Root>
        {(label || description) && (
          <div className="grid gap-1.5">
            {label && (
              <label
                htmlFor={switchId}
                className={cn(
                  'text-sm font-medium leading-none',
                  hideLabel && 'sr-only',
                  hasError ? 'text-destructive' : 'text-foreground',
                  isDisabled && 'cursor-not-allowed opacity-70'
                )}
              >
                {label}
                {required && <span className="ml-1 text-destructive">*</span>}
              </label>
            )}
            {description && (
              <p
                id={`${switchId}-description`}
                className={cn(
                  'text-sm',
                  hasError ? 'text-destructive' : 'text-muted-foreground',
                  isDisabled && 'opacity-70'
                )}
              >
                {description}
              </p>
            )}
          </div>
        )}
      </div>
    );

    if (hasError) {
      return (
        <div className="grid gap-1.5">
          {switchElement}
          <p id={`${switchId}-error`} className="text-sm font-medium text-destructive" role="alert">
            {error}
          </p>
        </div>
      );
    }

    return switchElement;
  }
);

Switch.displayName = 'Switch';

export { Switch };
