import { Spacing } from "./Spacing";
import { Skeleton } from "./ui/skeleton";

export default function LoadingHome() {
  return (
    <main className="flex flex-col p-2">
      <div className="flex max-lg:flex-col gap-4 items-end">
        <div className="flex-1">
          <Skeleton className="h-[400px] w-full rounded-lg" />
        </div>
        <div className="lg:w-[400px] w-full">
          <Skeleton className="h-[400px] w-full rounded-lg" />
        </div>
      </div>
      <Spacing size="sm" />
      <div>
        <Skeleton className="h-[200px] w-full rounded-lg" />
      </div>
    </main>
  );
}
