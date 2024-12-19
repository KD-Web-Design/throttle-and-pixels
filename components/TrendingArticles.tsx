import Image from "next/image";
import React from "react";
import Link from "next/link";
import { MainArticleProps } from "@/types/types";

export default function TrendingArticles({ article }: MainArticleProps) {
  return (
    <div className="grid gap-4">
      {article.map((article) => (
        <Link key={article.id} href={`/articles/${article.id}`}>
          <section className="flex flex-col gap-4">
            <div className="flex gap-4">
              <Image
                src={article.image || "/placeholder.jpg"}
                alt={article.title}
                width={200}
                height={100}
                className="object-cover rounded-xl"
              />
              <div className="flex flex-col gap-4">
                <span>post category</span>
                <h1 className="text-lg font-semibold italic">
                  {article.title}
                </h1>
              </div>
            </div>
          </section>
        </Link>
      ))}
    </div>
  );
}
