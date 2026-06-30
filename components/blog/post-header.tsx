import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion/reveal";
import { getCategoryMeta } from "@/lib/categories";
import { formatDate } from "@/lib/utils";
import type { BlogPost } from "@/types/blog";

export function PostHeader({ post }: { post: BlogPost }) {
  const category = getCategoryMeta(post.category);

  return (
    <Reveal>
      <Badge variant="secondary" className="rounded-full bg-emerald-100 text-emerald-900 font-normal">
        {category.label}
      </Badge>
      <h1 className="mt-4 max-w-3xl font-display text-4xl leading-[1.1] text-charcoal-900 md:text-5xl">
        {post.title}
      </h1>
      <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-charcoal-500">
        <span>{post.author.name}</span>
        <span aria-hidden>·</span>
        <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
        {post.readingTimeMinutes && (
          <>
            <span aria-hidden>·</span>
            <span>{post.readingTimeMinutes} min read</span>
          </>
        )}
      </div>
    </Reveal>
  );
}
