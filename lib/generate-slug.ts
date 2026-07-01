import type { SupabaseClient } from "@supabase/supabase-js";
import { slugify } from "@/lib/utils";

export async function generateUniqueSlug(
  supabase: SupabaseClient,
  title: string,
  excludeId?: string
) {
  const base = slugify(title) || "post";
  let candidate = base;
  let suffix = 2;

  for (;;) {
    let query = supabase.from("blogs").select("id").eq("slug", candidate).limit(1);
    if (excludeId) query = query.neq("id", excludeId);
    const { data, error } = await query;
    if (error) throw error;
    if (!data || data.length === 0) return candidate;
    candidate = `${base}-${suffix}`;
    suffix += 1;
  }
}
