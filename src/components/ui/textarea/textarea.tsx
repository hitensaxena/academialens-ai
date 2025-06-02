import * as React from 'react';
import { cn } from '@/lib/utils';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Error message to display below the textarea */
  error?: string;
  /** Label text for the textarea */
  label?: string;
  /** Whether the label should be visually hidden */
  hideLabel?: boolean;
  /** Description text for the textarea */
  description?: string;
  /** Maximum allowed characters */
  maxLength?: number;
  /** Whether to show character count */
  showCharCount?: boolean;
  /** Whether the textarea is in a loading state */
  isLoading?: boolean;
  /** Whether the textarea is in a success state */
  isSuccess?: boolean;
  /** Additional class name for the container */
  containerClassName?: string;
}

/**
 * A customizable textarea component with support for labels, error states,
 * character counting, and loading/success states.
 */
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      error,
      label,
      hideLabel = false,
      description,
      maxLength,
      showCharCount = false,
      value = '',
      isLoading = false,
      isSuccess = false,
      disabled = false,
      containerClassName,
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const textareaId = id || generatedId;
    const hasError = !!error;
    const showSuccess = !hasError && isSuccess;
    const showHelperText = error || description || (showCharCount && maxLength);
    const charCount = typeof value === 'string' ? value.length : 0;
    const isMaxLengthExceeded = maxLength ? charCount > maxLength : false;
    const isDisabled = disabled || isLoading;

    const textarea = (
      <div className={cn('w-full', containerClassName)}>
        {label && (
          <label
            htmlFor={textareaId}
            className={cn(
              'mb-1 block text-sm font-medium leading-none',
              hideLabel && 'sr-only',
              hasError && 'text-destructive'
            )}
          >
            {label}
          </label>
        )}
        {description && (
          <p id={`${textareaId}-description`} className="mb-2 text-sm text-muted-foreground">
            {description}
          </p>
        )}
        <div className="relative">
          <textarea
            id={textareaId}
            className={cn(
              'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background',
              'placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
              'disabled:cursor-not-allowed disabled:opacity-50',
              'transition-colors',
              {
                'border-destructive focus-visible:ring-destructive': hasError,
                'border-success focus-visible:ring-success': showSuccess,
                'pr-10': showCharCount && maxLength,
              },
              className
            )}
            ref={ref}
            value={value}
            maxLength={maxLength}
            disabled={isDisabled}
            aria-invalid={hasError ? 'true' : 'false'}
            aria-describedby={
              [
                hasError && `${textareaId}-error`,
                description && `${textareaId}-description`,
                showCharCount && maxLength && `${textareaId}-charcount`,
              ]
                .filter(Boolean)
                .join(' ') || undefined
            }
            {...props}
          />
          {isLoading && (
            <div className="absolute right-3 top-2.5">
              <svg
                className="h-4 w-4 animate-spin text-muted-foreground"
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
          {showSuccess && !isLoading && (
            <div className="absolute right-3 top-2.5 text-success">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
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
        {showHelperText && (
          <div className="mt-1 flex items-center justify-between">
            <p
              id={`${textareaId}-error`}
              className={cn('text-sm', hasError ? 'text-destructive' : 'text-muted-foreground')}
            >
              {hasError ? error : description}
            </p>
            {showCharCount && maxLength && (
              <span
                id={`${textareaId}-charcount`}
                className={cn(
                  'text-xs',
                  isMaxLengthExceeded ? 'text-destructive' : 'text-muted-foreground'
                )}
              >
                {charCount}/{maxLength}
              </span>
            )}
          </div>
        )}
      </div>
    );

    return textarea;
  }
);

Textarea.displayName = 'Textarea';

export { Textarea };
