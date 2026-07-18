import { createFileRoute, Navigate } from "@tanstack/react-router";
import { SignUp, useAuth } from "@clerk/clerk-react";
import { ShieldCheck, CheckCircle2, Lock, Cpu } from "lucide-react";

export const Route = createFileRoute("/register")({
  component: RegisterPage,
});

function RegisterPage() {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-screen w-screen bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (isSignedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background">
      {/* Left Side: Branding / Intro */}
      <div className="hidden md:flex md:w-[45%] lg:w-[50%] bg-sidebar text-sidebar-foreground relative overflow-hidden flex-col justify-between p-12 border-r border-sidebar-border shrink-0">
        {/* Background decorative glow */}
        <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] rounded-full bg-primary/20 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-20%] right-[-20%] w-[80%] h-[80%] rounded-full bg-purple-500/10 blur-[120px] pointer-events-none" />

        {/* Logo & Brand */}
        <div className="flex items-center gap-3 relative z-10">
          <div className="h-10 w-10 rounded-xl bg-sidebar-primary flex items-center justify-center shadow-[var(--shadow-elevated)]">
            <ShieldCheck className="h-5 w-5 text-sidebar-primary-foreground" />
          </div>
          <div>
            <span className="font-bold text-lg tracking-tight text-white">ReClaim 2.0</span>
            <span className="block text-[10px] text-primary font-semibold tracking-wider uppercase">Blockchain Edition</span>
          </div>
        </div>

        {/* Main Taglines */}
        <div className="my-auto space-y-8 relative z-10 max-w-lg">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sidebar-primary/10 border border-sidebar-primary/20 text-xs font-semibold text-sidebar-primary-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
              Join the Smart Campus
            </div>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight">
              Register to Secure <br />
              <span className="bg-gradient-to-r from-primary-foreground via-purple-300 to-indigo-200 bg-clip-text text-transparent">Your Belongings.</span>
            </h1>
            <p className="text-base text-sidebar-foreground/80 font-normal leading-relaxed">
              Create a cryptographic identity tied to your campus credentials to protect your devices and books.
            </p>
          </div>

          {/* Feature Highlights */}
          <div className="space-y-4 pt-4">
            <div className="flex gap-3.5">
              <div className="h-10 w-10 shrink-0 rounded-lg bg-sidebar-accent/50 border border-sidebar-border flex items-center justify-center">
                <Lock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-white text-sm">Cryptographic Handshake</h4>
                <p className="text-xs text-sidebar-foreground/60 mt-0.5">Claims and ownership verifications are logged as transactions securely.</p>
              </div>
            </div>

            <div className="flex gap-3.5">
              <div className="h-10 w-10 shrink-0 rounded-lg bg-sidebar-accent/50 border border-sidebar-border flex items-center justify-center">
                <CheckCircle2 className="h-5 w-5 text-success" />
              </div>
              <div>
                <h4 className="font-semibold text-white text-sm">Zero False Claims</h4>
                <p className="text-xs text-sidebar-foreground/60 mt-0.5">Custom verification steps guarantee that only the true owner can claim.</p>
              </div>
            </div>

            <div className="flex gap-3.5">
              <div className="h-10 w-10 shrink-0 rounded-lg bg-sidebar-accent/50 border border-sidebar-border flex items-center justify-center">
                <Cpu className="h-5 w-5 text-purple-300" />
              </div>
              <div>
                <h4 className="font-semibold text-white text-sm">Smart Notification Matches</h4>
                <p className="text-xs text-sidebar-foreground/60 mt-0.5">Real-time matching filters through campus lost item data continuously.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="text-xs text-sidebar-foreground/40 relative z-10">
          &copy; {new Date().getFullYear()} ReClaim 2.0. All blockchain transactions are secure.
        </div>
      </div>

      {/* Right Side: Signup Widget */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 md:p-12 bg-slate-50 dark:bg-zinc-950 overflow-y-auto">
        {/* Small top logo for mobile */}
        <div className="flex md:hidden items-center gap-2 mb-8 mt-4">
          <div className="h-9 w-9 rounded-xl bg-primary flex items-center justify-center">
            <ShieldCheck className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-bold text-lg">ReClaim 2.0</span>
        </div>

        <div className="w-full max-w-md my-4">
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Create Your Account
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
              Get started with ReClaim to protect and browse campus items
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-900 shadow-xl border border-slate-100 dark:border-zinc-800 rounded-3xl p-6 overflow-hidden">
            <SignUp
              routing="path"
              path="/register"
              signInUrl="/"
              forceRedirectUrl="/dashboard"
              appearance={{
                variables: {
                  colorPrimary: 'oklch(0.55 0.22 280)',
                  colorText: 'oklch(0.18 0.04 265)',
                  colorTextSecondary: 'oklch(0.5 0.02 265)',
                  borderRadius: '0.75rem',
                  fontFamily: 'Inter, sans-serif'
                },
                elements: {
                  card: 'shadow-none bg-transparent p-0 w-full',
                  header: 'hidden', // hides Clerk's default headers to use our clean ones!
                  footer: 'mt-2',
                  formButtonPrimary: 'w-full py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl transition font-medium',
                  socialButtonsBlockButton: 'border border-slate-200 hover:bg-slate-50 dark:border-zinc-700 dark:hover:bg-zinc-800 text-slate-700 dark:text-slate-300 rounded-xl',
                  formFieldInput: 'rounded-xl border border-slate-200 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white px-3 py-2 focus:ring-2 focus:ring-primary/20 focus:border-primary',
                  footerActionLink: 'text-primary hover:text-primary/80 font-medium'
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}