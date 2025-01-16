"use client";

import { CalendarIcon, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DataType } from "@/types/types";
import { useState, useEffect } from "react";
import { AuthorData } from "@/types/types";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/db/firebaseConfig";

export function HoverCardUser({ article }: { article: DataType }) {
  const [authorData, setAuthorData] = useState<AuthorData | null>(null);

  useEffect(() => {
    const getAuthorData = async () => {
      if (!article.authorId) return;

      const userRef = doc(db, "users", article.authorId);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        setAuthorData(userSnap.data() as AuthorData);
      }
    };

    getAuthorData();
  }, [article.authorId]);
  return (
    <HoverCard>
      <HoverCardTrigger asChild className="p-0">
        <Button
          variant="link"
          size="sm"
          className="text-muted-foreground font-normal text-sm"
        >
          <User size={16} /> {article.authorName}
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <Avatar>
            <AvatarImage src={authorData?.photoURL || "/default-avatar.png"} />
            <AvatarFallback>{article.authorName[0]}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">@{article.authorName}</h4>
            <p className="text-sm">
              {authorData?.displayName || article.authorName}
            </p>
            <div className="flex items-center pt-2">
              <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
              <span className="text-xs text-muted-foreground">
                {authorData?.createdAt &&
                  `Joined ${authorData.createdAt.toDate.toLocaleDateString(
                    "en-EN"
                  )}`}
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
