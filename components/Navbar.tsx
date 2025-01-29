"use client";

import Link from "next/link";
import React from "react";
import { SidebarTrigger } from "./ui/sidebar";
import { LogOut } from "lucide-react";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/db/firebaseConfig";
import { Button } from "./ui/button";
import useAuth from "@/hooks/useAuth";
import LogInSheet from "./LogInSheet";
import SearchPopover from "./SearchPopover";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export default function Navbar() {
  const router = useRouter();
  const { user } = useAuth();

  const handleSignOut = () => {
    signOut(auth);
    router.push("/");
  };
  return (
    <nav className="my-4 flex items-center gap-2 rounded-lg border bg-card px-3 py-3 shadow-xl">
      <SidebarTrigger />
      <Link href="/" className="font-semibold text-lg">
        Throttle <span className="text-primary">&</span> Pixels
      </Link>

      <div className="ml-auto"></div>
      <SearchPopover />
      {!user ? (
        <LogInSheet />
      ) : (
        <Popover>
          <PopoverTrigger>
            <Avatar className="w-8 h-8">
              <AvatarImage
                fetchPriority="high"
                src={user.photoURL ?? undefined}
                alt={user.displayName ?? undefined}
              />
            </Avatar>
          </PopoverTrigger>
          <PopoverContent
            className="w-fit flex flex-col items-center gap-4"
            align="end"
          >
            <span className=" text-xs">{user.email}</span>
            <Avatar className="w-16 h-16">
              <AvatarImage
                src={user.photoURL ?? undefined}
                alt={user.displayName ?? undefined}
              />
            </Avatar>
            <span className="text-sm font-semibold">
              Hi, {user.displayName}
            </span>
            <Button onClick={handleSignOut}>
              <LogOut />
              Logout
            </Button>
          </PopoverContent>
        </Popover>
      )}
    </nav>
  );
}
