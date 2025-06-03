import { AuthOverlayCard } from '@/components/auth/AuthOverlayCard';

export default function ResetPasswordEmailSentPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-8 px-4">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-center text-figmaText-heading mb-2">
          Check Your Email
        </h1>
        <p className="text-lg text-center text-muted-foreground">
          We&apos;ve sent a reset link to your email address.
        </p>
      </div>
      <div className="w-full max-w-md rounded-2xl bg-card text-card-foreground p-8 shadow-xl">
        <AuthOverlayCard
          title=""
          subtitle=""
          description="If you don't see the email, check your spam or junk folder."
          actionLabel="Back to Login"
          actionHref="/login"
        />
      </div>
    </div>
  );
}
