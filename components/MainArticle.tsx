import { MainArticleProps } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function MainArticle({ article }: MainArticleProps) {
  return (
    <Link href={`/articles/${article.id}`}>
      <div className="flex flex-col gap-4 w-full hover:opacity-80 transition-opacity">
        <Image
          src={article.image || "/placeholder.jpg"}
          alt={article.title}
          className="rounded-xl object-cover w-full"
          width={400}
          height={200}
        />
        <span>Article</span>
        <h1 className="text-2xl font-semibold italic">{article.title}</h1>
        <div className="flex gap-4">
          <span className="font-semibold">{article.authorName}</span>
          <span className="text-muted-foreground text-sm">
            {new Date(article.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </Link>
  );
}
