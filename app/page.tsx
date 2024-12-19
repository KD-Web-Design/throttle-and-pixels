"use client";

import MainArticle from "@/components/MainArticle";
import TrendingArticles from "@/components/TrendingArticles";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "@/db/firebaseConfig";
import { useEffect, useState } from "react";
import { DataType } from "@/types/types";
import { Spacing } from "@/components/Spacing";

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
    return <div>Loading...</div>;
  }

  return (
    <main className="flex flex-col p-2">
      <div className="flex max-lg:flex-col gap-4">
        {articles.length > 0 && <MainArticle article={articles[0]} />}
        {articles.length > 0 && <TrendingArticles article={articles} />}
      </div>
      <Spacing size="sm" />
    </main>
  );
}
