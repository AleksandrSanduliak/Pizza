import z from 'zod';

export const userDataSchema = z.object({
  email: z.string(),
  name: z.string(),
  bonuses: z.number(),
  tokens: z.object({
    accessToken: z.string(),
    refreshToken: z.string(),
  }),
});

export type UserData = z.infer<typeof userDataSchema>;
