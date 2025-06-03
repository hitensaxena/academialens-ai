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
    <div className="min-h-screen bg-background">
      <div className="flex h-screen flex-col md:flex-row">
        {/* Left Panel (Branding) */}
        <div className="relative hidden w-full flex-col justify-center bg-background p-8 text-foreground md:flex md:w-1/2 lg:px-12 lg:py-16">
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
            <p className="mt-1.5 text-sm text-gray-300">Research | Analyse | Publish</p>
          </div>
          <div className="relative z-10 mt-auto mb-10">
            {' '}
            {/* mb-10 for precise quote alignment */}
            <blockquote className="space-y-2">
              <p className="text-2xl font-semibold italic text-white">
                “The best way to predict the future is to invent it.”
              </p>
              <footer className="text-sm text-right text-gray-300">Alan Kay</footer>
            </blockquote>
          </div>
        </div>

        {/* Right Panel (Form Area) */}
        <div className="min-h-screen flex flex-col items-center pt-16 md:pt-24 px-4 bg-background overflow-y-auto w-full flex-1 p-6 md:p-8 lg:p-12">
          {/* This div will contain the title block AND the card from page.tsx */}
          <div className="flex flex-col items-center justify-start w-full max-w-lg">
            {children} {/* This is where login/signup page content (title + card) will go */}
          </div>
          {/* TermsLinks will appear below the content rendered by {children} */}
          <div className="mt-auto pt-6">
            <TermsLinks />
          </div>
        </div>
      </div>
    </div>
  );
}
