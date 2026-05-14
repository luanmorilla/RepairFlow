"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { 
  Store, 
  MapPin, 
  Phone, 
  ArrowRight, 
  Loader2,
  Upload,
  ShieldCheck,
  X
} from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const setupSchema = z.object({
  shopName: z.string().min(3, "O nome da loja deve ter pelo menos 3 caracteres"),
  address: z.string().min(5, "Endereço completo é obrigatório"),
  phone: z.string().min(10, "Telefone inválido"),
  warrantyTime: z.string().min(1, "Defina o tempo de garantia padrão"),
});

type SetupFormValues = z.infer<typeof setupSchema>;

export default function SetupPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<SetupFormValues>({
    resolver: zodResolver(setupSchema),
    defaultValues: { shopName: "", address: "", phone: "", warrantyTime: "90 dias" }
  });

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setLogoPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: SetupFormValues) => {
    setIsLoading(true);
    try {
      console.log("Dados enviados:", { ...data, logo: logoPreview });
      await new Promise((resolve) => setTimeout(resolve, 2000));
      router.push("/dashboard/inventory");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 bg-[#020617] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full" />
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative w-full max-w-2xl z-10">
        <div className="glass-panel p-6 md:p-10 rounded-[32px] border border-white/10 bg-white/[0.02] backdrop-blur-3xl shadow-2xl">
          
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white tracking-tight">Configure sua <span className="text-blue-500">Bancada</span></h1>
            <p className="text-zinc-400 mt-2">Personalize suas Ordens de Serviço</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Upload de Logotipo */}
            <div className="flex flex-col items-center justify-center mb-6">
              <label className="text-sm font-medium text-zinc-300 mb-3">Logotipo da Assistência</label>
              <div className="relative group">
                <div className="h-24 w-24 rounded-2xl border-2 border-dashed border-white/10 bg-white/5 flex items-center justify-center overflow-hidden transition-all group-hover:border-blue-500/50">
                  {logoPreview ? (
                    <>
                      <img src={logoPreview} alt="Logo" className="h-full w-full object-cover" />
                      <button 
                        type="button" 
                        onClick={() => setLogoPreview(null)}
                        className="absolute top-1 right-1 bg-red-500 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={12} />
                      </button>
                    </>
                  ) : (
                    <Upload className="h-8 w-8 text-zinc-500 group-hover:text-blue-400 transition-colors" />
                  )}
                </div>
                <input type="file" accept="image/*" onChange={handleLogoChange} className="absolute inset-0 opacity-0 cursor-pointer" title="Upar logo" />
              </div>
              <p className="text-[10px] text-zinc-500 mt-2 uppercase tracking-widest">PNG ou JPG até 2MB</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300 flex items-center gap-2 italic"><Store size={14} className="text-blue-400" /> Nome da Loja</label>
                <Input {...register("shopName")} placeholder="Ex: iPhone Master" className="bg-white/5 border-white/10 h-12 rounded-xl text-white" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300 flex items-center gap-2 italic"><ShieldCheck size={14} className="text-blue-400" /> Garantia Padrão</label>
                <select 
                  {...register("warrantyTime")}
                  className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
                >
                  <option className="bg-[#0f172a]" value="30 dias">30 dias</option>
                  <option className="bg-[#0f172a]" value="90 dias">90 dias (Recomendado)</option>
                  <option className="bg-[#0f172a]" value="180 dias">180 dias</option>
                  <option className="bg-[#0f172a]" value="1 ano">1 ano</option>
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300 flex items-center gap-2 italic"><Phone size={14} className="text-blue-400" /> WhatsApp</label>
                <Input {...register("phone")} placeholder="(00) 00000-0000" className="bg-white/5 border-white/10 h-12 rounded-xl text-white" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300 flex items-center gap-2 italic"><MapPin size={14} className="text-blue-400" /> Endereço</label>
                <Input {...register("address")} placeholder="Cidade - UF" className="bg-white/5 border-white/10 h-12 rounded-xl text-white" />
              </div>
            </div>

            <Button type="submit" disabled={isLoading} className="w-full h-14 bg-blue-600 hover:bg-blue-500 text-white text-lg font-bold rounded-2xl transition-all shadow-xl shadow-blue-600/20 gap-3">
              {isLoading ? <><Loader2 className="h-5 w-5 animate-spin" /> Salvando...</> : <>Concluir Configuração <ArrowRight size={20} /></>}
            </Button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}