"use client";

import { 
  Plus, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  TrendingUp, 
  Smartphone,
  Search,
  Filter
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

// Simulando os dados que virão do seu banco de dados no futuro
const stats = [
  { label: "Na Bancada", value: "0", icon: Clock, color: "text-amber-400", bg: "bg-amber-400/10", border: "border-amber-400/20" },
  { label: "Prontos (Retirada)", value: "0", icon: CheckCircle2, color: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/20" },
  { label: "Aguardando Peça", value: "0", icon: AlertCircle, color: "text-blue-400", bg: "bg-blue-400/10", border: "border-blue-400/20" },
  { label: "Faturamento Mês", value: "R$ 0,00", icon: TrendingUp, color: "text-purple-400", bg: "bg-purple-400/10", border: "border-purple-400/20" },
];

export default function InventoryPage() {
  return (
    <div className="p-4 md:p-8 space-y-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight italic">Visão Geral</h1>
          <p className="text-zinc-500 mt-1">Acompanhe os reparos da sua assistência</p>
        </div>
        
        <Button className="bg-blue-600 hover:bg-blue-500 text-white px-6 h-12 rounded-xl shadow-lg shadow-blue-600/20 gap-2 transition-all active:scale-95 font-bold">
          <Plus size={20} />
          Nova Ordem de Serviço
        </Button>
      </header>

      {/* Grid de Stats (Zerados) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`glass-panel p-6 rounded-2xl border ${stat.border} bg-white/[0.02] backdrop-blur-xl relative overflow-hidden group`}
          >
            {/* Ícone de fundo com brilho sutil */}
            <div className={`absolute -right-2 -bottom-2 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity`}>
              <stat.icon size={100} />
            </div>
            
            <div className="flex items-center gap-4 mb-4">
              <div className={`p-2.5 rounded-xl ${stat.bg} ${stat.color}`}>
                <stat.icon size={20} />
              </div>
              <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-[0.15em]">{stat.label}</span>
            </div>
            
            <div className="text-4xl font-black text-white tracking-tight">
              {stat.value}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Seção de Tabela/Atividades */}
      <section className="glass-panel rounded-[2rem] border border-white/10 bg-white/[0.02] backdrop-blur-3xl overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.01]">
          <h2 className="text-lg font-bold text-white flex items-center gap-3">
            <div className="h-8 w-1 bg-blue-500 rounded-full" />
            Atividades na Bancada
          </h2>
          <div className="flex gap-2">
             <button className="p-2 hover:bg-white/5 rounded-lg text-zinc-500 transition-colors"><Search size={18}/></button>
             <button className="p-2 hover:bg-white/5 rounded-lg text-zinc-500 transition-colors"><Filter size={18}/></button>
          </div>
        </div>

        {/* Estado Vazio - Limpo e Moderno */}
        <div className="py-24 flex flex-col items-center justify-center text-center px-4">
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full" />
            <div className="relative h-24 w-24 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center border border-white/10 shadow-inner">
              <Smartphone className="h-12 w-12 text-zinc-600" />
            </div>
          </div>
          
          <h3 className="text-xl font-bold text-zinc-200 mb-2">Sua bancada está livre</h3>
          <p className="text-zinc-500 text-sm max-w-[280px] leading-relaxed">
            Nenhum aparelho em manutenção no momento. Clique no botão acima para abrir uma O.S.
          </p>
          
          <Button variant="ghost" className="mt-8 text-blue-400 hover:text-blue-300 hover:bg-blue-400/5 font-semibold">
            Ver histórico de ordens finalizadas
          </Button>
        </div>
      </section>

    </div>
  );
}