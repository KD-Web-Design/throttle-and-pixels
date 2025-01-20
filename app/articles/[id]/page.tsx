import BreadCrumbDemo from "@/components/BreadCrumbDemo";
import ArticleContent from "./components/ArticleContent";

export default function PageArticle({ params }: { params: { id: string } }) {
  return (
    <section className="max-w-[1200px] mx-auto p-3">
      <BreadCrumbDemo />
      <ArticleContent articleId={params.id} />
    </section>
  );
}
