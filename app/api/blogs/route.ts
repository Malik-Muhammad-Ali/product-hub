import { NextResponse, type NextRequest } from "next/server";
import { getAllPosts } from "@/lib/posts";
import { requireAdmin } from "@/lib/api-auth";
import { validateBlogInput } from "@/lib/blog-validation";
import { generateUniqueSlug } from "@/lib/generate-slug";
import { revalidateBlogPaths } from "@/lib/revalidate";

export async function GET() {
  const posts = await getAllPosts();
  return NextResponse.json({ posts });
}

export async function POST(request: NextRequest) {
  const auth = await requireAdmin(request);
  if ("error" in auth) return auth.error;

  const payload = await request.json().catch(() => null);
  const { errors, value } = validateBlogInput(payload);
  if (!value) {
    return NextResponse.json({ errors }, { status: 400 });
  }

  const slug = await generateUniqueSlug(auth.supabase, value.title);

  const { data, error } = await auth.supabase
    .from("blogs")
    .insert({
      slug,
      title: value.title,
      description: value.description,
      external_link: value.externalLink,
      price: value.price,
      featured: value.featured,
      images: value.images,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ errors: [error.message] }, { status: 400 });
  }

  revalidateBlogPaths({ slug });
  return NextResponse.json({ post: data }, { status: 201 });
}
