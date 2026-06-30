import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostHeader } from "@/components/blog/post-header";
import { PostCarousel } from "@/components/blog/post-carousel";
import { PostBody } from "@/components/blog/post-body";
import { PostPriceCta } from "@/components/blog/post-price-cta";
import { RelatedPosts } from "@/components/blog/related-posts";
import { getAllSlugs, getPostBySlug, getRelatedPosts } from "@/lib/posts";
import { buildArticleJsonLd, buildMetadata, buildProductJsonLd } from "@/lib/seo";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    image: post.images[0]?.url,
    type: "article",
  });
}

export default async function PostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const relatedPosts = await getRelatedPosts(post, 3);
  const articleJsonLd = buildArticleJsonLd(post);
  const productJsonLd = buildProductJsonLd(post);

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />

      <div className="mx-auto max-w-(--container-luxe) px-6 pt-16 md:px-10 md:pt-24 lg:px-16">
        <PostHeader post={post} />
      </div>

      <div className="mx-auto mt-10 max-w-(--container-luxe) px-6 md:px-10 lg:px-16">
        <PostCarousel images={post.images} title={post.title} />
      </div>

      <div className="mx-auto max-w-(--container-luxe) px-6 py-16 md:px-10 md:py-24 lg:px-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_320px]">
          <PostBody paragraphs={post.body} />
          <PostPriceCta post={post} />
        </div>
      </div>

      <RelatedPosts posts={relatedPosts} />
    </article>
  );
}
