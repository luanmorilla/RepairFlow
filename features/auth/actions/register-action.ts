"use server";

import { createClient } from "@/lib/supabase/server";

interface RegisterActionParams {
  name: string;
  email: string;
  password: string;
}

export async function registerAction({
  name,
  email,
  password,
}: RegisterActionParams) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
      },
    },
  });

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  return {
    success: true,
  };
}