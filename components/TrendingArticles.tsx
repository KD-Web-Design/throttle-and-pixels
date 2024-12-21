import Image from "next/image";
import React from "react";
import Link from "next/link";
import { TrendingArticlesProps } from "@/types/types";
import Newsletter from "./Newsletter";

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
                className="object-cover rounded-xl max-lg:w-[160px] lg:max-w-[180px] max-lg:h-[100px]"
              />
              <div className="flex flex-col gap-2">
                <span>post category</span>
                <h1 className="text-lg font-semibold italic group-hover:underline">
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
