/* eslint-disable @next/next/no-img-element */
"use client";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/db/firebaseConfig";
import { useForm, SubmitHandler } from "react-hook-form";
import { useFirebase } from "@/context/articleContext";
import { schemaArticle } from "@/schema/schema";
import { DataFormType, DataType } from "@/types/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";

export default function PageUpdateArticle() {
  const params = useParams();
  const [file, setFile] = useState<File | undefined>();
  const { updateArticle, articles } = useFirebase();
  const { user } = useAuth();
  const router = useRouter();
  const [currentImageUrl, setCurrentImageUrl] = useState<string | undefined>(
    undefined
  );
  const articleId = params?.id as string;

  const articleToUpdate = articles.find((article) => article.id === articleId);

  useEffect(() => {
    if (articleToUpdate) {
      setCurrentImageUrl(articleToUpdate.image);
    }
  }, [articleToUpdate]);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<DataFormType>({
    resolver: zodResolver(schemaArticle),
    defaultValues: articleToUpdate,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    setFile(selectedFile);
  };

  const onSubmit: SubmitHandler<DataFormType> = async (formData) => {
    try {
      let updateImageUrl = currentImageUrl;
      if (file) {
        const imageRef = ref(storage, `articlesImages/${file.name}`);
        await uploadBytes(imageRef, file);
        updateImageUrl = await getDownloadURL(imageRef);
      }
      const updatedArticle: DataType = {
        id: articleId,
        title: formData.title,
        description: formData.description,
        image: updateImageUrl as string,
        authorName: user?.displayName as string,
        authorId: user?.uid as string,
        createdAt: new Date(),
      };

      updateArticle(updatedArticle);
      router.push("/dashboard");
    } catch (error) {
      console.error("article edit error", error);
    }
  };
  return (
    <Card>
      <CardContent className="p-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-4"
        >
          <Label htmlFor="title">Title</Label>
          <Input {...register("title")} id="title" />
          {errors.title && (
            <span className="text-red-500 text-sm">{errors.title.message}</span>
          )}
          <Label htmlFor="description">Description</Label>
          <Textarea
            {...register("description")}
            id="description"
            className="min-h-72"
          />
          {errors.description && (
            <span className="text-red-500 text-sm">
              {errors.description.message}
            </span>
          )}
          <Label htmlFor="image">Image</Label>
          <Input
            type="file"
            accept="image/gif, image/jpeg, image/png, image/webp"
            onChange={handleChange}
            id="image"
            className="cursor-pointer"
          />
          {currentImageUrl && (
            <img
              className="w-full object-cover h-[500px] rounded-lg"
              src={currentImageUrl}
              alt={currentImageUrl}
            />
          )}

          <div className="flex items-center justify-between">
            <Link href="/dashboard">
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </Link>
            <Button type="submit">Edit</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
