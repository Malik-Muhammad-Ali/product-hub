export interface PostImage {
  url: string;
  alt: string;
  width: number;
  height: number;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string[];
  images: PostImage[];
  price: number | null;
  currency: string;
  externalLink: string;
  publishedAt: string;
  updatedAt?: string;
  featured: boolean;
  readingTimeMinutes?: number;
}
