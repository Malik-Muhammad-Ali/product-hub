import type { Metadata } from "next";
import { Reveal } from "@/components/motion/reveal";
import { PostGrid } from "@/components/blog/post-grid";
import { getAllPosts } from "@/lib/posts";
import { buildMetadata } from "@/lib/seo";
import { SITE_NAME } from "@/lib/constants";

export const revalidate = 60;

export const metadata: Metadata = buildMetadata({
  title: "Blogs",
  description: `Every story from the ${SITE_NAME} blog.`,
  path: "/blog",
});

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div className="mx-auto max-w-(--container-luxe) px-6 py-16 md:px-10 md:py-24 lg:px-16">
      <Reveal>
        <h1 className="font-display text-4xl text-charcoal-900 md:text-5xl">Blogs</h1>
        <p className="mt-3 max-w-lg text-charcoal-500">Every story from the {SITE_NAME} blog.</p>
      </Reveal>

      <div className="mt-12">
        <PostGrid posts={posts} />
      </div>
    </div>
  );
}
