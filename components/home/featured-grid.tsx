import { Reveal } from "@/components/motion/reveal";
import { PostGrid } from "@/components/blog/post-grid";
import { getFeaturedPosts } from "@/lib/posts";

export async function FeaturedGrid() {
  const posts = await getFeaturedPosts(4);

  return (
    <section className="mx-auto max-w-(--container-luxe) px-6 py-16 md:px-10 md:py-24 lg:px-16">
      <Reveal>
        <h2 className="font-display text-3xl text-charcoal-900 md:text-4xl">Editor&apos;s Picks</h2>
        <p className="mt-3 max-w-lg text-charcoal-500">
          Four pieces our editors keep coming back to this season.
        </p>
      </Reveal>
      <div className="mt-12">
        <PostGrid posts={posts} />
      </div>
    </section>
  );
}
