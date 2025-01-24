import BreadCrumbDemo from "@/components/BreadCrumbDemo";
import ArticleContent from "./components/ArticleContent";

export default async function PageArticle({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  return (
    <section className="max-w-[1200px] mx-auto p-3">
      <BreadCrumbDemo />
      <ArticleContent articleId={id} />
    </section>
  );
}
