import type { Metadata } from "next";
import { HeroSection } from "@/components/home/hero-section";
import { FeaturedGrid } from "@/components/home/featured-grid";
import { buildMetadata } from "@/lib/seo";
import { SITE_DESCRIPTION } from "@/lib/constants";

export const revalidate = 60;

export const metadata: Metadata = buildMetadata({
  title: "Stories Worth Shopping",
  description: SITE_DESCRIPTION,
  path: "/",
});

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedGrid />
    </>
  );
}
