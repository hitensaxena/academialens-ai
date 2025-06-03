'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button/button';
import { Icons } from '@/components/icons';
import { ThemeToggle } from '@/components/ThemeToggle';

const navLinks = [
  { href: '#benefits', label: 'Benefits' },
  { href: '#how-it-works', label: 'How It Works' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#use-cases', label: 'Use Cases' },
];

export default function HomePage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    // Cleanup function to remove the class if the component unmounts while menu is open
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isMobileMenuOpen]);
  // const { theme } = useTheme(); // Potentially needed if we want to change logo based on theme
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, isLoading, router]);

  // If still loading or authenticated, show minimal loader or nothing to avoid flash of landing page
  if (isLoading || (!isLoading && isAuthenticated)) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        {/* Optional: simple loader if needed, or just a blank screen during quick redirect */}
        {/* <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div> */}
      </div>
    );
  }

  // Main landing page content for unauthenticated users
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#121212] text-gray-900 dark:text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-700 bg-white/95 dark:bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60">
        <div className="container flex h-14 max-w-screen-2xl items-center mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            {/* <Icons.logo className="h-6 w-6" /> Replace with your actual logo component or Image */}
            <Image src="/images/logo.svg" alt="AcademiaLens Logo" width={32} height={32} />
            <span className="font-medium sm:inline-block text-xl text-gray-900 dark:text-white">
              AcademiaLens
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-4 text-sm lg:gap-6 flex-grow ml-6">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="transition-colors text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-x-2 sm:gap-x-4 ml-auto">
            <Button
              variant="outline"
              asChild
              className="text-gray-700 border-gray-300 hover:bg-gray-50 dark:text-white dark:border-gray-500 dark:hover:bg-gray-700"
            >
              <Link href="/login">Log In</Link>
            </Button>
            <Button
              asChild
              className="text-white font-semibold hover:opacity-90"
              style={{
                backgroundImage: 'linear-gradient(to right, #76C84D, #3E8E41)',
              }}
            >
              <Link href="/signup">Get Started</Link>
            </Button>
            <ThemeToggle />
            {/* Mobile Menu Button */}
            <div className="md:hidden ml-auto">
              <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
                <Icons.menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-grow">
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 text-center flex flex-col items-center">
          <div className="max-w-6xl">
            <h1 className="text-4xl sm:text-5xl lg:text-8xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              Unlock <span className="text-[#76C84D]">Future Insights</span> from Your Academic
              Research
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-gray-700 dark:text-gray-300">
              AcademiaLens uses advanced AI to simplify complex papers, identify key methodologies,
              and compare research effortlessly. Focus on discovery, not deciphering.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                asChild
                className="w-full sm:w-auto text-white font-semibold hover:opacity-90 px-8 py-3 text-base sm:text-lg"
                style={{
                  backgroundImage: 'linear-gradient(to right, #76C84D, #3E8E41)',
                }}
              >
                <Link href="/signup">Get Started</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="w-full sm:w-auto px-8 py-3 text-base text-gray-700 border-gray-300 hover:bg-gray-50 dark:text-white dark:border-gray-500 dark:hover:bg-gray-700"
              >
                <Link href="/login">Log In</Link>
              </Button>
            </div>
          </div>
          <div className="mt-12 w-full max-w-5xl xl:max-w-6xl">
            <Image
              src="/images/hero-shot.png"
              alt="AcademiaLens Hero Image"
              width={1200}
              height={780}
              priority
              className="rounded-lg shadow-2xl mx-auto"
            />
          </div>
        </section>

        {/* Key Challenges Section (ID should be 'benefits' as per original nav) */}
        <section id="benefits" className="py-16 sm:py-24 bg-gray-50 dark:bg-[#121212]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                Key Challenges In <span className="text-[#4CAF50]">Academic Research</span>
              </h2>
              <p className="mt-4 text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                AcademiaLens addresses common pain points faced by researchers, providing solutions
                to streamline your workflow and enhance your understanding of complex topics.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: <Icons.search className="h-8 w-8 text-[#2E7D32] dark:text-[#4CAF50]" />,
                  title: 'Information Overload',
                  description:
                    'Navigating the vast landscape of academic literature can be overwhelming. AcademiaLens helps you filter and prioritize relevant research efficiently.',
                  bgColor: 'bg-green-100 dark:bg-green-900/30',
                },
                {
                  icon: <Icons.bookText className="h-8 w-8 text-green-600 dark:text-[#76C84D]" />,
                  title: 'Jargon and Terminology',
                  description:
                    'Academic papers are often dense with specialized language, making them hard to penetrate.',
                  bgColor: 'bg-green-100 dark:bg-[#3E8E41]/30',
                },
                {
                  icon: (
                    <Icons.clipboardEdit className="h-8 w-8 text-[#2E7D32] dark:text-[#4CAF50]" />
                  ),
                  title: 'Manual Analysis',
                  description:
                    'Manually analyzing and synthesizing research papers is time-consuming. AcademiaLens automates this process, saving you valuable time.',
                  bgColor: 'bg-green-100 dark:bg-green-900/30',
                },
                {
                  icon: <Icons.lightbulb className="h-8 w-8 text-green-600 dark:text-[#76C84D]" />,
                  title: 'Practical Application',
                  description:
                    'Connecting research to real-world applications and innovation can be challenging.',
                  bgColor: 'bg-green-100 dark:bg-[#3E8E41]/30',
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-white dark:bg-[#1E1E1E] p-8 rounded-xl shadow-lg flex flex-col items-center text-center"
                >
                  <div className={`p-3 rounded-full ${item.bgColor} mb-4`}>{item.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Game Changer Section */}
        <section id="game-changer" className="py-16 sm:py-24 bg-white dark:bg-[#121212]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                AcademiaLens is a <span className="text-[#4CAF50]">Game Changer</span>
              </h2>
              <p className="mt-4 text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                AcademiaLens addresses common pain points faced by researchers, providing solutions
                to streamline your workflow and enhance your understanding of complex topics.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <Icons.brain className="h-8 w-8 text-green-700 dark:text-green-500" />,
                  title: 'Instant Comprehension',
                  description:
                    'Quickly grasp complex concepts with AI-driven summaries, key term explanations (ELI-PhD) and jargon busting.',
                  bgColor: 'bg-green-100 dark:bg-green-700/30',
                },
                {
                  icon: (
                    <Icons.gitCompareArrows className="h-8 w-8 text-green-700 dark:text-green-500" />
                  ),
                  title: 'Effortless Comparison',
                  description:
                    'Compare multiple research papers side-by-side, highlighting differences and commonalities.',
                  bgColor: 'bg-green-100 dark:bg-green-700/30',
                },
                {
                  icon: (
                    <Icons.messageCircleQuestion className="h-8 w-8 text-green-700 dark:text-green-500" />
                  ),
                  title: 'Interactive Q&A',
                  description:
                    'Ask natural language questions about your documents and get precise, referenced answers.',
                  bgColor: 'bg-green-100 dark:bg-green-700/30',
                },
                {
                  icon: (
                    <Icons.draftingCompass className="h-8 w-8 text-green-700 dark:text-green-500" />
                  ),
                  title: 'Methodology Blueprint',
                  description:
                    'Generate structured research methodologies and tools tailored to your project.',
                  bgColor: 'bg-green-100 dark:bg-green-700/30',
                },
                {
                  icon: <Icons.clock className="h-8 w-8 text-green-700 dark:text-green-500" />,
                  title: 'Save Valuable Time',
                  description:
                    'Automate tedious, low-value tasks, freeing you to focus on your core research and writing.',
                  bgColor: 'bg-green-100 dark:bg-green-700/30',
                },
                {
                  icon: <Icons.target className="h-8 w-8 text-green-700 dark:text-green-500" />,
                  title: 'Enhance Research Quality',
                  description:
                    'Gain deeper insights and ensure thoroughness with AI-driven analytical capabilities.',
                  bgColor: 'bg-green-100 dark:bg-green-700/30',
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-gray-50 dark:bg-[#2D2D2D] p-6 rounded-lg shadow-lg flex flex-col items-start text-left"
                >
                  <div className={`p-3 rounded-full ${item.bgColor} mb-4`}>{item.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-700 py-8 bg-white dark:bg-[#1E1E1E]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center mb-4 sm:mb-0">
            <Image src="/images/logo.png" alt="AcademiaLens Logo" width={28} height={28} />
            {/* Optional: Add text logo next to image if needed */}
            {/* <span className="ml-2 text-lg font-medium text-gray-900 dark:text-white">AcademiaLens</span> */}
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} AcademiaLens. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-white dark:bg-gray-900 md:hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col h-full">
            <div className="flex justify-between items-center mb-8">
              <Link href="/" className="flex items-center space-x-2" onClick={toggleMobileMenu}>
                <Image src="/images/logo.png" alt="AcademiaLens Logo" width={32} height={32} />
                <span className="font-medium text-xl text-gray-900 dark:text-white">
                  AcademiaLens
                </span>
              </Link>
              <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
                <Icons.x className="h-6 w-6" />
              </Button>
            </div>
            <nav className="flex flex-col gap-4 mb-8">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-lg text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors py-2"
                  onClick={toggleMobileMenu} // Close menu on link click
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="mt-auto flex flex-col gap-4">
              <Button
                variant="outline"
                asChild
                className="w-full text-gray-700 border-gray-300 hover:bg-gray-50 dark:text-white dark:border-gray-500 dark:hover:bg-gray-700"
              >
                <Link href="/login">Log In</Link>
              </Button>
              <Button
                asChild
                className="text-white font-semibold hover:opacity-90"
                style={{
                  backgroundImage: 'linear-gradient(to right, #76C84D, #3E8E41)',
                }}
              >
                <Link href="/signup">Get Started</Link>
              </Button>
              <div className="mt-4 self-center">
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
