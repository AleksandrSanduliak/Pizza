import z from 'zod';

export const cityItemSchema = z.object({
  city: z.string(),
  name: z.string(),
  url: z.string(),
});

export const cityListSchema = z.array(cityItemSchema);
export type CityItem = z.infer<typeof cityItemSchema>;
export type CityList = z.infer<typeof cityListSchema>;
