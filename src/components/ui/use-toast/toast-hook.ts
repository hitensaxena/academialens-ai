'use client';

import * as React from 'react';

type ToastVariant = 'default' | 'destructive';

// Define the props for a toast action button
export interface ToastActionElementProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  altText: string;
  children: React.ReactNode;
  className?: string;
  // Add any additional props that might be needed for the action button
  [key: string]: any;
}

// Type for a toast action element
export type ToastActionElement = React.ReactElement<ToastActionElementProps>;

export interface ToasterToast {
  id: string;
  variant?: ToastVariant;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement | React.ReactElement | null;
  icon?: React.ReactNode;
  duration?: number;
  onDismiss?: () => void;
  open?: boolean;
}

export interface ToastProps {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  variant?: ToastVariant;
  action?: ToastActionElement | React.ReactElement | null;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  icon?: React.ReactNode;
  duration?: number;
}

// Constants
const TOAST_LIMIT = 5;
const TOAST_REMOVE_DELAY = 1000;

// Action types
const ADD_TOAST = 'ADD_TOAST';
const UPDATE_TOAST = 'UPDATE_TOAST';
const DISMISS_TOAST = 'DISMISS_TOAST';
const REMOVE_TOAST = 'REMOVE_TOAST';

type Action =
  | { type: typeof ADD_TOAST; toast: ToasterToast }
  | { type: typeof UPDATE_TOAST; toast: Partial<ToasterToast> & { id: string } }
  | { type: typeof DISMISS_TOAST | typeof REMOVE_TOAST; toastId?: string };

interface State {
  toasts: ToasterToast[];
}

interface ToastReturn {
  id: string;
  dismiss: () => void;
  update: (props: Partial<ToasterToast>) => void;
}

interface ToastFunction {
  (props: Omit<ToasterToast, 'id'>): ToastReturn;
  promise: <T>(
    promise: Promise<T>,
    opts: {
      loading: React.ReactNode;
      success: (data: T) => React.ReactNode;
      error: (error: Error) => React.ReactNode;
    }
  ) => ToastReturn;
}

let count = 0;
const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

const initialState: State = { toasts: [] };

function toastReducer(state: State, action: Action): State {
  switch (action.type) {
    case ADD_TOAST:
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      };

    case UPDATE_TOAST:
      return {
        ...state,
        toasts: state.toasts.map((t) => (t.id === action.toast.id ? { ...t, ...action.toast } : t)),
      };

    case DISMISS_TOAST: {
      const { toastId } = action;

      // Clear timeout if dismissing a specific toast
      if (toastId) {
        const timeout = toastTimeouts.get(toastId);
        if (timeout) clearTimeout(timeout);
        toastTimeouts.delete(toastId);

        return {
          ...state,
          toasts: state.toasts.map((t) => (t.id === toastId ? { ...t, open: false } : t)),
        };
      }

      // Dismiss all toasts
      state.toasts.forEach((toast) => {
        const timeout = toastTimeouts.get(toast.id);
        if (timeout) clearTimeout(timeout);
        toastTimeouts.delete(toast.id);
      });

      return {
        ...state,
        toasts: state.toasts.map((t) => ({ ...t, open: false })),
      };
    }

    case REMOVE_TOAST:
      if (action.toastId === undefined) {
        return { ...state, toasts: [] };
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      };

    default:
      return state;
  }
}

export function useToast() {
  const [state, dispatch] = React.useReducer(toastReducer, initialState);

  // Helper function to create a toast action element
  const createToastAction = (props: ToastActionElementProps): ToastActionElement => {
    const { altText, children, className = '', ...rest } = props;

    // Create a button element with the necessary props
    const buttonProps: ToastActionElementProps = {
      ...rest,
      'aria-label': altText,
      className:
        `inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${className}`.trim(),
      children,
      altText,
    };

    // Return the button element with proper typing
    return React.createElement('button', buttonProps) as unknown as ToastActionElement;
  };

  const dismiss = React.useCallback((toastId?: string) => {
    dispatch({ type: 'DISMISS_TOAST', toastId });
  }, []);

  // Create the toast function with promise method
  const toast = ((props: Omit<ToasterToast, 'id'>) => {
    const id = genId();
    const toast = { ...props, id };
    dispatch({ type: 'ADD_TOAST', toast });
    return {
      id,
      dismiss: () => dispatch({ type: 'DISMISS_TOAST', toastId: id }),
      update: (props: Partial<ToasterToast>) =>
        dispatch({ type: 'UPDATE_TOAST', toast: { ...props, id } }),
    };
  }) as ToastFunction;

  // Add promise method to toast function
  toast.promise = <T>(
    promise: Promise<T>,
    opts: {
      loading: React.ReactNode;
      success: (data: T) => React.ReactNode;
      error: (error: Error) => React.ReactNode;
    }
  ) => {
    const id = genId();

    // Show loading toast
    const loadingToast = {
      id,
      title: String(opts.loading),
      variant: 'default' as const,
    };

    dispatch({ type: 'ADD_TOAST', toast: loadingToast });

    // Handle promise resolution
    promise
      .then((data) => {
        const successTitle = opts.success(data);
        dispatch({
          type: 'UPDATE_TOAST',
          toast: {
            id,
            title: typeof successTitle === 'string' ? successTitle : String(successTitle),
            variant: 'default' as const,
          },
        });
      })
      .catch((error) => {
        const errorTitle = opts.error(error);
        dispatch({
          type: 'UPDATE_TOAST',
          toast: {
            id,
            title: typeof errorTitle === 'string' ? errorTitle : String(errorTitle),
            variant: 'destructive' as const,
          },
        });
      });

    return {
      id,
      dismiss: () => dispatch({ type: 'DISMISS_TOAST', toastId: id }),
      update: (props: Partial<ToasterToast>) =>
        dispatch({ type: 'UPDATE_TOAST', toast: { ...props, id } }),
    };
  };

  const removeToast = React.useCallback((toastId: string) => {
    if (toastTimeouts.has(toastId)) return;

    const timeout = setTimeout(() => {
      toastTimeouts.delete(toastId);
      dispatch({ type: REMOVE_TOAST, toastId });
    }, TOAST_REMOVE_DELAY);

    toastTimeouts.set(toastId, timeout);
  }, []);

  React.useEffect(() => {
    state.toasts.forEach((toast) => {
      if (toast.open === false) {
        dismiss(toast.id);
      }
    });
  }, [state.toasts, dismiss]);

  return {
    toasts: state.toasts,
    toast,
    dismiss,
  };
}
