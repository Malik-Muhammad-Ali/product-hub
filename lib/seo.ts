import type { Metadata } from "next";
import type { BlogPost } from "@/types/blog";
import { SITE_NAME, SITE_URL } from "@/lib/constants";

export function buildMetadata({
  title,
  description,
  path,
  image,
  type = "website",
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
}): Metadata {
  const url = `${SITE_URL}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type,
      images: image ? [{ url: image }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}

export function buildArticleJsonLd(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.images.map((image) => image.url),
    author: { "@type": "Person", name: post.author.name },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${post.slug}`,
    },
  };
}

export function buildProductJsonLd(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: post.title,
    description: post.excerpt,
    image: post.images.map((image) => image.url),
    offers: {
      "@type": "Offer",
      price: post.price,
      priceCurrency: post.currency,
      url: post.externalLink,
      availability: "https://schema.org/InStock",
    },
  };
}
