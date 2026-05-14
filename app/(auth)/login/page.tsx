import { Metadata } from "next";
import { LoginForm } from "@/features/auth/components/login-form";

export const metadata: Metadata = {
  title: "Login | RepairFlow",
  description: "Acesse sua central de gestão técnica RepairFlow.",
};

export default function LoginPage() {
  return (
    /* 
       Não adicionamos Divs de container aqui. 
       O LoginForm já possui a estrutura de tela cheia (grid).
    */
    <LoginForm />
  );
}