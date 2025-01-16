import { ButtonProps } from "@/components/ui/button";
import { Timestamp } from "firebase/firestore";

export type DataType = {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  authorName: string;
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

export interface AuthorData {
  photoURL: string;
  displayName: string;
  createdAt: Timestamp;
}
