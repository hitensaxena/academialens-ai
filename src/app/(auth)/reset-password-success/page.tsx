import { AuthOverlayCard } from '@/components/auth/AuthOverlayCard';

export default function ResetPasswordSuccessPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-authLayout-bg p-4">
      <AuthOverlayCard
        title="Password reset successful"
        subtitle="Your password has been updated."
        description="You can now log in with your new password."
        actionLabel="Go to Login"
        actionHref="/login"
      />
    </div>
  );
}
