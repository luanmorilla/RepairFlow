"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

interface LoginActionParams {
  email: string;
  password: string;
}

export async function loginAction({ email, password }: LoginActionParams) {
  try {
    const supabase = await createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return {
        success: false,
        message: "E-mail ou senha inválidos.",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: "Erro de conexão com o servidor.",
    };
  }

  // O redirect deve ficar fora do try/catch para funcionar corretamente no Next.js
  redirect("/dashboard");
}