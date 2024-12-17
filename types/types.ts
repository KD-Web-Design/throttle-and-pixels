export type DataType = {
    id: string;
    title: string;
    description: string;
    image: string;
    authorName: string;
    authorId: string;
    createdAt: Date;
}

export type DataFormType = {
    title: string;
    description: string;
    image?: string;
}

export type DbContextType = {
    articles: DataType[];
    addArticle: (articleData: Omit<DataType, "id">) => Promise<void>;
    updateArticle: (article: DataType) => Promise<void>;
    deleteArticle: (id: string) => Promise<void>;
}