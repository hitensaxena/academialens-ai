'use client';

import Link from 'next/link';

export function TermsLinks() {
  return (
    <p className="px-4 text-center text-sm text-muted-foreground">
      By continuing, you agree to our{' '}
      <Link
        href="/terms"
        className="font-medium text-primary underline-offset-4 hover:underline"
        onClick={(e) => e.preventDefault()}
      >
        Terms of Service
      </Link>{' '}
      and{' '}
      <Link
        href="/privacy"
        className="font-medium text-primary underline-offset-4 hover:underline"
        onClick={(e) => e.preventDefault()}
      >
        Privacy Policy
      </Link>
    </p>
  );
}
