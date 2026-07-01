"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-cream-100">
      <div className="mx-auto grid max-w-(--container-luxe) grid-cols-1 items-center gap-12 px-6 py-20 md:grid-cols-2 md:px-10 md:py-28 lg:px-16 lg:py-36">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-display text-sm tracking-[0.2em] text-emerald-700 uppercase">
            The BroCommerce Blog
          </p>
          <h1 className="mt-6 font-display text-5xl leading-[1.05] text-charcoal-900 md:text-6xl">
            Stories worth shopping.
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-charcoal-700">
            A considered edit of the products, makers, and ideas shaping how people shop.
            Written for readers who&apos;d rather buy one thing well than ten things fast.
          </p>
          <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} className="mt-10 inline-block">
            <Button
              render={<Link href="/blog" />}
              nativeButton={false}
              size="lg"
              className="bg-emerald-900 px-6 text-cream-50 hover:bg-emerald-900/90"
            >
              Read the blogs
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="relative aspect-[4/5] overflow-hidden rounded-sm"
        >
          <Image
            src="https://picsum.photos/seed/brocommerce-hero/1200/1500"
            alt="Editorial still life of considered ecommerce products styled on a neutral surface"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
            className="object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}
