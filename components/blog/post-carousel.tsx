"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "motion/react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { PostCarouselThumbnails } from "@/components/blog/post-carousel-thumbnails";
import type { PostImage } from "@/types/blog";

export function PostCarousel({ images, title }: { images: PostImage[]; title: string }) {
  const [api, setApi] = useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setSelectedIndex(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <div className="mx-auto max-w-xl">
      <Carousel
        setApi={setApi}
        opts={{ loop: true, align: "start", duration: shouldReduceMotion ? 0 : 25 }}
        className="group"
      >
        <CarouselContent className="-ml-0">
          {images.map((image, index) => (
            <CarouselItem
              key={image.url}
              className="pl-0"
              aria-label={`Image ${index + 1} of ${images.length}`}
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-cream-100">
                <Image
                  src={image.url}
                  alt={image.alt || `${title} — image ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 576px"
                  priority={index === 0}
                  className="object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-3 rounded-sm border-cream-50 bg-cream-50/90 text-charcoal-900 hover:bg-cream-50" />
        <CarouselNext className="right-3 rounded-sm border-cream-50 bg-cream-50/90 text-charcoal-900 hover:bg-cream-50" />
      </Carousel>

      <PostCarouselThumbnails images={images} selectedIndex={selectedIndex} api={api} />
    </div>
  );
}
