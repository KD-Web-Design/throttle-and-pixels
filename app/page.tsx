"use client";

import MainArticle from "@/components/MainArticle";
import TrendingArticles from "@/components/TrendingArticles";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "@/db/firebaseConfig";
import { useEffect, useState } from "react";
import { DataType } from "@/types/types";
import { Spacing } from "@/components/Spacing";
import TrendingSection from "@/components/TrendingSection";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const [articles, setArticles] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "articles"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data: DataType[] = [];
      snapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() } as DataType);
      });
      setArticles(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <main className="flex flex-col p-2">
        <div className="flex max-lg:flex-col gap-4 items-end">
          <div className="flex-1">
            <Skeleton className="h-[400px] w-full rounded-lg" />
          </div>
          <div className="lg:w-[400px] w-full">
            <Skeleton className="h-[400px] w-full rounded-lg" />
          </div>
        </div>
        <Spacing size="sm" />
        <div>
          <Skeleton className="h-[200px] w-full rounded-lg" />
        </div>
      </main>
    );
  }

  return (
    <main className="flex flex-col p-2">
      <div className="flex max-lg:flex-col gap-4 items-end">
        {articles.length > 0 && <MainArticle article={articles[0]} />}
        {articles.length > 0 && <TrendingArticles article={articles} />}
      </div>
      <Spacing size="sm" />
      <TrendingSection />
    </main>
  );
}
