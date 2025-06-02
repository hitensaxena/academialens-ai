import { ReactNode } from 'react';
import { TermsLinks } from '@/components/auth/terms-links';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <div className="container relative h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        {/* Left side with branding */}
        <div className="relative hidden h-full flex-col bg-gradient-to-br from-primary to-primary/90 p-10 text-white lg:flex">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }}
          />

          <div className="relative z-20 flex items-center gap-2 text-xl font-bold">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-8 w-8 text-white"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              AcademiaLens
            </span>
          </div>

          <div className="relative z-20 mt-auto space-y-6">
            <blockquote className="space-y-4">
              <p className="text-lg leading-relaxed text-white/90">
                &ldquo;The best way to predict the future is to invent it.&rdquo;
              </p>
              <footer className="text-sm font-medium text-white/70">— Alan Kay</footer>
            </blockquote>
            <div className="flex items-center gap-2 text-sm text-white/70">
              <div className="h-px w-8 bg-white/30" />
              <span>Research. Analyze. Publish.</span>
            </div>
          </div>
        </div>

        {/* Right side with form */}
        <div className="flex items-center justify-center p-6 lg:p-8">
          <div className="mx-auto w-full max-w-md space-y-6">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold tracking-tight text-foreground">Welcome back</h1>
              <p className="text-muted-foreground">Enter your credentials to access your account</p>
            </div>

            <div className="rounded-lg border bg-card p-6 shadow-sm">{children}</div>

            <TermsLinks />
          </div>
        </div>
      </div>
    </div>
  );
}
