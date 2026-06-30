import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { HoverScaleImage } from "@/components/motion/hover-scale-image";
import { getCategoryMeta } from "@/lib/categories";
import { formatPrice } from "@/lib/utils";
import type { BlogPost } from "@/types/blog";

export function PostCard({ post, priority = false }: { post: BlogPost; priority?: boolean }) {
  const category = getCategoryMeta(post.category);
  const cover = post.images[0];

  return (
    <article className="group">
      <Link href={`/blog/${post.slug}`} className="block">
        <HoverScaleImage
          src={cover.url}
          alt={cover.alt}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={priority}
          className="aspect-[4/5] rounded-sm"
        />
        <div className="mt-4 flex items-start justify-between gap-3">
          <div>
            <Badge
              variant="secondary"
              className="rounded-full bg-emerald-100 text-emerald-900 font-normal"
            >
              {category.label}
            </Badge>
            <h3 className="mt-3 font-display text-xl leading-snug text-charcoal-900 transition-colors group-hover:text-emerald-700">
              {post.title}
            </h3>
            <p className="mt-2 line-clamp-2 text-sm text-charcoal-500">{post.excerpt}</p>
          </div>
        </div>
        <p className="mt-3 font-display text-sm text-gold-400">
          {formatPrice(post.price, post.currency)}
        </p>
      </Link>
    </article>
  );
}
