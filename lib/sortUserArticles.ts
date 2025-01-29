import { DataType } from "@/types/types";

export const sortArticlesByDate = (articles: DataType[]) => {
  return [...articles].sort((a, b) => {
    return b.createdAt.toMillis() - a.createdAt.toMillis();
  });
};
