import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { UserCircleIcon } from "lucide-react";
import { Button } from "./ui/button";
import GoogleIcon from "./icons/GoogleIcon";
import GithubIcon from "./icons/GithubIcon";
import useAuth from "@/hooks/useAuth";

export default function LogInSheet() {
  const { redirectIfAuthenticated, loginWithGoogle, loginWithGithub } =
    useAuth();

  redirectIfAuthenticated();
  return (
    <Sheet>
      <SheetTrigger>
        <UserCircleIcon className="text-primary" />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Log In</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-4 mt-8">
          <Button type="button" variant="outline" onClick={loginWithGoogle}>
            <GoogleIcon size={24} />
            Login with Google
          </Button>
          <Button type="button" variant="outline" onClick={loginWithGithub}>
            <GithubIcon size={24} />
            Login with Github
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
