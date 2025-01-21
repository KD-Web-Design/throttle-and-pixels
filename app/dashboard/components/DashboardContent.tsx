"use client";

import AlertDialogDemo from "@/components/AlertDialogDemo";
import LoadingButton from "@/components/LoadingButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useFirebase } from "@/context/articleContext";
import useAuth from "@/hooks/useAuth";
import { Mail, PencilLine, PlusCircleIcon, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

export default function DashboardContent() {
  const { user } = useAuth();
  const { userArticles, deleteArticle } = useFirebase();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingArticleId, setLoadingArticleId] = useState<string | null>(null);

  const handleClick = () => {
    setIsLoading(true);
  };

  const handleEditClick = (articleId: string) => {
    setLoadingArticleId(articleId);
  };
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Dashboard</CardTitle>
          <CardDescription>Your informations</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="flex flex-col space-y-4">
            {user?.photoURL && (
              <li className="flex items-center space-x-2">
                <Image
                  src={user?.photoURL}
                  alt={`${user?.displayName}'s profile picture`}
                  width={80}
                  height={80}
                  className="rounded-full"
                />
              </li>
            )}
            <li className="inline-flex items-center space-x-2">
              <User size={20} />
              <span className="font-semibold">Your name:</span>
              <span>{user?.displayName}</span>
            </li>
            <li className="inline-flex items-center space-x-2">
              <Mail size={20} />
              <span className="font-semibold">Your email:</span>
              <span>{user?.email}</span>
            </li>
            <li>
              <span className="text-muted-foreground text-sm">
                Member since{" "}
                {user?.metadata?.creationTime
                  ? new Intl.DateTimeFormat("en-EN", {
                      dateStyle: "full",
                    }).format(new Date(user?.metadata?.creationTime))
                  : "Unknown"}
              </span>
            </li>
          </ul>
        </CardContent>
      </Card>
      <div className="flex flex-col space-y-2 mt-4 p-3">
        <div className="flex justify-between">
          <h1 className="text-2xl">Your articles</h1>
          <Link href="/dashboard/createArticle" passHref>
            <LoadingButton
              onClick={handleClick}
              isLoading={isLoading}
              className="flex items-center space-x-2"
            >
              <PlusCircleIcon className="h-5 w-5" />
            </LoadingButton>
          </Link>
        </div>
        <p className="text-muted-foreground text-lg">Your posts</p>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-4">
          {userArticles.map((item, index) => (
            <Card
              key={index}
              className=" flex flex-col items-center justify-between overflow-hidden relative"
            >
              <div className="flex gap-4 absolute bottom-2 left-2 shadow-lg">
                <Link href={`/dashboard/articleUser/${item.id}`} passHref>
                  <LoadingButton
                    onClick={() => handleEditClick(item.id)}
                    isLoading={loadingArticleId === item.id}
                    variant="outline"
                  >
                    <PencilLine />
                  </LoadingButton>
                </Link>
                <AlertDialogDemo onDelete={() => deleteArticle(item.id)} />
              </div>
              <CardContent className="py-6">
                <h3 className="font-semibold line-clamp-2">{item.title}</h3>
              </CardContent>

              <CardFooter className="p-0 w-full">
                <Image
                  src={`${item.image}`}
                  alt={item.title}
                  width={200}
                  height={200}
                  className="w-full object-cover"
                />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
