"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useFirebase } from "@/context/articleContext";
import { stripHtml } from "@/lib/stripHtml";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import SearchResultsLoading from "../loading";
import { PaginationDemo } from "./PaginationDemo";

export default function SearchResults() {
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const { articles } = useFirebase();

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  const searchResults = useMemo(() => {
    return articles.filter(
      (article) =>
        article.title.toLowerCase().includes(query.toLowerCase()) ||
        article.description.toLowerCase().includes(query.toLowerCase())
    );
  }, [articles, query]);

  if (isLoading) {
    return <SearchResultsLoading />;
  }
  return (
    <>
      <h2 className="scroll-m-20 pb-2 text-xl font-semibold tracking-tight first:mt-0">
        Search Results for query : {query}
      </h2>
      {searchResults.length === 0 && !isLoading ? (
        <p>No articles found for &quot;{query}&quot;</p>
      ) : (
        searchResults.slice(0, 10).map((article) => (
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
              <CardContent className="flex gap-8 p-4">
                <div className="flex flex-col gap-2">
                  <div className="inline-flex items-center gap-2">
                    <h2 className="font-semibold group-hover:underline max-lg:line-clamp-2">
                      {article.title}
                    </h2>
                    <Badge className="w-fit" variant="secondary">
                      {article.category.charAt(0).toUpperCase() +
                        article.category.slice(1)}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground text-sm max-lg:hidden">
                    {stripHtml(article.description).substring(0, 350)}...
                  </p>
                  <span className="text-xs text-muted-foreground">
                    By {article.authorName}
                  </span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))
      )}
      <PaginationDemo />
    </>
  );
}
