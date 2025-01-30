import { z } from "zod";

export const schemaArticle = z.object({
  title: z.string().nonempty("Title is required"),
  description: z.string().nonempty("Description is required"),
  category: z.string().nonempty("Category is required"),
  image: z.string().url("Invalid image URL").nonempty("Image is required"),
});
