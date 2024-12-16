"use client";

import GithubIcon from "@/components/icons/GithubIcon";
import GoogleIcon from "@/components/icons/GoogleIcon";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useAuth from "@/hooks/useAuth";
import React from "react";

export default function PageSignInAndUp() {
  const { redirectIfAuthenticated, loginWithGoogle, loginWithGithub } =
    useAuth();

  redirectIfAuthenticated();

  return (
    <section className="h-screen w-full flex items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Button type="button" variant="outline" onClick={loginWithGoogle}>
            <GoogleIcon size={24} />
            Continuer avec Google
          </Button>
          <Button type="button" variant="outline" onClick={loginWithGithub}>
            <GithubIcon size={24} />
            Continuer avec Github
          </Button>
        </CardContent>
      </Card>
    </section>
  );
}
