import { z, ZodType } from "zod";
import { FormLogin } from "../types/types";
export const loginSchema: ZodType<FormLogin> = z.object({
  email: z.string().trim().email({
    message: "Почта должна соответствовать виду - emailname@mail.com",
  }),
  password: z
    .string()
    .trim()
    .min(6, { message: "Пароль должен быть 6 или более символов" })
    .max(38, { message: "Пароль должен быть менее 38 символов в пароле" }),
});
