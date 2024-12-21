import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export default function TrendingSection() {
  return (
    <section className="min-h-screen w-full bg-secondary rounded p-8 flex flex-col">
      <h1 className="mb-8 text-2xl font-semibold">Now Trending</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 flex-1">
        {Array.from({ length: 6 }).map((_, index) => (
          <Card key={index} className="">
            <CardHeader>
              <CardTitle>Trending</CardTitle>
            </CardHeader>
            <CardContent>Content</CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
