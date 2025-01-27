"use client";

import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "@/db/firebaseConfig";
import { useEffect, useState } from "react";
import { DataType } from "@/types/types";
import MainArticle from "@/components/MainArticle";
import TrendingArticles from "@/components/TrendingArticles";
import { Spacing } from "@/components/Spacing";
import TrendingSection from "@/components/TrendingSection";
import LoadingHome from "./LoadingHome";
import GuidesSection from "./GuidesSection";

export default function HomeContent() {
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
    return <LoadingHome />;
  }

  return (
    <main className="flex flex-col p-2">
      <div className="flex max-lg:flex-col gap-4 items-end">
        <MainArticle article={articles[0]} />
        <TrendingArticles article={articles.slice(1, 4)} />
      </div>
      <Spacing size="sm" />
      <TrendingSection article={articles} />
      <Spacing size="sm" />
      <GuidesSection article={articles} />
    </main>
  );
}
