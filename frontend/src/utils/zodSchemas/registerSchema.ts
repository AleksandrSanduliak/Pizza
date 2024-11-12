import { z, ZodType } from 'zod';

export const registerSchema: ZodType = z
  .object({
    name: z
      .string()
      .trim()
      .min(4, { message: 'Имя должно быть 4 или более символов' })
      .max(14, { message: 'Имя должно быть менее 14 символов' }),
    email: z.string().trim().email({
      message: 'Почта должна соответствовать виду - emailname@mail.com',
    }),
    phone: z
      .string()
      .trim()
      .regex(
        /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
        'Номер телефона должен соответствовать виду - +7-123-456-78-99',
      ),
    dateBrith: z.string().optional(),
    password: z
      .string()
      .trim()
      .min(8, { message: 'Пароль должен быть более 8 символов' }),
    confirmPassword: z
      .string()
      .trim()
      .min(8, { message: 'Пароль должен быть более 8 символов' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Введенные пароли не соответствуют',
    path: ['confirmPassword'],
  });

export type TFormRegister = z.infer<typeof registerSchema>;
