import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines multiple class names using `clsx` and `tailwind-merge`.
 * This ensures Tailwind CSS classes are properly merged and deduplicated.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
