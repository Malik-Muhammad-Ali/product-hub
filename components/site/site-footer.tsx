import Link from "next/link";
import { Logo } from "@/components/site/logo";
import { PRIMARY_NAV, SOCIAL_LINKS } from "@/lib/constants";
import { getAllCategoryMeta } from "@/lib/categories";

export function SiteFooter() {
  const categories = getAllCategoryMeta();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-charcoal-900/10 bg-cream-100">
      <div className="mx-auto max-w-(--container-luxe) px-6 py-16 md:px-10 md:py-24 lg:px-16">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Logo />
            <p className="mt-4 max-w-[28ch] text-sm text-charcoal-500">
              An editorial journal for considered ecommerce.
            </p>
          </div>

          <div>
            <p className="mb-4 text-xs tracking-wide text-charcoal-500 uppercase">
              Navigate
            </p>
            <ul className="flex flex-col gap-2">
              {PRIMARY_NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-charcoal-700 hover:text-emerald-700"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-xs tracking-wide text-charcoal-500 uppercase">
              Categories
            </p>
            <ul className="flex flex-col gap-2">
              {categories.slice(0, 5).map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/blog?category=${category.slug}`}
                    className="text-sm text-charcoal-700 hover:text-emerald-700"
                  >
                    {category.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-xs tracking-wide text-charcoal-500 uppercase">
              Follow
            </p>
            <ul className="flex flex-col gap-2">
              {SOCIAL_LINKS.map((social) => (
                <li key={social.href}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-charcoal-700 hover:text-emerald-700"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-charcoal-900/10 pt-8 text-xs text-charcoal-500 md:flex-row md:items-center">
          <p>© {year} BroCommerce. All rights reserved.</p>
          <p>Crafted for considered shopping.</p>
        </div>
      </div>
    </footer>
  );
}
