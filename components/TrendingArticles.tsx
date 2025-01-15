import Image from "next/image";
import React from "react";
import Link from "next/link";
import { TrendingArticlesProps } from "@/types/types";
import Newsletter from "./Newsletter";
import { Badge } from "./ui/badge";

export default function TrendingArticles({ article }: TrendingArticlesProps) {
  return (
    <div className="flex flex-col justify-end gap-4">
      {article.slice(0, 3).map((article) => (
        <Link
          key={article.id}
          href={`/articles/${article.id}`}
          className="group"
        >
          <section className="flex flex-col gap-4">
            <div className="flex gap-4">
              <Image
                src={article.image || "/placeholder.jpg"}
                alt={article.title}
                width={200}
                height={100}
                className="object-cover rounded-xl max-lg:w-[160px] lg:max-w-[180px] lg:max-h-[110px]"
              />
              <div className="flex flex-col gap-2">
                <Badge className="w-fit" variant="secondary">
                  {article.category.charAt(0).toUpperCase() +
                    article.category.slice(1)}
                </Badge>
                <h1 className="text-lg font-semibold italic group-hover:underline line-clamp-2">
                  {article.title}
                </h1>
              </div>
            </div>
          </section>
        </Link>
      ))}
      <Newsletter />
    </div>
  );
}
