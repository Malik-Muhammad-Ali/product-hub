import Link from "next/link";
import { cn } from "@/lib/utils";
import { getAllCategoryMeta } from "@/lib/categories";
import type { Category } from "@/types/blog";

export function CategoryFilterTabs({ activeCategory }: { activeCategory?: Category }) {
  const categories = getAllCategoryMeta();

  return (
    <div className="scrollbar-none flex gap-2 overflow-x-auto pb-2" role="tablist" aria-label="Filter by category">
      <Link
        href="/blog"
        aria-current={!activeCategory ? "page" : undefined}
        className={cn(
          "shrink-0 rounded-full border px-4 py-2 text-sm transition-colors",
          !activeCategory
            ? "border-emerald-700 bg-emerald-700 text-cream-50"
            : "border-charcoal-900/10 text-charcoal-700 hover:border-emerald-700 hover:text-emerald-700"
        )}
      >
        All
      </Link>
      {categories.map((category) => (
        <Link
          key={category.slug}
          href={`/blog?category=${category.slug}`}
          aria-current={activeCategory === category.slug ? "page" : undefined}
          className={cn(
            "shrink-0 rounded-full border px-4 py-2 text-sm transition-colors",
            activeCategory === category.slug
              ? "border-emerald-700 bg-emerald-700 text-cream-50"
              : "border-charcoal-900/10 text-charcoal-700 hover:border-emerald-700 hover:text-emerald-700"
          )}
        >
          {category.label}
        </Link>
      ))}
    </div>
  );
}
