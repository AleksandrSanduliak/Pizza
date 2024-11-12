import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().trim().email({
    message: 'Почта должна соответствовать виду - name@domen.com',
  }),
  password: z
    .string()
    .trim()
    .min(6, { message: 'Пароль должен быть 6 или более символов' })
    .max(38, { message: 'Пароль должен быть менее 38 символов' }),
});

export type TFormLogin = z.infer<typeof loginSchema>;
