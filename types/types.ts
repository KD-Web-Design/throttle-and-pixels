import { ButtonProps } from "@/components/ui/button";
import { Timestamp } from "firebase/firestore";

export type DataType = {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  authorName: string;
  authorPhoto?: string;
  authorBio?: string;
  authorJoinDate?: string;
  authorId: string;
  createdAt: Timestamp;
};

export type DataFormType = {
  title: string;
  description: string;
  category: string;
  image?: string;
};

export type DbContextType = {
  articles: DataType[];
  userArticles: DataType[];
  addArticle: (articleData: Omit<DataType, "id">) => Promise<void>;
  updateArticle: (article: DataType) => Promise<void>;
  deleteArticle: (id: string) => Promise<void>;
};

export type Params = {
  id: string;
  title: string;
  description: string;
};

export type AlertDialogDemoProps = {
  onDelete: () => void;
};

export type MainArticleProps = {
  article: DataType;
};

export type TrendingArticlesProps = {
  article: DataType[];
};

export type TinyMceEditorProps = {
  id?: string;
  value?: string;
  onChange?: (content: string) => void;
};

export interface LoadingButtonProps extends ButtonProps {
  isLoading?: boolean;
}

export interface MoreArticlesProps {
  currentArticle: DataType;
}

export interface PaginationProps {
  totalPages: number;
  currentPage: number;
  pages: number[];
  onPageChange: (page: number) => void;
}
