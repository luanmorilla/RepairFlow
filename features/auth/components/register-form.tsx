"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Smartphone, ShieldCheck, Wrench, CheckCircle2 } from "lucide-react";

import { registerAction } from "@/features/auth/actions/register-action";
import { RegisterSchema, registerSchema } from "@/features/auth/schemas/register-schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterSchema) => {
    setSuccessMessage("");
    setErrorMessage("");

    startTransition(async () => {
      const response = await registerAction(data);

      if (!response.success) {
        setErrorMessage(response.message || "Erro ao criar conta da loja.");
        return;
      }

      reset();
      setSuccessMessage("Loja cadastrada com sucesso! Redirecionando...");
      setTimeout(() => window.location.href = "/login", 2000);
    });
  };

  return (
    <main className="relative min-h-screen bg-[#020617] text-white flex items-center justify-center p-6 overflow-hidden">
      {/* Background Decorativo */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(59,130,246,0.1),transparent_70%)]" />
      
      <div className="w-full max-w-lg relative z-10 glass-panel p-10 rounded-[40px] shadow-2xl border border-white/10 bg-white/[0.02] backdrop-blur-2xl">
        <div className="text-center mb-8 space-y-2">
          <div className="mx-auto w-20 h-20 bg-gradient-to-tr from-blue-600 to-cyan-500 rounded-3xl flex items-center justify-center mb-6 shadow-xl shadow-blue-500/20 rotate-3">
            <Smartphone className="text-white" size={40} />
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-premium">Abra sua Loja</h2>
          <p className="text-zinc-400">
            A ferramenta número #1 para técnicos de smartphone. Organize sua bancada hoje.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <InputGroup label="Nome da Loja ou Técnico" error={errors.name?.message}>
            <Input 
              {...register("name")} 
              placeholder="Ex: iPhone Repair Center" 
              className="h-12 bg-white/5 border-white/10 rounded-xl focus:border-blue-500 transition-all" 
            />
          </InputGroup>

          <InputGroup label="E-mail Profissional" error={errors.email?.message}>
            <Input 
              {...register("email")} 
              placeholder="contato@sualoja.com" 
              className="h-12 bg-white/5 border-white/10 rounded-xl focus:border-blue-500 transition-all" 
            />
          </InputGroup>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputGroup label="Senha" error={errors.password?.message}>
              <div className="relative">
                <Input 
                  type={showPassword ? "text" : "password"} 
                  {...register("password")} 
                  className="h-12 bg-white/5 border-white/10 rounded-xl pr-10 focus:border-blue-500 transition-all" 
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3.5 text-zinc-500 hover:text-white transition-colors">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </InputGroup>

            <InputGroup label="Confirmar Senha" error={errors.confirmPassword?.message}>
              <Input 
                type="password" 
                {...register("confirmPassword")} 
                className="h-12 bg-white/5 border-white/10 rounded-xl focus:border-blue-500 transition-all" 
              />
            </InputGroup>
          </div>

          {(errorMessage || successMessage) && (
            <div className={`p-4 rounded-xl text-sm border animate-in fade-in slide-in-from-top-2 duration-300 ${errorMessage ? 'bg-red-500/10 border-red-500/20 text-red-400' : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'}`}>
              <div className="flex items-center gap-2">
                {successMessage ? <CheckCircle2 size={16} /> : <ShieldCheck size={16} />}
                {errorMessage || successMessage}
              </div>
            </div>
          )}

          <Button 
            type="submit" 
            disabled={isPending} 
            className="w-full h-14 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl mt-4 shadow-lg shadow-blue-600/20 transition-all active:scale-95"
          >
            {isPending ? "Configurando sua Loja..." : "Finalizar Cadastro Profissional"}
          </Button>
        </form>

        <p className="text-center mt-8 text-sm text-zinc-500">
          Já faz parte do RepairFlow? <Link href="/login" className="text-blue-400 font-semibold hover:underline">Fazer login</Link>
        </p>
      </div>
    </main>
  );
}

function InputGroup({ label, error, children }: { label: string, error?: string, children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-semibold text-zinc-500 uppercase tracking-widest ml-1">{label}</label>
      {children}
      {error && <p className="text-xs text-red-400 ml-1 animate-pulse">{error}</p>}
    </div>
  );
}