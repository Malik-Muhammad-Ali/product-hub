import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DeletePostButton } from "@/components/admin/delete-post-button";
import { formatDate } from "@/lib/utils";
import type { BlogPost } from "@/types/blog";

export function PostTable({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) {
    return (
      <p className="rounded-sm border border-charcoal-900/10 bg-cream-100 p-8 text-center text-charcoal-500">
        No posts yet. Create your first one.
      </p>
    );
  }

  return (
    <div className="overflow-hidden rounded-sm border border-charcoal-900/10">
      <table className="w-full text-left text-sm">
        <thead className="bg-cream-100 text-xs tracking-wide text-charcoal-500 uppercase">
          <tr>
            <th className="px-4 py-3 font-normal">Title</th>
            <th className="px-4 py-3 font-normal">Created</th>
            <th className="px-4 py-3 font-normal">Featured</th>
            <th className="px-4 py-3 font-normal">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-charcoal-900/10">
          {posts.map((post) => (
            <tr key={post.id}>
              <td className="max-w-xs truncate px-4 py-3 text-charcoal-900">{post.title}</td>
              <td className="px-4 py-3 text-charcoal-500">{formatDate(post.publishedAt)}</td>
              <td className="px-4 py-3">
                {post.featured && (
                  <Badge variant="secondary" className="bg-emerald-100 text-emerald-900">
                    Featured
                  </Badge>
                )}
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <Button
                    render={<Link href={`/admin/${post.id}/edit`} />}
                    nativeButton={false}
                    variant="outline"
                    size="sm"
                  >
                    Edit
                  </Button>
                  <DeletePostButton id={post.id} title={post.title} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
