import { ArrowUpRight } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import type { BlogPost } from "@/types/blog";

export function PostPriceCta({ post }: { post: BlogPost }) {
  return (
    <aside className="lg:sticky lg:top-28">
      <p className="text-xs tracking-wide text-charcoal-500 uppercase">Referenced in this story</p>
      <p className="mt-3 font-display text-2xl text-charcoal-900">
        {formatPrice(post.price, post.currency)}
      </p>
      <a
        href={post.externalLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`View ${post.title} (opens in new tab)`}
        className="mt-3 inline-flex items-center gap-1.5 text-sm text-emerald-700 underline decoration-emerald-700/30 underline-offset-4 transition-colors hover:text-emerald-900 hover:decoration-emerald-900"
      >
        View product
        <ArrowUpRight className="size-3.5" />
      </a>
    </aside>
  );
}
