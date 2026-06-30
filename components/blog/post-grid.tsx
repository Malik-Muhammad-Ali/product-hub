import { StaggerGrid, StaggerItem } from "@/components/motion/stagger-grid";
import { PostCard } from "@/components/blog/post-card";
import type { BlogPost } from "@/types/blog";

export function PostGrid({ posts }: { posts: BlogPost[] }) {
  return (
    <StaggerGrid className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post, index) => (
        <StaggerItem key={post.id}>
          <PostCard post={post} priority={index === 0} />
        </StaggerItem>
      ))}
    </StaggerGrid>
  );
}
