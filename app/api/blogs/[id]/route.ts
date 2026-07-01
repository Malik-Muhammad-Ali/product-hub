import { NextResponse, type NextRequest } from "next/server";
import { getPostById } from "@/lib/posts";
import { requireAdmin } from "@/lib/api-auth";
import { validateBlogInput } from "@/lib/blog-validation";
import { generateUniqueSlug } from "@/lib/generate-slug";
import { revalidateBlogPaths } from "@/lib/revalidate";
import { slugify } from "@/lib/utils";

const STORAGE_PREFIX = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/blog-images/`;

type Params = Promise<{ id: string }>;

export async function GET(_request: NextRequest, { params }: { params: Params }) {
  const { id } = await params;
  const post = await getPostById(id);
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ post });
}

export async function PATCH(request: NextRequest, { params }: { params: Params }) {
  const { id } = await params;
  const auth = await requireAdmin(request);
  if ("error" in auth) return auth.error;

  const payload = await request.json().catch(() => null);
  const { errors, value } = validateBlogInput(payload);
  if (!value) {
    return NextResponse.json({ errors }, { status: 400 });
  }

  const { data: existing, error: fetchError } = await auth.supabase
    .from("blogs")
    .select("slug, title")
    .eq("id", id)
    .maybeSingle();

  if (fetchError || !existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const slug =
    slugify(value.title) === existing.slug
      ? existing.slug
      : await generateUniqueSlug(auth.supabase, value.title, id);

  const { data, error } = await auth.supabase
    .from("blogs")
    .update({
      slug,
      title: value.title,
      description: value.description,
      external_link: value.externalLink,
      price: value.price,
      featured: value.featured,
      images: value.images,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ errors: [error.message] }, { status: 400 });
  }

  revalidateBlogPaths({ slug, previousSlug: existing.slug });
  return NextResponse.json({ post: data });
}

export async function DELETE(request: NextRequest, { params }: { params: Params }) {
  const { id } = await params;
  const auth = await requireAdmin(request);
  if ("error" in auth) return auth.error;

  const { data: existing, error: fetchError } = await auth.supabase
    .from("blogs")
    .select("slug, images")
    .eq("id", id)
    .maybeSingle();

  if (fetchError || !existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const images = existing.images as { url: string }[];
  const objectPaths = images
    .map((image) => image.url)
    .filter((url) => url.startsWith(STORAGE_PREFIX))
    .map((url) => url.slice(STORAGE_PREFIX.length));

  if (objectPaths.length > 0) {
    await auth.supabase.storage.from("blog-images").remove(objectPaths);
  }

  const { error } = await auth.supabase.from("blogs").delete().eq("id", id);
  if (error) {
    return NextResponse.json({ errors: [error.message] }, { status: 400 });
  }

  revalidateBlogPaths({ previousSlug: existing.slug });
  return NextResponse.json({ success: true });
}
