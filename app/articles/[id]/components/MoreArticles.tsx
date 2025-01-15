import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useFirebase } from "@/context/articleContext";
import { MoreArticlesProps } from "@/types/types";

import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function MoreArticles({ currentArticle }: MoreArticlesProps) {
  const { articles } = useFirebase();

  const similarArticles = articles
    .filter((a) => a.id !== currentArticle.id)
    .slice(0, 3);
  return (
    <>
      <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight p-2">
        More articles
      </h1>
      <div className="flex max-md:flex-col gap-4 p-4 rounded bg-white">
        {similarArticles.map((a) => (
          <Link key={a.id} href={`/articles/${a.id}`} className="group flex-1">
            <Card key={a.id} className="overflow-hidden h-full flex flex-col">
              <CardContent className="px-0 flex-1">
                <Image
                  src={a.image}
                  alt={a.title}
                  width={800}
                  height={800}
                  className="w-full h-full object-cover"
                />
              </CardContent>
              <CardFooter className="flex flex-col gap-2 items-start">
                <Badge className="w-fit" variant="secondary">
                  {a.category.charAt(0).toUpperCase() + a.category.slice(1)}
                </Badge>
                <h3 className="font-semibold text-xl line-clamp-2 group-hover:underline">
                  {a.title}
                </h3>
                <span className="text-sm">By {a.authorName}</span>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
}
