import type { Metadata } from "next";
import { HeroSection } from "@/components/home/hero-section";
import { CategoryStrip } from "@/components/home/category-strip";
import { FeaturedGrid } from "@/components/home/featured-grid";
import { NewsletterBand } from "@/components/home/newsletter-band";
import { buildMetadata } from "@/lib/seo";
import { SITE_DESCRIPTION } from "@/lib/constants";

export const metadata: Metadata = buildMetadata({
  title: "Stories Worth Shopping",
  description: SITE_DESCRIPTION,
  path: "/",
});

export default function Home() {
  return (
    <>
      <HeroSection />
      <CategoryStrip />
      <FeaturedGrid />
      <NewsletterBand />
    </>
  );
}
