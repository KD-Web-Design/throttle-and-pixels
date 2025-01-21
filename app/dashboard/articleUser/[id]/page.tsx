/* eslint-disable @next/next/no-img-element */
"use client";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/db/firebaseConfig";
import { useForm, SubmitHandler } from "react-hook-form";
import { useFirebase } from "@/context/articleContext";
import { schemaArticle } from "@/schema/schema";
import { DataFormType, DataType } from "@/types/types";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import TinyMceEditor from "@/app/dashboard/createArticle/components/TinyMceEditor";
import LoadingButton from "@/components/LoadingButton";
import { useLocalStorage } from "usehooks-ts";
import { Timestamp } from "firebase/firestore";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

export default function PageUpdateArticle() {
  const params = useParams();
  const [file, setFile] = useState<File | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { updateArticle, articles } = useFirebase();
  const { user } = useAuth();
  const router = useRouter();
  const [currentImageUrl, setCurrentImageUrl] = useState<string | undefined>(
    undefined
  );
  const articleId = params?.id as string;

  // Trouver l'article à mettre à jour
  const articleToUpdate = articles.find((article) => article.id === articleId);

  // Gestion du localStorage pour le formulaire
  const [formData, setFormData] = useLocalStorage<DataFormType>(
    `article-form-${articleId}`,
    {
      title: articleToUpdate?.title || "",
      description: articleToUpdate?.description || "",
      category: articleToUpdate?.category || "",
    }
  );

  const {
    handleSubmit,
    register,
    setValue,
    watch,
    formState: { errors },
  } = useForm<DataFormType>({
    resolver: zodResolver(schemaArticle),
    defaultValues: formData,
  });

  // Synchroniser les valeurs de l'article existant dans le formulaire
  useEffect(() => {
    if (articleToUpdate) {
      setValue("title", formData.title || articleToUpdate.title);
      setValue(
        "description",
        formData.description || articleToUpdate.description
      );
      setValue("category", formData.category || articleToUpdate.category);

      setCurrentImageUrl(articleToUpdate.image);
    }
  }, [articleToUpdate, formData, setValue]);

  // Sauvegarder les modifications du titre dans le localStorage
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData((prev) => ({ ...prev, title }));
    setValue("title", title);
  };

  // Sauvegarder les modifications de la description dans le localStorage
  const handleDescriptionChange = (content: string) => {
    setFormData((prev) => ({ ...prev, description: content }));
    setValue("description", content);
  };

  // Sauvegarder les modifications de la catégorie dans le localStorage
  const handleCategoryChange = (value: string) => {
    setFormData((prev) => ({ ...prev, category: value }));
    setValue("category", value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    setFile(selectedFile);
  };

  const onSubmit: SubmitHandler<DataFormType> = async (formData) => {
    setIsSubmitting(true);
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
        category: formData.category,
        image: updateImageUrl as string,
        authorName: user?.displayName as string,
        authorId: user?.uid as string,
        createdAt: Timestamp.now(),
      };

      await updateArticle(updatedArticle);

      // Réinitialiser le formulaire après soumission
      setFormData({ title: "", description: "", category: "" });
      router.push("/dashboard");
      toast({
        title: "Success ✅",
        description: "Article updated !",
      });
    } catch (error) {
      console.error("article edit error", error);
    } finally {
      setIsSubmitting(false);
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
          <Input
            {...register("title")}
            id="title"
            value={watch("title")}
            onChange={handleTitleChange}
          />
          {errors.title && (
            <span className="text-red-500 text-sm">{errors.title.message}</span>
          )}

          <Label htmlFor="description">Description</Label>
          <TinyMceEditor
            id="description"
            value={watch("description")}
            onChange={handleDescriptionChange}
          />
          {errors.description && (
            <span className="text-red-500 text-sm">
              {errors.description.message}
            </span>
          )}

          <div className="inline-flex gap-2 items-center">
            <Select
              onValueChange={handleCategoryChange}
              value={watch("category")}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Choose a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Categories</SelectLabel>
                  <SelectItem value="games">Games</SelectItem>
                  <SelectItem value="guides">Guides</SelectItem>
                  <SelectItem value="hardware">Hardware</SelectItem>
                  <SelectItem value="misc">Misc</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.category && (
              <span className="text-red-500 text-sm">
                {errors.category.message}
              </span>
            )}
          </div>

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
            <LoadingButton type="submit" isLoading={isSubmitting}>
              Edit
            </LoadingButton>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
