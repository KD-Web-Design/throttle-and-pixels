import Image from "next/image";
import React from "react";

export default function MainArticle() {
  return (
    <div className="flex flex-col gap-4 w-full">
      <Image
        src="/"
        alt="Post Picture"
        className="rounded-xl object-cover w-full"
        width={400}
        height={200}
      />
      <span>Post Categories</span>
      <h1 className="text-lg font-semibold italic">Post title</h1>
      <div className="flex gap-4">
        <span className="font-semilbold">post author</span>
        <span className="text-muted text-sm">date of the post</span>
      </div>
    </div>
  );
}
