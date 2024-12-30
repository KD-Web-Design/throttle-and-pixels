import React from "react";
import { Card, CardContent, CardFooter } from "./ui/card";
import { TrendingArticlesProps } from "@/types/types";
import Image from "next/image";
import Link from "next/link";

export default function TrendingSection({ article }: TrendingArticlesProps) {
  console.log("Articles reçus:", article);
  return (
    <section className="min-h-screen w-full bg-secondary rounded p-8 flex flex-col">
      <h1 className="mb-8 text-2xl font-semibold">Now Trending</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 flex-1">
        {article.map((a) => (
          <Link key={a.id} href={`/articles/${a.id}`} className="group">
            <Card key={a.id} className="overflow-hidden">
              <CardContent className="px-0">
                <Image
                  src={a.image}
                  alt={a.title}
                  width={800}
                  height={800}
                  className="w-full object-cover"
                />
              </CardContent>
              <CardFooter className="flex flex-col gap-2 items-start">
                <span className="text-sm">post category</span>
                <h3 className="font-bold text-xl">{a.title}</h3>
                <span className="text-sm">By {a.authorName}</span>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
