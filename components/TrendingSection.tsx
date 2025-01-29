import React from "react";
import { Card, CardContent, CardFooter } from "./ui/card";
import { TrendingArticlesProps } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "./ui/badge";

export default function TrendingSection({ article }: TrendingArticlesProps) {
  return (
    <section
      id="trending"
      className="w-full bg-secondary rounded p-4 lg:p-8 flex flex-col"
    >
      <h1 className="mb-8 text-2xl font-semibold">Now Trending</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 flex-1">
        {article.slice(0, 6).map((a) => (
          <Link key={a.id} href={`/articles/${a.id}`} className="group">
            <Card key={a.id} className="overflow-hidden h-full flex flex-col">
              <CardContent className="px-0 flex-1">
                <div className="relative w-full h-52">
                  <Image src={a.image} alt={a.title} fill objectFit="cover" />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-2 items-start">
                <Badge className="w-fit" variant="secondary">
                  {a.category.charAt(0).toUpperCase() + a.category.slice(1)}
                </Badge>
                <h3 className="font-semibold text-xl line-clamp-2 italic">
                  {a.title}
                </h3>
                <span className="text-sm text-muted-foreground">
                  By {a.authorName}
                </span>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
