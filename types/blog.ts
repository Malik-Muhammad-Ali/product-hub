export interface PostImage {
  url: string;
  alt: string;
  width: number;
  height: number;
}

export type Category =
  | "fashion"
  | "footwear"
  | "accessories"
  | "tech"
  | "home-goods"
  | "beauty"
  | "trends";

export interface CategoryMeta {
  slug: Category;
  label: string;
  description: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string[];
  images: PostImage[];
  category: Category;
  tags: string[];
  price: number;
  currency: string;
  externalLink: string;
  author: {
    name: string;
    avatarUrl?: string;
  };
  publishedAt: string;
  updatedAt?: string;
  featured: boolean;
  readingTimeMinutes?: number;
}
