"use client";
import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/db/firebaseConfig";
import Image from "next/image";
import { DataType } from "@/types/types";
import { useParams } from "next/navigation";
import BreadCrumbDemo from "@/components/BreadCrumbDemo";
import { Clock, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import MoreArticles from "./components/MoreArticles";
import { Spacing } from "@/components/Spacing";

export default function PageArticle() {
  const [loading, setLoading] = useState(true);
  const [article, setArticle] = useState<DataType | null>(null);
  const params = useParams();

  useEffect(() => {
    const articleId = params?.id as string;
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
  }, [params?.id]);

  if (loading || !article) {
    return (
      <section className="w-full h-screen flex items-center justify-center">
        Loading...
      </section>
    );
  }

  return (
    <section className="max-w-[1200px] mx-auto p-3">
      <BreadCrumbDemo />
      <h1 className="text-2xl uppercase font-black mt-4">{article.title}</h1>
      <div className="flex text-muted-foreground items-center gap-4 my-2 text-sm">
        <span className="inline-flex items-center gap-1 ">
          <User size={16} /> {article.authorName}{" "}
        </span>
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
        className="w-full h-[500px] object-cover rounded"
      />
      <div
        className="whitespace-pre-wrap mt-4 bg-white p-4 shadow rounded"
        dangerouslySetInnerHTML={{ __html: article.description }}
      ></div>
      <Spacing />
      <MoreArticles currentArticle={article} />
    </section>
  );
}
