import Link from "next/link";
import { Logo } from "@/components/site/logo";
import { PRIMARY_NAV } from "@/lib/constants";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-charcoal-900/10 bg-cream-100">
      <div className="mx-auto flex max-w-(--container-luxe) flex-col items-start justify-between gap-6 px-6 py-10 md:flex-row md:items-center md:px-10 lg:px-16">
        <div>
          <Logo />
          <p className="mt-2 max-w-[32ch] text-sm text-charcoal-500">
            An editorial blog for considered ecommerce.
          </p>
        </div>

        <nav aria-label="Footer" className="flex items-center gap-6">
          {PRIMARY_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-charcoal-700 hover:text-emerald-700"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="border-t border-charcoal-900/10">
        <div className="mx-auto max-w-(--container-luxe) px-6 py-5 text-xs text-charcoal-500 md:px-10 lg:px-16">
          © {year} BroCommerce. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
