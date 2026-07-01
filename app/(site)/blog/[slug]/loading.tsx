import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="mx-auto max-w-(--container-luxe) px-6 py-16 md:px-10 md:py-24 lg:px-16">
      <Skeleton className="h-6 w-24 rounded-full" />
      <Skeleton className="mt-4 h-12 w-3/4" />
      <Skeleton className="mt-4 h-5 w-48" />
      <Skeleton className="mt-10 aspect-[4/3] w-full" />
      <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_320px]">
        <div className="space-y-4">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-2/3" />
        </div>
        <Skeleton className="h-48 w-full" />
      </div>
    </div>
  );
}
