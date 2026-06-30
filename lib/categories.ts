import type { Category, CategoryMeta } from "@/types/blog";

const CATEGORY_META: Record<Category, CategoryMeta> = {
  fashion: {
    slug: "fashion",
    label: "Fashion",
    description: "Tailoring, wardrobes, and the clothes worth keeping.",
  },
  footwear: {
    slug: "footwear",
    label: "Footwear",
    description: "Shoes built to be resoled, not replaced.",
  },
  accessories: {
    slug: "accessories",
    label: "Accessories",
    description: "Leather goods and the small details that finish an outfit.",
  },
  tech: {
    slug: "tech",
    label: "Tech",
    description: "Connected objects designed to disappear into daily life.",
  },
  "home-goods": {
    slug: "home-goods",
    label: "Home Goods",
    description: "Tableware, textiles, and objects for a considered home.",
  },
  beauty: {
    slug: "beauty",
    label: "Beauty",
    description: "Fragrance and grooming built around restraint.",
  },
  trends: {
    slug: "trends",
    label: "Trends",
    description: "What's actually changing in how people shop and dress.",
  },
};

export function getCategoryMeta(category: Category): CategoryMeta {
  return CATEGORY_META[category];
}

export function getAllCategoryMeta(): CategoryMeta[] {
  return Object.values(CATEGORY_META);
}

export function isCategory(value: string): value is Category {
  return value in CATEGORY_META;
}
