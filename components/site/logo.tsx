import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "font-display text-xl tracking-tight text-charcoal-900 select-none",
        className
      )}
    >
      Bro<span className="text-emerald-700">Commerce</span>
    </span>
  );
}
