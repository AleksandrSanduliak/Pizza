import { MainProductSchema } from '@/5-shared/api/schemas/product.schema';
import z from 'zod';

export const GetGlobalCategorySchema = z.object({
  category: z.string(),
  categoryTitle: z.string(),
  products: z.array(MainProductSchema),
});

export type GetGlobalCategory = z.infer<typeof GetGlobalCategorySchema>;
