"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useAuth from "@/hooks/useAuth";
import { Mail, User } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function PageDashboard() {
  const { user } = useAuth();

  return (
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
                width={50}
                height={50}
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
  );
}
