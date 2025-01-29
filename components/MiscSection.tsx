import { TrendingArticlesProps } from "@/types/types";
import React from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import Image from "next/image";
import { stripHtml } from "@/lib/stripHtml";
import Link from "next/link";
import { InteractiveHoverButton } from "./ui/interactive-hover-button";

export default function MiscSection({ article }: TrendingArticlesProps) {
  const miscArticles = article.filter(
    (a) => a.category.toLowerCase() === "misc"
  );
  return (
    <section
      id="misc"
      className="px-4 lg:px-8 flex flex-col gap-4 bg-secondary py-4 rounded"
    >
      <h1 className="text-2xl font-semibold">Misc</h1>
      {miscArticles.slice(0, 4).map((article) => (
        <Link
          key={article.id}
          href={`/articles/${article.id}`}
          className="group"
        >
          <Card className="flex max-lg:flex-col items-center">
            <CardHeader className="relative w-full h-48 lg:w-48 lg:h-24 mx-4">
              {article.image && (
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover rounded"
                />
              )}
            </CardHeader>
            <CardContent className="flex gap-8 p-4 w-full">
              <div className="flex flex-col gap-2">
                <h2 className="font-semibold group-hover:underline max-lg:line-clamp-2">
                  {article.title}
                </h2>

                <p className="text-muted-foreground text-sm max-lg:hidden">
                  {stripHtml(article.description).substring(0, 350)}...
                </p>
                <span className="text-xs">By {article.authorName}</span>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
      <Link
        href="/searchResults?category=misc"
        className="ml-auto text-primary"
      >
        <InteractiveHoverButton className="text-sm">
          View more articles
        </InteractiveHoverButton>
      </Link>
    </section>
  );
}
