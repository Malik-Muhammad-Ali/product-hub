import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="mx-auto max-w-(--container-luxe) px-6 py-24 md:px-10 lg:px-16">
      <Skeleton className="h-10 w-72" />
      <Skeleton className="mt-4 h-5 w-96 max-w-full" />
    </div>
  );
}
