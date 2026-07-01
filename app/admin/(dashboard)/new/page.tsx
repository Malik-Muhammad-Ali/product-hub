import { PostForm } from "@/components/admin/post-form";

export default function NewPostPage() {
  return (
    <div>
      <h1 className="font-display text-2xl text-charcoal-900">New post</h1>
      <div className="mt-6 max-w-2xl">
        <PostForm />
      </div>
    </div>
  );
}
