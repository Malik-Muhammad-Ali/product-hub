import postsData from "@/data/posts.json";
import type { BlogPost, Category, CategoryMeta } from "@/types/blog";
import { getAllCategoryMeta } from "@/lib/categories";

// NOTE: this module is the single swap boundary for a future Supabase-backed
// admin panel. Every function is async on purpose, even though the current
// implementation just reads the local JSON array synchronously — so call
// sites already `await` correctly and won't need to change when the
// implementation below is replaced with real database queries.

const allPosts = postsData as BlogPost[];

export async function getAllPosts(): Promise<BlogPost[]> {
  return [...allPosts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  return allPosts.find((post) => post.slug === slug) ?? null;
}

export async function getFeaturedPosts(limit = 4): Promise<BlogPost[]> {
  const posts = await getAllPosts();
  return posts.filter((post) => post.featured).slice(0, limit);
}

export async function getPostsByCategory(category: Category): Promise<BlogPost[]> {
  const posts = await getAllPosts();
  return posts.filter((post) => post.category === category);
}

export async function getRelatedPosts(post: BlogPost, limit = 3): Promise<BlogPost[]> {
  const posts = await getAllPosts();
  return posts.filter((p) => p.id !== post.id && p.category === post.category).slice(0, limit);
}

export async function getAllCategories(): Promise<CategoryMeta[]> {
  return getAllCategoryMeta();
}

export async function getAllSlugs(): Promise<string[]> {
  return allPosts.map((post) => post.slug);
}

export async function searchPosts(query: string): Promise<BlogPost[]> {
  const needle = query.trim().toLowerCase();
  if (!needle) return [];
  const posts = await getAllPosts();
  return posts.filter(
    (post) =>
      post.title.toLowerCase().includes(needle) || post.excerpt.toLowerCase().includes(needle)
  );
}
