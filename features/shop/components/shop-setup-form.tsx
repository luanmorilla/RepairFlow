"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Smartphone, Upload, Shield, Store, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function ShopSetupForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  // Simulação de upload de imagem
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setLogoPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      // Aqui entrará a sua Action para salvar no banco de dados futuramente
      await new Promise((resolve) => setTimeout(resolve, 1500));
      router.push("/dashboard");
    });
  };

  return (
    <main className="relative min-h-screen bg-[#020617] text-white flex items-center justify-center p-6 overflow-hidden">
      {/* Background Decorativo igual ao Registro */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08),transparent_70%)]" />
      
      <div className="w-full max-w-2xl relative z-10 glass-panel p-8 md:p-12 rounded-[40px] shadow-2xl border border-white/10 bg-white/[0.02] backdrop-blur-3xl">
        
        <div className="flex items-center gap-4 mb-10">
          <div className="h-12 w-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
            <Store className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-premium">Configuração da Assistência</h1>
            <p className="text-zinc-400 text-sm">Personalize os dados que aparecerão nos seus PDFs de O.S.</p>
          </div>
        </div>

        <form onSubmit={onSubmit} className="space-y-8">
          
          {/* Seção de Logo */}
          <div className="flex flex-col md:flex-row items-center gap-8 p-6 rounded-3xl bg-white/[0.03] border border-white/5">
            <div className="relative group">
              <div className="w-32 h-32 rounded-2xl border-2 border-dashed border-white/20 flex items-center justify-center overflow-hidden bg-black/20 group-hover:border-blue-500/50 transition-colors">
                {logoPreview ? (
                  <img src={logoPreview} alt="Logo preview" className="w-full h-full object-contain" />
                ) : (
                  <Upload className="text-zinc-500 group-hover:text-blue-400 transition-colors" size={32} />
                )}
              </div>
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleLogoChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="font-semibold text-zinc-200">Logotipo da Empresa</h3>
              <p className="text-xs text-zinc-500 mt-1 mb-4">Recomendado: PNG ou JPG de alta resolução.</p>
              <label className="cursor-pointer bg-white/5 hover:bg-white/10 px-4 py-2 rounded-lg text-sm border border-white/10 transition-all">
                Selecionar Imagem
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nome da Loja */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-500 uppercase tracking-widest ml-1">Nome Comercial</label>
              <div className="relative">
                <Store className="absolute left-4 top-3.5 text-zinc-500" size={18} />
                <Input 
                  placeholder="Ex: Apple Tech Brasil" 
                  className="h-12 bg-white/5 border-white/10 rounded-xl pl-12 focus:border-blue-500 transition-all"
                  required
                />
              </div>
            </div>

            {/* Tempo de Garantia */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-500 uppercase tracking-widest ml-1">Garantia Padrão</label>
              <div className="relative">
                <Shield className="absolute left-4 top-3.5 text-zinc-500" size={18} />
                <select className="w-full h-12 bg-[#0f172a] border border-white/10 rounded-xl pl-12 pr-4 text-zinc-300 focus:border-blue-500 transition-all appearance-none cursor-pointer">
                  <option value="30">30 dias (1 mês)</option>
                  <option value="90" selected>90 dias (3 meses - Legal)</option>
                  <option value="180">180 dias (6 meses)</option>
                  <option value="365">365 dias (1 ano)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Informativo sobre PDF */}
          <div className="flex items-start gap-3 p-4 rounded-2xl bg-blue-500/5 border border-blue-500/10 text-blue-300/80 text-sm">
            <CheckCircle2 size={18} className="mt-0.5 flex-shrink-0" />
            <p>Essas informações serão aplicadas automaticamente no cabeçalho e rodapé de todas as suas Ordens de Serviço geradas em PDF.</p>
          </div>

          <Button 
            type="submit" 
            disabled={isPending}
            className="w-full h-14 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl shadow-lg shadow-blue-600/20 transition-all"
          >
            {isPending ? "Salvando Configurações..." : "Concluir e Ir para o Dashboard"}
            {!isPending && <ArrowRight className="ml-2 h-5 w-5" />}
          </Button>

        </form>
      </div>
    </main>
  );
}