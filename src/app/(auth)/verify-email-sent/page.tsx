import { AuthOverlayCard } from '@/components/auth/AuthOverlayCard';

export default function VerifyEmailSentPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-authLayout-bg p-4">
      <AuthOverlayCard
        title="Verify your email"
        subtitle="We’ve sent a verification link to your email address."
        description="Please check your inbox and click the link to activate your account."
        actionLabel="Back to Login"
        actionHref="/login"
      />
    </div>
  );
}
