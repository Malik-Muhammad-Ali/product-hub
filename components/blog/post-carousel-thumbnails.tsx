"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import type { PostImage } from "@/types/blog";
import type { CarouselApi } from "@/components/ui/carousel";

export function PostCarouselThumbnails({
  images,
  selectedIndex,
  api,
}: {
  images: PostImage[];
  selectedIndex: number;
  api: CarouselApi | undefined;
}) {
  return (
    <>
      {/* Dots — mobile only */}
      <div className="mt-4 flex justify-center gap-2 sm:hidden">
        {images.map((image, index) => (
          <button
            key={image.url}
            type="button"
            onClick={() => api?.scrollTo(index)}
            aria-label={`Go to image ${index + 1} of ${images.length}`}
            aria-current={index === selectedIndex}
            className={cn(
              "size-2 rounded-full transition-colors",
              index === selectedIndex ? "bg-emerald-700" : "bg-charcoal-900/15"
            )}
          />
        ))}
      </div>

      {/* Thumbnail strip — sm and up */}
      <div className="mt-4 hidden gap-3 sm:flex">
        {images.map((image, index) => (
          <button
            key={image.url}
            type="button"
            onClick={() => api?.scrollTo(index)}
            aria-label={`Go to image ${index + 1} of ${images.length}`}
            aria-current={index === selectedIndex}
            className={cn(
              "relative aspect-square w-16 shrink-0 overflow-hidden rounded-sm border transition-opacity",
              index === selectedIndex
                ? "border-emerald-700 opacity-100"
                : "border-transparent opacity-50 hover:opacity-80"
            )}
          >
            <Image src={image.url} alt="" fill sizes="64px" className="object-cover" />
          </button>
        ))}
      </div>
    </>
  );
}
