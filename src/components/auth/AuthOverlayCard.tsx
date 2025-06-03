'use client';
import Image from 'next/image';
import { Button } from '@/components/ui/button/button';
import Link from 'next/link';
import React from 'react';

interface AuthOverlayCardProps {
  imageSrc?: string;
  title: string;
  subtitle?: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
  children?: React.ReactNode;
}

export function AuthOverlayCard({
  imageSrc = '/images/email-check.jpg',
  title,
  subtitle,
  description,
  actionLabel,
  actionHref,
  children,
}: AuthOverlayCardProps) {
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto bg-white rounded-2xl shadow-lg p-10 text-center">
      <div className="flex flex-col items-center gap-4 w-full">
        <Image
          src={imageSrc}
          alt="Illustration"
          width={120}
          height={120}
          className="mx-auto mb-2"
          priority
        />
        <h2 className="text-2xl font-bold text-figmaText-heading mb-1">{title}</h2>
        {subtitle && <p className="text-base text-figmaText-subheading mb-1">{subtitle}</p>}
        {description && <p className="text-sm text-gray-500 mb-2">{description}</p>}
        {children}
        {actionLabel && actionHref && (
          <Button asChild className="mt-4 w-full">
            <Link href={actionHref}>{actionLabel}</Link>
          </Button>
        )}
      </div>
    </div>
  );
}
