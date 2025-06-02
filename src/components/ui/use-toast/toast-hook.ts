'use client';

import * as React from 'react';

type ToastVariant = 'default' | 'destructive';

export interface ToastProps {
  id: string;
  title?: string;
  description?: string;
  variant?: ToastVariant;
  action?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export interface ToastActionElement extends React.HTMLAttributes<HTMLButtonElement> {
  altText: string;
}

// Constants
const TOAST_LIMIT = 5;
const TOAST_REMOVE_DELAY = 1000;

// Action types
const ADD_TOAST = 'ADD_TOAST';
const UPDATE_TOAST = 'UPDATE_TOAST';
const DISMISS_TOAST = 'DISMISS_TOAST';
const REMOVE_TOAST = 'REMOVE_TOAST';

type ToasterToast = ToastProps & {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
};

type Action =
  | { type: typeof ADD_TOAST; toast: ToasterToast }
  | { type: typeof UPDATE_TOAST; toast: Partial<ToasterToast> & { id: string } }
  | { type: typeof DISMISS_TOAST | typeof REMOVE_TOAST; toastId?: string };

interface State {
  toasts: ToasterToast[];
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const removeToast = React.useCallback((toastId: string) => {
    if (toastTimeouts.has(toastId)) return;

    const timeout = setTimeout(() => {
      toastTimeouts.delete(toastId);
      dispatch({ type: REMOVE_TOAST, toastId });
    }, TOAST_REMOVE_DELAY);

    toastTimeouts.set(toastId, timeout);
  }, []);

  const toast = React.useCallback(({ ...props }: Omit<ToasterToast, 'id'>) => {
    const id = genId();
    const dismiss = () => dispatch({ type: DISMISS_TOAST, toastId: id });

    dispatch({
      type: ADD_TOAST,
      toast: {
        ...props,
        id,
        open: true,
        onOpenChange: (open) => {
          if (!open) dismiss();
        },
      },
    });

    return {
      id,
      dismiss,
      update: (props: Partial<ToasterToast>) =>
        dispatch({ type: UPDATE_TOAST, toast: { ...props, id } }),
    };
  }, []);

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: DISMISS_TOAST, toastId }),
  };
}
