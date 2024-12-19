import { MainArticleProps } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function MainArticle({ article }: MainArticleProps) {
  return (
    <Link
      href={`/articles/${article.id}`}
      className="flex flex-col gap-2 w-full overflow-hidden"
    >
      <div className="overflow-hidden rounded-xl lg:order-2">
        <Image
          src={article.image || "/placeholder.jpg"}
          alt={article.title}
          className="rounded-xl object-cover w-full transition-transform duration-500 hover:scale-105"
          width={800}
          height={800}
        />
      </div>
      <span>Article</span>
      <h1 className="text-3xl font-semibold italic">{article.title}</h1>

      <span className="text-muted-foreground mb-4">
        By {article.authorName}
      </span>
    </Link>
  );
}
