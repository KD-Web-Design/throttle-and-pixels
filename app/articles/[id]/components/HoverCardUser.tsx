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

export function HoverCardUser({ article }: { article: DataType }) {
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
      <HoverCardContent className="">
        <div className="flex space-x-4">
          <Avatar>
            <AvatarImage src={article.authorPhoto} />
            <AvatarFallback>{article.authorName}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">@{article.authorName}</h4>
            <p className="text-sm">{""}</p>
            <div className="flex items-center pt-2">
              <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
              <span className="text-xs text-muted-foreground">
                Joined {article.authorJoinDate}
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
