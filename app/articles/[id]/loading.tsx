import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <section className="max-w-[1200px] mx-auto p-3">
      <div className="space-y-6">
        {/* Titre */}
        <Skeleton className="h-6 w-48" />

        {/* Sous-titre */}
        <Skeleton className="h-10 w-full" />

        {/* Métadonnées */}
        <div className="flex gap-4">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-6 w-28" />
        </div>

        {/* Image principale */}
        <Skeleton className="w-full h-[500px]" />

        {/* Description */}
        <Skeleton className="h-48 w-full" />
      </div>
    </section>
  );
}
