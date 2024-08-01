import { FormRegister, orderForm } from "../types/types";
import { z, ZodType } from "zod";

export const orderSchema: ZodType<orderForm> = z.object({
  name: z
    .string()
    .trim()
    .min(4, { message: "Имя должно быть 4 или более символов" })
    .max(14, { message: "Имя должно быть менее 14 символов" }),
  phone: z
    .string()
    .trim()
    .regex(
      /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
      "Номер телефона должен соответствовать виду - +7-123-456-78-99"
    ),
  email: z
    .string()
    .trim()
    .email({
      message: "Почта должна соответствовать виду - emailname@mail.com",
    })
    .optional(),
  deliveryType: z.string({ required_error: "Message is required" }),
  street: z.string().trim().min(1, { message: "Введите улицу" }),
  house: z.string().trim().optional(),
  entrance: z.union([z.number().int().positive().min(1), z.nan()]).optional(),
  floor: z.union([z.number().int().positive().min(1), z.nan()]).optional(),
  apartment: z.union([z.number().int().positive().min(1), z.nan()]).optional(),
  intercom: z.string().optional().optional(),
  payment: z.string().optional(),
  shortChange: z.string().optional(),
});
