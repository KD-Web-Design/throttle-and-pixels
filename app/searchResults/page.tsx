import { Card, CardContent } from "@/components/ui/card";
import React from "react";

export default function PageSearchResults() {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="scroll-m-20 pb-2 text-xl font-semibold tracking-tight first:mt-0">
        Search Results for query :
      </h2>
      <Card className="flex items-center">
        <CardContent className="flex gap-8 py-4">
          <div>Image</div>
          <div className="flex flex-col gap-2">
            <div>Title</div>
            <div>paragraphe</div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
