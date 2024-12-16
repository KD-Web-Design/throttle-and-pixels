import MainArticle from "@/components/MainArticle";
import Newsletter from "@/components/Newsletter";
import TrendingArticles from "@/components/TrendingArticles";

export default function Home() {
  return (
    <main className="flex flex-col gap-4 p-2">
      <MainArticle />
      <TrendingArticles />
      <Newsletter />
    </main>
  );
}
