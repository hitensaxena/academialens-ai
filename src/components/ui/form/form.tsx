'use client';

import * as React from 'react';
import {
  useForm as useHookForm,
  type UseFormReturn,
  type SubmitHandler,
  type FieldValues,
  type DefaultValues,
  type UseFormProps,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { type z, type ZodSchema } from 'zod';
import { cn } from '@/lib/utils';

type FormProps<TFormValues extends FieldValues> = {
  form: UseFormReturn<TFormValues>;
  onSubmit: SubmitHandler<TFormValues>;
  children: React.ReactNode;
  className?: string;
  id?: string;
};

export function Form<TFormValues extends FieldValues>({
  form,
  onSubmit,
  children,
  className,
  id,
  ...props
}: FormProps<TFormValues>) {
  return (
    <form
      id={id}
      className={cn('space-y-6', className)}
      onSubmit={form.handleSubmit(onSubmit)}
      {...props}
    >
      {children}
    </form>
  );
}

type UseFormParams<T extends FieldValues> = {
  schema: ZodSchema<T>;
  defaultValues?: DefaultValues<T>;
  options?: Omit<UseFormProps<T>, 'resolver' | 'defaultValues'>;
};

export function useForm<T extends FieldValues>({
  schema,
  defaultValues,
  options,
}: UseFormParams<T>) {
  return useHookForm<T>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: 'onChange',
    reValidateMode: 'onChange',
    ...options,
  });
}

type FormFieldContextValue<T extends FieldValues> = {
  name: keyof T;
};

const FormFieldContext = React.createContext<FormFieldContextValue<FieldValues> | null>(null);

type FormFieldProps<T extends FieldValues> = {
  children: React.ReactNode;
  name: keyof T;
  className?: string;
};

export function FormField<T extends FieldValues>({ children, name, className }: FormFieldProps<T>) {
  return (
    <FormFieldContext.Provider value={{ name }}>
      <div className={cn('space-y-2', className)}>{children}</div>
    </FormFieldContext.Provider>
  );
}

type FormControlProps = {
  children: React.ReactElement;
};

export function FormControl({ children }: FormControlProps) {
  const fieldContext = React.useContext(FormFieldContext);
  const { formState } = useHookForm();

  if (!fieldContext) {
    throw new Error('FormControl must be used within a FormField');
  }

  const { name } = fieldContext;
  const error = formState.errors[name];

  return React.cloneElement(children, {
    ...children.props,
    name,
    'aria-invalid': error ? 'true' : 'false',
    'aria-describedby': error ? `${String(name)}-error` : undefined,
  });
}

type FormMessageProps = {
  className?: string;
  children?: React.ReactNode;
};

export function FormMessage({ className, children }: FormMessageProps) {
  const fieldContext = React.useContext(FormFieldContext);
  const { formState } = useHookForm();

  if (!fieldContext) {
    throw new Error('FormMessage must be used within a FormField');
  }

  const { name } = fieldContext;
  const error = formState.errors[name];

  if (!error?.message) {
    return children ? (
      <div className={cn('text-sm text-muted-foreground', className)}>{children}</div>
    ) : null;
  }

  return (
    <p
      id={`${String(name)}-error`}
      className={cn('text-sm font-medium text-destructive', className)}
    >
      {String(error.message)}
    </p>
  );
}

type FormLabelProps = {
  className?: string;
  children: React.ReactNode;
  optional?: boolean;
};

export function FormLabel({ className, children, optional }: FormLabelProps) {
  return (
    <label
      className={cn(
        'block text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
        className
      )}
    >
      {children}
      {optional && <span className="ml-1 text-xs text-muted-foreground">(optional)</span>}
    </label>
  );
}

type FormDescriptionProps = {
  className?: string;
  children: React.ReactNode;
};

export function FormDescription({ className, children }: FormDescriptionProps) {
  return <p className={cn('text-sm text-muted-foreground', className)}>{children}</p>;
}

// Re-export types
export type { FieldValues, UseFormReturn } from 'react-hook-form';
export type { z } from 'zod';
