import { Reveal } from "@/components/motion/reveal";
import { PostGrid } from "@/components/blog/post-grid";
import type { BlogPost } from "@/types/blog";

export function RelatedPosts({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="mx-auto max-w-(--container-luxe) px-6 py-16 md:px-10 md:py-24 lg:px-16">
      <Reveal>
        <h2 className="font-display text-3xl text-charcoal-900 md:text-4xl">
          More from this category
        </h2>
      </Reveal>
      <div className="mt-12">
        <PostGrid posts={posts} />
      </div>
    </section>
  );
}
