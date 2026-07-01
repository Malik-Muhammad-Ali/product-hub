import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import type { BlogPost } from "@/types/blog";

export function PostPriceCta({ post }: { post: BlogPost }) {
  return (
    <aside className="h-fit w-full rounded-sm border border-charcoal-900/10 bg-cream-100 p-6 lg:sticky lg:top-28">
      <p className="text-xs tracking-wide text-charcoal-500 uppercase">Price</p>
      <p className="mt-3 font-display text-3xl text-charcoal-900">
        {formatPrice(post.price, post.currency)}
      </p>
      <Button
        render={
          <a
            href={post.externalLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${post.title} (opens in new tab)`}
          />
        }
        nativeButton={false}
        size="lg"
        className="mt-6 w-full justify-center bg-emerald-900 text-cream-50 hover:bg-emerald-900/90"
      >
        View product
        <ArrowUpRight className="size-4" />
      </Button>
    </aside>
  );
}
