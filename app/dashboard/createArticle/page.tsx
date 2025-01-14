/* eslint-disable @next/next/no-img-element */
"use client";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/db/firebaseConfig";
import { useForm, SubmitHandler } from "react-hook-form";
import { useFirebase } from "@/context/articleContext";
import { schemaArticle } from "@/schema/schema";
import { DataFormType } from "@/types/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useAuth from "@/hooks/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import TinyMceEditor from "@/components/TinyMceEditor";
import LoadingButton from "@/components/LoadingButton";
import { Timestamp } from "firebase/firestore";

export default function PageCreateArticle() {
  const [file, setFile] = useState<File | undefined>();
  const [imagePreview, setImagePreview] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addArticle } = useFirebase();
  const { user } = useAuth();
  const router = useRouter();

  const {
    handleSubmit,
    register,
    setValue,
    watch,
    formState: { errors },
  } = useForm<DataFormType>({
    resolver: zodResolver(schemaArticle),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    setFile(selectedFile);

    if (selectedFile) {
      const imageUrl = URL.createObjectURL(selectedFile);
      setImagePreview(imageUrl);
    }
  };

  const onSubmit: SubmitHandler<DataFormType> = async (formData) => {
    setIsSubmitting(true);
    try {
      let imageUrl = "";
      if (file) {
        const imageRef = ref(storage, `articlesImages/${file.name}`);
        await uploadBytes(imageRef, file);
        imageUrl = await getDownloadURL(imageRef);
      }

      await addArticle({
        ...formData,
        image: imageUrl,
        authorName: user?.displayName as string,
        authorId: user?.uid as string,
        createdAt: Timestamp.now(),
      });
      setImagePreview(undefined);
      router.push("/dashboard");
    } catch (error) {
      console.error("form submit error", error);
    }
  };

  const handleClick = () => {
    setIsLoading(true);
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
          <TinyMceEditor
            id="description"
            value={watch("description")}
            onChange={(content) => {
              setValue("description", content);
            }}
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
          {imagePreview && (
            <img
              className="w-full object-cover h-[500px] rounded-lg"
              src={imagePreview}
              alt={imagePreview}
            />
          )}

          <div className="flex items-center justify-between">
            <Link href="/dashboard">
              <LoadingButton
                onClick={handleClick}
                isLoading={isLoading}
                variant="outline"
              >
                Cancel
              </LoadingButton>
            </Link>
            <LoadingButton type="submit" isLoading={isSubmitting}>
              Submit
            </LoadingButton>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
