import type { Metadata } from "next";
import { LoginForm } from "@/components/admin/login-form";
import { Logo } from "@/components/site/logo";

export const metadata: Metadata = {
  title: "Admin sign in",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-cream-50 px-6">
      <div className="w-full max-w-sm rounded-sm border border-charcoal-900/10 bg-cream-100 p-8">
        <Logo />
        <h1 className="mt-6 font-display text-2xl text-charcoal-900">Admin sign in</h1>
        <p className="mt-1 text-sm text-charcoal-500">Manage the blog from here.</p>
        <div className="mt-6">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
