import { AuthOverlayCard } from '@/components/auth/AuthOverlayCard';

export default function ResetPasswordSuccessPage() {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-center text-figmaText-heading mb-2">
          Password Reset Successful
        </h1>
        <p className="text-base text-center text-muted-foreground">
          You can now log in with your new password.
        </p>
      </div>
      <div className="w-full rounded-2xl bg-card text-card-foreground p-10 shadow-xl">
        <div className="w-full space-y-6">
          <AuthOverlayCard
            title="Password reset successful"
            subtitle="Your password has been updated."
            description="You can now log in with your new password."
            actionLabel="Go to Login"
            actionHref="/login"
          />
        </div>
      </div>
    </div>
  );
}
