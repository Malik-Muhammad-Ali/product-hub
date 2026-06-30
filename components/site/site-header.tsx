"use client";

import Link from "next/link";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { Logo } from "@/components/site/logo";
import { MobileNav } from "@/components/site/mobile-nav";
import { PRIMARY_NAV } from "@/lib/constants";
import { getAllCategoryMeta } from "@/lib/categories";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const categories = getAllCategoryMeta();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 80);
  });

  return (
    <motion.header
      className={cn(
        "sticky top-0 z-40 border-b bg-cream-50/95 backdrop-blur",
        scrolled ? "border-charcoal-900/10 shadow-sm" : "border-transparent"
      )}
      animate={{ paddingTop: scrolled ? 10 : 20, paddingBottom: scrolled ? 10 : 20 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mx-auto flex max-w-(--container-luxe) items-center justify-between px-6 md:px-10 lg:px-16">
        <Link href="/" aria-label={`${"BroCommerce"} home`}>
          <Logo />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {PRIMARY_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm tracking-wide text-charcoal-700 transition-colors hover:text-emerald-700"
            >
              {item.label}
            </Link>
          ))}
          <span className="h-4 w-px bg-charcoal-900/10" aria-hidden />
          {categories.slice(0, 4).map((category) => (
            <Link
              key={category.slug}
              href={`/blog?category=${category.slug}`}
              className="text-sm tracking-wide text-charcoal-700 transition-colors hover:text-emerald-700"
            >
              {category.label}
            </Link>
          ))}
        </nav>

        <MobileNav />
      </div>
    </motion.header>
  );
}
