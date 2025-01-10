import { MainArticleProps } from "@/types/types";
import { Clock, User } from "lucide-react";
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

      <div className="inline-flex items-center gap-4 text-muted-foreground text-sm">
        <span className="inline-flex items-center gap-1">
          <User size={16} />
          {article.authorName}
        </span>
        <span className="inline-flex items-center gap-1">
          <Clock size={16} />
          {article.createdAt?.toDate().toLocaleDateString("en-EN")}
        </span>
      </div>
    </Link>
  );
}
