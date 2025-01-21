import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function SearchResultsLoading() {
  return (
    <>
      <Skeleton className="h-8 w-64 mb-4" />
      {[1, 2, 3].map((i) => (
        <Card key={i} className="flex items-center">
          <CardHeader className="p-4">
            <Skeleton className="w-32 h-24 rounded" />
          </CardHeader>
          <CardContent className="flex gap-8 p-0 px-4">
            <div className="flex flex-col gap-2 w-full">
              <div className="inline-flex items-center gap-2">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-6 w-24" />
              </div>
              <Skeleton className="h-20 w-full" />
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
