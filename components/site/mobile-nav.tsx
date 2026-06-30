"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/site/logo";
import { PRIMARY_NAV } from "@/lib/constants";
import { getAllCategoryMeta } from "@/lib/categories";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const categories = getAllCategoryMeta();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            aria-label="Open menu"
            className="md:hidden"
          />
        }
      >
        <Menu className="size-5" />
      </SheetTrigger>
      <SheetContent side="right" className="bg-cream-50">
        <SheetHeader>
          <SheetTitle>
            <Logo />
          </SheetTitle>
        </SheetHeader>
        <nav aria-label="Mobile" className="flex flex-col gap-1 px-4">
          {PRIMARY_NAV.map((item) => (
            <SheetClose
              key={item.href}
              render={<Link href={item.href} />}
              nativeButton={false}
              className="rounded-sm px-2 py-3 font-display text-lg text-charcoal-900 hover:bg-emerald-100"
            >
              {item.label}
            </SheetClose>
          ))}
        </nav>
        <div className="mt-2 border-t border-charcoal-900/10 px-4 pt-4">
          <p className="mb-2 text-xs tracking-wide text-charcoal-500 uppercase">
            Categories
          </p>
          <div className="flex flex-col gap-1">
            {categories.map((category) => (
              <SheetClose
                key={category.slug}
                render={<Link href={`/blog?category=${category.slug}`} />}
                nativeButton={false}
                className="rounded-sm px-2 py-2 text-sm text-charcoal-700 hover:bg-emerald-100"
              >
                {category.label}
              </SheetClose>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
