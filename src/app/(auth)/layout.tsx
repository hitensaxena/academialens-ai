'use client'; // Required for usePathname

import { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Import usePathname
import { Icons } from '@/components';
import { TermsLinks } from '@/components/auth/terms-links';

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const pathname = usePathname(); // Get current pathname
  const isSignupPage = pathname === '/signup';
  const backgroundImage = isSignupPage ? '/images/signup-image.jpg' : '/images/auth-background.jpg';

  return (
    <div className="min-h-screen bg-authLayout-bg">
      <div className="flex h-screen flex-col md:flex-row">
        {/* Left Panel (Branding) */}
        <div className="relative hidden w-full flex-col justify-between bg-authLayout-leftPanelBg p-8 text-white md:flex md:w-1/2 lg:px-12 lg:py-16">
          <Image
            src={backgroundImage} // Dynamically set image
            alt="Authentication background image"
            layout="fill"
            objectFit="cover"
            quality={100}
            priority
          />
          {/* Overlay for text readability */}
          <div className="absolute inset-0 bg-black/25"></div> {/* Figma: 27% black overlay */}
          <div className="relative z-10">
            <Link href="/" className="flex items-center gap-3">
              <Icons.logo className="h-9 w-9 text-white" />
              <span className="text-xl font-semibold text-white">AcademiaLens</span>
            </Link>
            <p className="mt-1.5 text-sm text-authLayout-tagline">Research | Analyse | Publish</p>
          </div>
          <div className="relative z-10 mt-auto mb-10">
            {' '}
            {/* mb-10 for precise quote alignment */}
            <blockquote className="space-y-2">
              <p className="text-2xl font-semibold italic text-authLayout-quote">
                “The best way to predict the future is to invent it.”
              </p>
              <footer className="text-sm text-right text-authLayout-quoteAuthor">Alan Kay</footer>
            </blockquote>
          </div>
        </div>

        {/* Right Panel (Form Area) */}
        <div className="flex w-full flex-1 flex-col items-center justify-center overflow-y-auto bg-authLayout-bg p-6 md:p-8 lg:p-12">
          {/* This div will contain the title block AND the card from page.tsx */}
          <div className="w-full max-w-md">
            {children} {/* This is where login/signup page content (title + card) will go */}
          </div>
          {/* TermsLinks will appear below the content rendered by {children} */}
          <TermsLinks />
        </div>
      </div>
    </div>
  );
}
