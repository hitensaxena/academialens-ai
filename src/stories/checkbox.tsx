import * as React from 'react';

type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
};

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className = '', ...props }, ref) => (
    <input
      type="checkbox"
      ref={ref}
      className={`h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary ${className}`}
      {...props}
    />
  )
);

Checkbox.displayName = 'Checkbox';
