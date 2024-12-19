import {z} from 'zod';

export const schemaArticle = z.object({
    title: z.string().nonempty("Title is required"),
    description: z.string().nonempty("Description is required"),
    image: z.string()
})