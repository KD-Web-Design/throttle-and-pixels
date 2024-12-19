"use client";
import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/db/firebaseConfig";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DataType } from "@/types/types";
import { useParams } from "next/navigation";

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
      <div className="mb-4">
        <Link href="/">
          <Button>Back to Home</Button>
        </Link>
      </div>
      <h1 className="text-2xl uppercase font-black mt-4">{article.title}</h1>
      <p className="text-muted-foreground my-2">
        written by {article.authorName}{" "}
      </p>
      <Image
        src={article.image || "/placeholder.jpg"}
        alt={article.title || "Titre manquant"}
        width={1000}
        height={500}
        className="w-full h-[500px] object-cover rounded"
      />
      <p className="whitespace-pre-wrap mt-4">{article.description}</p>
    </section>
  );
}
