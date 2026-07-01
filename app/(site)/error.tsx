"use client";

import { Button } from "@/components/ui/button";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto flex max-w-(--container-luxe) flex-col items-center px-6 py-32 text-center md:px-10 lg:px-16">
      <p className="font-display text-sm tracking-widest text-emerald-700 uppercase">Error</p>
      <h1 className="mt-4 font-display text-4xl text-charcoal-900 md:text-5xl">
        Something went wrong.
      </h1>
      <p className="mt-4 max-w-md text-charcoal-500">
        We hit an unexpected snag loading this page. Please try again.
      </p>
      <Button
        onClick={reset}
        className="mt-8 bg-emerald-900 text-cream-50 hover:bg-emerald-900/90"
      >
        Try again
      </Button>
    </div>
  );
}
