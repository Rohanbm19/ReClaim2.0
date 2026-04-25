import { createFileRoute } from "@tanstack/react-router";
import LoginForm from "@/components/features/auth/LoginForm";

export const Route = createFileRoute("/herobanner")({
  component: LoginPage,
});

function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-100 flex">
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-indigo-950 to-violet-700 text-white items-center justify-center p-12">
        <div>
          <h1 className="text-5xl font-bold mb-6">
            Campus Lost & Found
          </h1>

          <p className="text-xl text-violet-100">
            Student & Admin Access Portal
          </p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center px-6">
        <LoginForm />
      </div>
    </div>
  );
}