import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function Newsletter() {
  return (
    <Card className="bg-gradient-to-r from-emerald-400 to-cyan-400">
      <CardHeader>
        <CardTitle className="italic">Newsletter</CardTitle>
        <CardDescription>Don&apos;t miss anything</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-4">
          <Input
            type="email"
            placeholder="Enter your email"
            className="bg-slate-50"
          />
          <Button type="submit" className="font-semibold text-lg">
            I&apos;m in !
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
