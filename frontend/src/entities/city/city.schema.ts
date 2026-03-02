import z from 'zod';

const variantSchema = z.object({
  desc: z.string(),
  globalProductId: z.number(),
  globalProductVariant: z.object({
    id: z.number(),
    title: z.string(),
    desc: z.string(),
    imageUrl: z.string(),
    size: z.string(),
  }),
  globalProductVariantId: z.number(),
  id: z.number(),
  imageUrl: z.string(),
  localProductId: z.number(),
  nutritionFactsId: z.number(),
  price: z.number(),
  size: z.string(),
  sizeName: z.string(),
  title: z.string(),
  variationId: z.string(),
});

const productSchema = z.object({
  caption: z.string(),
  category: z.string(),
  desc: z.string(),
  id: z.number(),
  imageUrl: z.string(),
  order: z.number(),
  title: z.string(),
  variants: z.array(variantSchema).optional(),
});

export const categoriesSchema = z.object({
  category: z.string(),
  categoryTitle: z.string(),
  cityId: z.number(),
  id: z.number(),
  products: z.array(productSchema),
});

export const citySchema = z.object({
  // categories: z.array(categoriesSchema),
  city: z.string(),
  id: z.number(),
  isActive: z.boolean(),
  name: z.string(),
  restaurants: z.array(z.string()).optional(),
  url: z.string(),
});

export type CityInfo = z.infer<typeof citySchema>;
export type Categories = z.infer<typeof categoriesSchema>;
