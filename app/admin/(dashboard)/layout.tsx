import type { Metadata } from "next";
import Link from "next/link";
import { LogoutButton } from "@/components/admin/logout-button";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-cream-50">
      <header className="border-b border-charcoal-900/10 bg-cream-100">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/admin" className="font-display text-lg text-charcoal-900">
            Product Hub Admin
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="/admin" className="text-sm text-charcoal-700 hover:text-emerald-700">
              Dashboard
            </Link>
            <Link
              href="/admin/new"
              className="text-sm text-charcoal-700 hover:text-emerald-700"
            >
              New Post
            </Link>
            <LogoutButton />
          </nav>
        </div>
      </header>
      <main id="main-content" className="mx-auto max-w-5xl px-6 py-10">
        {children}
      </main>
    </div>
  );
}
