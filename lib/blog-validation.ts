import type { PostImage } from "@/types/blog";

export interface BlogInput {
  title: string;
  description: string;
  externalLink: string;
  price: number | null;
  featured: boolean;
  images: PostImage[];
}

export function validateBlogInput(payload: unknown): { errors: string[]; value: BlogInput | null } {
  const errors: string[] = [];

  if (typeof payload !== "object" || payload === null) {
    return { errors: ["Invalid request body"], value: null };
  }

  const body = payload as Record<string, unknown>;

  const title = typeof body.title === "string" ? body.title.trim() : "";
  const description = typeof body.description === "string" ? body.description.trim() : "";
  const externalLink = typeof body.externalLink === "string" ? body.externalLink.trim() : "";
  const featured = Boolean(body.featured);
  const images = Array.isArray(body.images) ? (body.images as PostImage[]) : [];
  const price =
    body.price === null || body.price === undefined || body.price === ""
      ? null
      : Number(body.price);

  if (!title) errors.push("Title is required.");
  if (!description) errors.push("Description is required.");
  if (!externalLink) errors.push("Link is required.");
  else {
    try {
      new URL(externalLink);
    } catch {
      errors.push("Link must be a valid URL.");
    }
  }
  if (images.length < 2) errors.push("At least 2 images are required.");
  if (price !== null && (Number.isNaN(price) || price < 0)) {
    errors.push("Price must be a non-negative number.");
  }

  if (errors.length > 0) return { errors, value: null };

  return {
    errors: [],
    value: { title, description, externalLink, price, featured, images },
  };
}
