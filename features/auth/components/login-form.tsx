"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // 1. IMPORTAR O ROUTER
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { 
  ArrowRight, BarChart3, CheckCircle2, Eye, EyeOff, 
  Smartphone, ShieldCheck, Zap, Laptop, Construction
} from "lucide-react";

import { loginAction } from "@/features/auth/actions/login-action";
import { LoginSchema, loginSchema } from "@/features/auth/schemas/login-schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function LoginForm() {
  const router = useRouter(); // 2. INICIALIZAR O ROUTER
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  const { register, handleSubmit, formState: { errors } } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginSchema) => {
    setErrorMessage("");
    startTransition(async () => {
      try {
        const response = await loginAction(data);
        
        if (!response?.success) {
          setErrorMessage(response?.message || "Credenciais inválidas.");
          return;
        }

        // 3. REDIRECIONAMENTO APÓS SUCESSO
        // Mude para o nome da pasta onde está seu formulário de assistência
        // Se a pasta for 'app/setup/page.tsx', use '/setup'
        router.push("/setup"); 
        router.refresh();

      } catch (err) {
        setErrorMessage("Ocorreu um erro inesperado. Tente novamente.");
      }
    });
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#020617] text-white">
      {/* Background Decorativo */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.15),transparent_60%)]" />
      
      <div className="relative z-10 grid min-h-screen lg:grid-cols-[1.1fr_0.9fr]">
        {/* Lado Esquerdo - Marketing Nichado */}
        <section className="hidden border-r border-white/5 lg:flex flex-col justify-between px-16 py-14">
          <div className="space-y-10">
            <div className="flex items-center gap-5">
              <div className="flex h-20 w-20 items-center justify-center rounded-[24px] border border-white/10 bg-gradient-to-br from-blue-600 to-cyan-500 shadow-2xl">
                <Smartphone className="h-10 w-10 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold tracking-tight">RepairFlow</h1>
                <p className="text-blue-400 font-medium tracking-wide uppercase text-xs">Especialista em Smartphones</p>
              </div>
            </div>

            <div className="max-w-[600px] space-y-6">
              <h2 className="text-5xl font-bold leading-tight tracking-tight">
                A gestão da sua <span className="text-blue-500 text-gradient">Bancada</span> em outro nível.
              </h2>
              <p className="text-lg text-zinc-400">
                A maior plataforma para assistências de celular. Controle estoque de telas, baterias e gerencie OS com consulta de IMEI.
              </p>
            </div>

            <div className="grid gap-4">
              {[
                { icon: Smartphone, title: "Checklist de Entrada (Touch, FaceID, Câmeras)", color: "text-blue-400" },
                { icon: Zap, title: "Gestão de Peças e Peças de Reposição", color: "text-cyan-400" },
                { icon: ShieldCheck, title: "Garantia Automática e Termos de Uso", color: "text-emerald-400" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 rounded-2xl border border-white/5 bg-white/[0.02] p-4 backdrop-blur-sm">
                  <item.icon className={`h-6 w-6 ${item.color}`} />
                  <span className="font-medium text-zinc-200">{item.title}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-white/5 pt-6 text-sm text-zinc-500">
            <span>© {new Date().getFullYear()} RepairFlow Mobile</span>
            <span className="flex items-center gap-2 text-emerald-400/80">
              <CheckCircle2 className="h-4 w-4" /> Sistema Homologado para Lojistas
            </span>
          </div>
        </section>

        {/* Lado Direito - Formulário */}
        <section className="flex items-center justify-center px-6">
          <div className="w-full max-w-md space-y-8 rounded-[32px] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-3xl shadow-2xl glass-panel">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-premium">Bem-vindo de volta</h2>
              <p className="text-zinc-400 mt-2">Acesse seu painel de reparos</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-zinc-300 ml-1">E-mail da Loja</label>
                <Input 
                  {...register("email")}
                  placeholder="contato@sualoja.com"
                  className="h-12 bg-white/5 border-white/10 focus:border-blue-500 transition-all rounded-xl text-white"
                />
                {errors.email && <p className="text-xs text-red-400 ml-1">{errors.email.message}</p>}
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-zinc-300 ml-1">Senha</label>
                  <Link href="#" className="text-xs text-blue-400 hover:underline">Esqueceu a senha?</Link>
                </div>
                <div className="relative">
                  <Input 
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
                    placeholder="••••••••"
                    className="h-12 bg-white/5 border-white/10 pr-12 focus:border-blue-500 transition-all rounded-xl text-white"
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && <p className="text-xs text-red-400 ml-1">{errors.password.message}</p>}
              </div>

              {errorMessage && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-xl text-sm animate-in fade-in zoom-in duration-300">
                  {errorMessage}
                </div>
              )}

              <Button 
                type="submit" 
                disabled={isPending}
                className="w-full h-12 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-600/20"
              >
                {isPending ? "Acessando Bancada..." : "Entrar no Sistema"}
                {!isPending && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
            </form>

            <p className="text-center text-sm text-zinc-500">
              Sua loja não é cadastrada? 
              <Link href="/register" className="text-blue-400 font-semibold hover:text-blue-300 ml-1 transition-colors">
                Criar conta agora
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}