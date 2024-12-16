import Image from "next/image";
import React from "react";

export default function TrendingArticles() {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex gap-4">
        <Image src="/" alt="#" width={200} height={100} />
        <div className="flex flex-col gap-4">
          <span>post category</span>
          <h1 className="text-lg font-semibold italic">Post title</h1>
        </div>
      </div>
    </section>
  );
}
