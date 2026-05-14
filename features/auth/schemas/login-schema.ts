import { z } from "zod";

/**
 * Schema de Login Otimizado
 * - trim(): Remove espaços vazios antes e depois (comum ao copiar/colar)
 * - toLowerCase(): Garante que o e-mail seja sempre tratado em minúsculo
 */
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Por favor, informe seu e-mail.")
    .email("O formato do e-mail parece estar incorreto.")
    .trim()
    .toLowerCase(),

  password: z
    .string()
    .min(1, "A senha é obrigatória.")
    .min(6, "A senha deve ter pelo menos 6 caracteres para sua segurança."),
});

// Tipagem para uso no formulário e no Server Action
export type LoginSchema = z.infer<typeof loginSchema>;