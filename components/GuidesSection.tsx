import React from "react";
import { BentoGrid, BentoGridItem } from "./ui/bento-grid";
import type { TrendingArticlesProps } from "@/types/types";
import Link from "next/link";
import Image from "next/image";
import { stripHtml } from "@/lib/stripHtml";
import { InteractiveHoverButton } from "./ui/interactive-hover-button";

export default function GuidesSection({ article }: TrendingArticlesProps) {
  const guidesArticles = article.filter(
    (a) => a.category.toLowerCase() === "guides"
  );

  return (
    <section id="guides" className="lg:px-8 flex flex-col gap-4">
      <h1 className="text-2xl font-semibold">Guides</h1>
      <BentoGrid>
        {guidesArticles.slice(0, 4).map((article, index) => (
          <Link
            key={article.id}
            href={`/articles/${article.id}`}
            className={index === 0 || index === 3 ? "md:col-span-2" : ""}
          >
            <BentoGridItem
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
                    sizes="auto"
                    className="object-cover rounded-xl"
                  />
                </div>
              }
            />
          </Link>
        ))}
      </BentoGrid>
      <Link
        href="/searchResults?category=guides"
        className="ml-auto text-primary"
      >
        <InteractiveHoverButton className="text-sm">
          View more articles
        </InteractiveHoverButton>
      </Link>
    </section>
  );
}
