import { createClient } from "@/lib/supabase/server";
import { estimateReadingTime } from "@/lib/utils";
import type { BlogPost, PostImage } from "@/types/blog";

// NOTE: this module is the single swap boundary the site was built around —
// every function is async and every call site already awaits it, so this
// file is the only place that needs to know Supabase exists.

const EXCERPT_LENGTH = 160;

interface BlogRow {
  id: string;
  slug: string;
  title: string;
  description: string;
  images: PostImage[];
  external_link: string;
  price: number | null;
  currency: string;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

function buildExcerpt(description: string): string {
  const trimmed = description.trim();
  if (trimmed.length <= EXCERPT_LENGTH) return trimmed;
  const cut = trimmed.slice(0, EXCERPT_LENGTH);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : EXCERPT_LENGTH)}…`;
}

function buildParagraphs(description: string): string[] {
  return description
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

function mapRowToPost(row: BlogRow): BlogPost {
  const body = buildParagraphs(row.description);
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: buildExcerpt(row.description),
    body,
    images: row.images,
    price: row.price,
    currency: row.currency,
    externalLink: row.external_link,
    publishedAt: row.created_at,
    updatedAt: row.updated_at,
    featured: row.featured,
    readingTimeMinutes: estimateReadingTime(body),
  };
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data as BlogRow[]).map(mapRowToPost);
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("blogs").select("*").eq("slug", slug).maybeSingle();

  if (error) throw error;
  return data ? mapRowToPost(data as BlogRow) : null;
}

export async function getPostById(id: string): Promise<BlogPost | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("blogs").select("*").eq("id", id).maybeSingle();

  if (error) throw error;
  return data ? mapRowToPost(data as BlogRow) : null;
}

export async function getFeaturedPosts(limit = 4): Promise<BlogPost[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("featured", true)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return (data as BlogRow[]).map(mapRowToPost);
}

export async function getRelatedPosts(post: BlogPost, limit = 3): Promise<BlogPost[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .neq("id", post.id)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return (data as BlogRow[]).map(mapRowToPost);
}

export async function getAllSlugs(): Promise<string[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("blogs").select("slug");

  if (error) throw error;
  return (data as { slug: string }[]).map((row) => row.slug);
}

export async function searchPosts(query: string): Promise<BlogPost[]> {
  const needle = query.trim();
  if (!needle) return [];

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .or(`title.ilike.%${needle}%,description.ilike.%${needle}%`)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data as BlogRow[]).map(mapRowToPost);
}
