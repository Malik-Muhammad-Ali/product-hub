import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { getAllCategoryMeta } from "@/lib/categories";

export function CategoryStrip() {
  const categories = getAllCategoryMeta();

  return (
    <Reveal className="mx-auto max-w-(--container-luxe) px-6 py-10 md:px-10 lg:px-16">
      <div className="scrollbar-none flex gap-3 overflow-x-auto pb-2">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/blog?category=${category.slug}`}
            className="shrink-0 rounded-full border border-charcoal-900/10 px-5 py-2 text-sm text-charcoal-700 transition-colors hover:border-emerald-700 hover:text-emerald-700"
          >
            {category.label}
          </Link>
        ))}
      </div>
    </Reveal>
  );
}
