import { revalidatePath } from "next/cache";

export function revalidateBlogPaths({
  slug,
  previousSlug,
}: {
  slug?: string;
  previousSlug?: string;
} = {}) {
  revalidatePath("/");
  revalidatePath("/blog");
  if (slug) revalidatePath(`/blog/${slug}`);
  if (previousSlug && previousSlug !== slug) revalidatePath(`/blog/${previousSlug}`);
}
