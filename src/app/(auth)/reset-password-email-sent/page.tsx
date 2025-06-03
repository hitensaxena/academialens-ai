import { AuthOverlayCard } from '@/components/auth/AuthOverlayCard';

export default function ResetPasswordEmailSentPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-authLayout-bg p-4">
      <AuthOverlayCard
        title="Check your email"
        subtitle="We’ve sent password reset instructions to your inbox."
        description="If you don’t see the email, check your spam or junk folder."
        actionLabel="Back to Login"
        actionHref="/login"
      />
    </div>
  );
}
