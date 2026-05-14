import { z } from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(2, "O nome deve ter no mínimo 2 caracteres"),

    email: z
      .string()
      .min(1, "O e-mail é obrigatório")
      .email("E-mail inválido"),

    password: z
      .string()
      .min(6, "A senha deve ter no mínimo 6 caracteres"),

    confirmPassword: z
      .string()
      .min(6, "Confirme sua senha"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export type RegisterSchema = z.infer<typeof registerSchema>;