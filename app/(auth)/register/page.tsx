import { Metadata } from "next";
import { RegisterForm } from "@/features/auth/components/register-form";

// Metadados para SEO e Profissionalismo (importante para SaaS)
export const metadata: Metadata = {
  title: "Crie sua conta | RepairFlow",
  description: "Gerencie sua assistência técnica com precisão e escala profissional.",
};

export default function RegisterPage() {
  return (
    /**
     * Removemos toda a estrutura de <div> e <main> repetida aqui.
     * O RegisterForm que te passei já contém:
     * 1. O Background com radial-gradient e noise.
     * 2. O Header com ícone de Wrench (chave) e textos.
     * 3. A estrutura centralizada e responsiva.
     */
    <RegisterForm />
  );
}