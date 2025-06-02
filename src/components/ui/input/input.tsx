import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Error message to display below the input */
  error?: string;
  /** Icon to display on the left side of the input */
  leftIcon?: React.ReactNode;
  /** Icon to display on the right side of the input */
  rightIcon?: React.ReactNode;
  /** Whether the input is in a loading state */
  isLoading?: boolean;
  /** Whether the input is in a success state */
  isSuccess?: boolean;
  /** Additional helper text to display below the input */
  helperText?: string;
  /** The label text for the input */
  label?: string;
  /** Whether the label should be visually hidden */
  hideLabel?: boolean;
  /** The ID of the input element (required for accessibility) */
  id?: string;
  /** The description text for the input */
  description?: string;
}

/**
 * A customizable input component that integrates with the form system.
 * Supports icons, validation states, and accessibility features.
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = 'text',
      error,
      leftIcon,
      rightIcon,
      isLoading = false,
      isSuccess = false,
      helperText,
      label,
      hideLabel = false,
      id,
      description,
      ...props
    },
    ref
  ) => {
    const inputId = id || React.useId();
    const hasError = !!error;
    const showSuccess = !hasError && isSuccess;
    const showHelperText = helperText || hasError;

    const inputElement = (
      <div className="relative w-full">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
            {leftIcon}
          </div>
        )}
        <input
          id={inputId}
          type={type}
          className={cn(
            'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background transition-colors',
            'file:border-0 file:bg-transparent file:text-sm file:font-medium',
            'placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
            'disabled:cursor-not-allowed disabled:opacity-50',
            {
              'pl-10': leftIcon,
              'pr-10': rightIcon || isLoading || showSuccess,
              'border-destructive focus-visible:ring-destructive': hasError,
              'border-success focus-visible:ring-success': showSuccess,
            },
            className
          )}
          ref={ref}
          aria-invalid={hasError ? 'true' : 'false'}
          aria-describedby={
            [
              hasError && `${inputId}-error`,
              helperText && `${inputId}-helper`,
              description && `${inputId}-description`,
            ]
              .filter(Boolean)
              .join(' ') || undefined
          }
          {...props}
        />
        {rightIcon && !isLoading && !showSuccess && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground">
            {rightIcon}
          </div>
        )}
        {isLoading && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <svg
              className="h-5 w-5 animate-spin text-muted-foreground"
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
          </div>
        )}
        {showSuccess && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-success">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
        )}
      </div>
    );

    if (!label && !helperText && !description && !hasError) {
      return inputElement;
    }

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              'block text-sm font-medium leading-none',
              hideLabel && 'sr-only',
              hasError && 'text-destructive'
            )}
          >
            {label}
          </label>
        )}
        {description && (
          <p id={`${inputId}-description`} className="text-sm text-muted-foreground">
            {description}
          </p>
        )}
        {inputElement}
        {showHelperText && (
          <p
            id={`${inputId}-${hasError ? 'error' : 'helper'}`}
            className={cn('text-sm', hasError ? 'text-destructive' : 'text-muted-foreground')}
          >
            {hasError ? error : helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
