"use client";
import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/db/firebaseConfig";
import { DataType } from "@/types/types";
import { Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Loading from "../loading";
import { HoverCardUser } from "./HoverCardUser";
import Image from "next/image";
import { Spacing } from "@/components/Spacing";
import MoreArticles from "./MoreArticles";

export default function ArticleContent({ articleId }: { articleId: string }) {
  const [loading, setLoading] = useState(true);
  const [article, setArticle] = useState<DataType | null>(null);

  useEffect(() => {
    if (!articleId) return;
    const unsubscribe = onSnapshot(collection(db, "articles"), (snapshot) => {
      snapshot.forEach((doc) => {
        const data = doc.data();
        if (doc.id === articleId) {
          setArticle({ id: doc.id, ...data } as DataType);
          setLoading(false);
        }
      });
    });
    return () => unsubscribe();
  }, [articleId]);

  if (loading || !article) {
    return <Loading />;
  }

  return (
    <>
      <h1 className="text-2xl uppercase font-black mt-4">{article.title}</h1>
      <div className="flex text-muted-foreground items-center gap-4 my-2 text-sm">
        <HoverCardUser article={article} />
        <span className="inline-flex items-center gap-1">
          <Clock size={16} />
          {article.createdAt?.toDate().toLocaleDateString("en-EN")}
        </span>
        <Badge variant="secondary">
          {article.category.charAt(0).toUpperCase() + article.category.slice(1)}
        </Badge>
      </div>
      <Image
        src={article.image || "/placeholder.jpg"}
        alt={article.title || "Titre manquant"}
        width={1000}
        height={500}
        className="w-full max-h-[500px] object-cover rounded"
      />
      <div
        className="whitespace-pre-wrap mt-4 bg-white p-4 shadow-sm rounded"
        dangerouslySetInnerHTML={{ __html: article.description }}
      ></div>
      <Spacing />
      <MoreArticles currentArticle={article} />
    </>
  );
}
