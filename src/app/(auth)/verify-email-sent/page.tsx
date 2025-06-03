import { AuthOverlayCard } from '@/components/auth/AuthOverlayCard';

export default function VerifyEmailSentPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-8 px-4">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-center text-figmaText-heading mb-2">
          Verification Email Sent
        </h1>
        <p className="text-lg text-center text-muted-foreground">
          Please check your inbox and follow the link.
        </p>
      </div>
      <div className="w-full max-w-md rounded-2xl bg-card text-card-foreground p-8 shadow-xl">
        <AuthOverlayCard
          title="Verify your email"
          subtitle="We’ve sent a verification link to your email address."
          description="Please check your inbox and click the link to activate your account."
          actionLabel="Back to Login"
          actionHref="/login"
        />
      </div>
    </div>
  );
}
