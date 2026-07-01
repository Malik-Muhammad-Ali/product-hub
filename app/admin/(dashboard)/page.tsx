import { PostTable } from "@/components/admin/post-table";
import { getAllPosts } from "@/lib/posts";

export default async function AdminDashboardPage() {
  const posts = await getAllPosts();

  return (
    <div>
      <h1 className="font-display text-2xl text-charcoal-900">Posts</h1>
      <p className="mt-1 text-sm text-charcoal-500">{posts.length} total</p>
      <div className="mt-6">
        <PostTable posts={posts} />
      </div>
    </div>
  );
}
