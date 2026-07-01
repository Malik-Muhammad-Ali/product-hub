import { notFound } from "next/navigation";
import { PostForm } from "@/components/admin/post-form";
import { getPostById } from "@/lib/posts";

type Params = Promise<{ id: string }>;

export default async function EditPostPage({ params }: { params: Params }) {
  const { id } = await params;
  const post = await getPostById(id);
  if (!post) notFound();

  return (
    <div>
      <h1 className="font-display text-2xl text-charcoal-900">Edit post</h1>
      <div className="mt-6 max-w-2xl">
        <PostForm post={post} />
      </div>
    </div>
  );
}
