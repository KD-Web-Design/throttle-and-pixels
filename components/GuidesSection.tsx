import React from "react";
import { BentoGrid, BentoGridItem } from "./ui/bento-grid";
import type { TrendingArticlesProps } from "@/types/types";
import Link from "next/link";
import Image from "next/image";
import { stripHtml } from "@/lib/stripHtml";

export default function GuidesSection({ article }: TrendingArticlesProps) {
  const guidesArticles = article.filter(
    (a) => a.category.toLowerCase() === "guides"
  );

  return (
    <section className="p-8 flex flex-col gap-4">
      <h1 className="text-2xl font-semibold">Guides</h1>
      <BentoGrid>
        {guidesArticles.slice(0, 4).map((article, index) => (
          <Link key={article.id} href={`/articles/${article.id}`}>
            <BentoGridItem
              className={index === 0 || index === 3 ? "md:col-span-2 " : ""}
              title={article.title}
              description={
                <p>{stripHtml(article.description).substring(0, 350)}...</p>
              }
              header={
                <div className="relative w-full h-[200px]">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover rounded-xl"
                  />
                </div>
              }
            />
          </Link>
        ))}
      </BentoGrid>
    </section>
  );
}
