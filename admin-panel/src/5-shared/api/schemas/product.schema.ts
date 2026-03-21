import z from 'zod';

export const MainProductSchema = z.object({
  id: z.number(),
  category: z.string(),
  title: z.string(),
  desc: z.string(),
  imageUrl: z.httpUrl(),
  caption: z.string(),
});

export type MainProduct = z.infer<typeof MainProductSchema>;
