"use client";

import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/utils";
import type { BlogPost } from "@/types/blog";

export function PostPriceCta({ post }: { post: BlogPost }) {
  return (
    <aside className="rounded-sm border border-charcoal-900/10 bg-cream-100 p-6 lg:sticky lg:top-28">
      <p className="text-xs tracking-wide text-charcoal-500 uppercase">Featured in this story</p>
      <Separator className="my-4 bg-gold-400/40" />
      <p className="font-display text-3xl text-charcoal-900">
        {formatPrice(post.price, post.currency)}
      </p>
      <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} className="mt-6">
        <Button
          render={
            <a
              href={post.externalLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Shop ${post.title} (opens in new tab)`}
            />
          }
          nativeButton={false}
          size="lg"
          className="w-full justify-center bg-emerald-900 text-cream-50 hover:bg-emerald-900/90"
        >
          Shop Now
          <ArrowUpRight className="size-4" />
        </Button>
      </motion.div>
    </aside>
  );
}
