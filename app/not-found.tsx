import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-(--container-luxe) flex-col items-center px-6 py-32 text-center md:px-10 lg:px-16">
      <p className="font-display text-sm tracking-widest text-emerald-700 uppercase">404</p>
      <h1 className="mt-4 font-display text-4xl text-charcoal-900 md:text-5xl">
        This page wandered off.
      </h1>
      <p className="mt-4 max-w-md text-charcoal-500">
        The page you&apos;re looking for doesn&apos;t exist or has moved. Let&apos;s get you back
        to the journal.
      </p>
      <Button
        render={<Link href="/blog" />}
        nativeButton={false}
        className="mt-8 bg-emerald-900 text-cream-50 hover:bg-emerald-900/90"
      >
        Browse the journal
      </Button>
    </div>
  );
}
