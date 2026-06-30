import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HoverScaleImage } from "@/components/motion/hover-scale-image";
import { formatPrice } from "@/lib/utils";
import type { BlogPost } from "@/types/blog";

export function PostCard({ post, priority = false }: { post: BlogPost; priority?: boolean }) {
  const cover = post.images[0];

  return (
    <article className="group">
      <Link href={`/blog/${post.slug}`} className="block">
        <HoverScaleImage
          src={cover.url}
          alt={cover.alt}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={priority}
          className="aspect-[4/3] rounded-sm shadow-sm transition-shadow duration-300 group-hover:shadow-md"
        />

        <div className="mt-5">
          <h3 className="font-display text-xl leading-snug text-charcoal-900 transition-colors group-hover:text-emerald-700">
            {post.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-charcoal-500">
            {post.excerpt}
          </p>

          <div className="mt-4 flex items-center justify-between border-t border-charcoal-900/10 pt-3">
            <span className="inline-flex items-center gap-1.5 text-sm text-emerald-700">
              Read the story
              <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
            <span className="text-xs text-charcoal-500">
              {formatPrice(post.price, post.currency)}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
