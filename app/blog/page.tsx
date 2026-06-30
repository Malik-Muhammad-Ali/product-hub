import type { Metadata } from "next";
import { Reveal } from "@/components/motion/reveal";
import { CategoryFilterTabs } from "@/components/blog/category-filter-tabs";
import { PostGrid } from "@/components/blog/post-grid";
import { getAllPosts, getPostsByCategory } from "@/lib/posts";
import { getCategoryMeta, isCategory } from "@/lib/categories";
import { buildMetadata } from "@/lib/seo";

type SearchParams = Promise<{ category?: string }>;

export async function generateMetadata({
  searchParams,
}: {
  searchParams: SearchParams;
}): Promise<Metadata> {
  const { category } = await searchParams;
  if (category && isCategory(category)) {
    const meta = getCategoryMeta(category);
    return buildMetadata({
      title: `${meta.label} Stories`,
      description: meta.description,
      path: `/blog?category=${category}`,
    });
  }
  return buildMetadata({
    title: "The Journal",
    description: "Every story from the BroCommerce journal, filterable by category.",
    path: "/blog",
  });
}

export default async function BlogPage({ searchParams }: { searchParams: SearchParams }) {
  const { category } = await searchParams;
  const activeCategory = category && isCategory(category) ? category : undefined;

  const posts = activeCategory ? await getPostsByCategory(activeCategory) : await getAllPosts();
  const meta = activeCategory ? getCategoryMeta(activeCategory) : null;

  return (
    <div className="mx-auto max-w-(--container-luxe) px-6 py-16 md:px-10 md:py-24 lg:px-16">
      <Reveal>
        <h1 className="font-display text-4xl text-charcoal-900 md:text-5xl">
          {meta ? meta.label : "The Journal"}
        </h1>
        <p className="mt-3 max-w-lg text-charcoal-500">
          {meta ? meta.description : "Every story, filterable by category."}
        </p>
      </Reveal>

      <div className="mt-10">
        <CategoryFilterTabs activeCategory={activeCategory} />
      </div>

      <div className="mt-12">
        {posts.length > 0 ? (
          <PostGrid posts={posts} />
        ) : (
          <p className="py-16 text-center text-charcoal-500">No stories in this category yet.</p>
        )}
      </div>
    </div>
  );
}
