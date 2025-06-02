'use client';

import * as React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { Circle } from 'lucide-react';

import { cn } from '@/lib/utils';

export interface RadioGroupProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> {
  /** Error message to display */
  error?: string;
  /** Label text for the radio group */
  label?: string;
  /** Whether the label should be visually hidden */
  hideLabel?: boolean;
  /** Description text for the radio group */
  description?: string;
  /** Whether the radio group is required */
  required?: boolean;
  /** Whether the radio group is disabled */
  disabled?: boolean;
  /** Additional class name for the container */
  containerClassName?: string;
}

export interface RadioGroupItemProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> {
  /** Label text for the radio item */
  label?: string;
  /** Description text for the radio item */
  description?: string;
  /** Whether the radio item is disabled */
  disabled?: boolean;
  /** Additional class name for the container */
  containerClassName?: string;
}

/**
 * A set of checkable buttons—known as radio buttons—where no more than one of the buttons can be checked at a time.
 * This component is built on top of Radix UI's radio group primitives.
 */
const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  RadioGroupProps
>(
  (
    {
      className,
      error,
      label,
      hideLabel = false,
      description,
      required = false,
      disabled = false,
      containerClassName,
      ...props
    },
    ref
  ) => {
    const groupId = React.useId();
    const descriptionId = `${groupId}-description`;
    const errorId = `${groupId}-error`;

    return (
      <div className={cn('space-y-2', containerClassName)}>
        {label && (
          <label
            className={cn(
              'block text-sm font-medium leading-none',
              hideLabel && 'sr-only',
              error ? 'text-destructive' : 'text-foreground',
              disabled && 'text-muted-foreground/50'
            )}
            htmlFor={groupId}
          >
            {label}
            {required && <span className="ml-1 text-destructive">*</span>}
          </label>
        )}
        {description && (
          <p
            id={descriptionId}
            className={cn(
              'text-sm',
              error ? 'text-destructive' : 'text-muted-foreground',
              disabled && 'text-muted-foreground/50'
            )}
          >
            {description}
          </p>
        )}
        <RadioGroupPrimitive.Root
          ref={ref}
          className={cn('grid gap-2', className)}
          disabled={disabled}
          aria-describedby={
            [error ? errorId : '', description ? descriptionId : ''].filter(Boolean).join(' ') ||
            undefined
          }
          aria-invalid={!!error}
          aria-errormessage={error ? errorId : undefined}
          {...props}
        />
        {error && (
          <p id={errorId} className="text-sm font-medium text-destructive" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);
RadioGroup.displayName = 'RadioGroup';

/**
 * An item in the radio group.
 */
const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioGroupItemProps
>(
  (
    { className, children, label, description, disabled = false, containerClassName, id, ...props },
    ref
  ) => {
    const itemId = id || React.useId();
    const hasLabel = label || description;

    return (
      <div
        className={cn(
          'flex items-start space-x-3',
          disabled && 'cursor-not-allowed opacity-50',
          containerClassName
        )}
      >
        <RadioGroupPrimitive.Item
          ref={ref}
          id={itemId}
          className={cn(
            'peer h-4 w-4 shrink-0 rounded-full border border-primary ring-offset-background',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'data-[state=checked]:border-primary',
            className
          )}
          disabled={disabled}
          {...props}
        >
          <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
            <Circle className="h-2.5 w-2.5 fill-primary text-primary" />
          </RadioGroupPrimitive.Indicator>
        </RadioGroupPrimitive.Item>
        {hasLabel && (
          <div className="grid gap-1.5 leading-none">
            {label && (
              <label
                htmlFor={itemId}
                className={cn(
                  'text-sm font-medium leading-none',
                  disabled ? 'cursor-not-allowed text-muted-foreground' : 'cursor-pointer',
                  'peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                )}
              >
                {label}
              </label>
            )}
            {description && (
              <p
                className={cn(
                  'text-sm',
                  disabled ? 'text-muted-foreground/70' : 'text-muted-foreground'
                )}
              >
                {description}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
);
RadioGroupItem.displayName = 'RadioGroupItem';

export { RadioGroup, RadioGroupItem };
