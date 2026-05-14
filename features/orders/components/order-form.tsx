"use client";

import { useState } from "react";
import { Smartphone, User, ClipboardCheck, Camera, Wrench, Shield, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function OrderForm() {
  const [checklist, setChecklist] = useState({
    power: false,
    touch: false,
    cameras: false,
    faceId: false,
    charging: false,
  });

  const toggleCheck = (item: keyof typeof checklist) => {
    setChecklist(prev => ({ ...prev, [item]: !prev[item] }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="h-10 w-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
          <ClipboardCheck className="text-white" size={22} />
        </div>
        <h1 className="text-2xl font-bold text-white">Nova Ordem de Serviço</h1>
      </div>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* CLIENTE E APARELHO */}
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-[32px] border border-white/5 bg-white/[0.02] space-y-4">
            <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-2">
              <User size={16} /> Dados do Cliente
            </h3>
            <Input placeholder="Nome completo do cliente" className="bg-white/5 border-white/10 h-12 rounded-xl" />
            <Input placeholder="WhatsApp / Telefone" className="bg-white/5 border-white/10 h-12 rounded-xl" />
          </div>

          <div className="glass-panel p-6 rounded-[32px] border border-white/5 bg-white/[0.02] space-y-4">
            <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-2">
              <Smartphone size={16} /> Equipamento
            </h3>
            <Input placeholder="Modelo (Ex: iPhone 13 Pro Max)" className="bg-white/5 border-white/10 h-12 rounded-xl" />
            <Input placeholder="IMEI ou Número de Série" className="bg-white/5 border-white/10 h-12 rounded-xl" />
            <textarea 
              placeholder="Relato do cliente (Defeito)" 
              className="w-full bg-white/5 border border-white/10 rounded-xl p-4 h-32 text-sm focus:border-blue-500 outline-none transition-all"
            />
          </div>
        </div>

        {/* CHECKLIST E TÉCNICO */}
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-[32px] border border-white/5 bg-white/[0.02]">
            <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-2 mb-6">
              <Wrench size={16} /> Checklist de Entrada
            </h3>
            
            <div className="grid grid-cols-1 gap-3">
              {[
                { id: 'power', label: 'Aparelho Liga?' },
                { id: 'touch', label: 'Touchscreen OK?' },
                { id: 'cameras', label: 'Câmeras OK?' },
                { id: 'faceId', label: 'Face ID / Biometria OK?' },
                { id: 'charging', label: 'Carregamento OK?' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => toggleCheck(item.id as keyof typeof checklist)}
                  className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
                    checklist[item.id as keyof typeof checklist] 
                    ? "bg-blue-600/20 border-blue-600/50 text-blue-400" 
                    : "bg-white/5 border-white/10 text-zinc-500"
                  }`}
                >
                  <span className="text-sm font-medium">{item.label}</span>
                  <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${
                    checklist[item.id as keyof typeof checklist] ? "border-blue-400 bg-blue-400" : "border-zinc-700"
                  }`}>
                    {checklist[item.id as keyof typeof checklist] && <div className="h-2 w-2 bg-white rounded-full" />}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="glass-panel p-6 rounded-[32px] border border-white/5 bg-white/[0.02] space-y-4">
            <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-2">
              <Shield size={16} /> Orçamento Inicial
            </h3>
            <div className="relative">
              <span className="absolute left-4 top-3 text-zinc-500 font-bold">R$</span>
              <Input placeholder="0,00" className="bg-white/5 border-white/10 h-12 rounded-xl pl-12 text-blue-400 font-bold text-lg" />
            </div>
            <Button className="w-full h-14 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl shadow-lg shadow-blue-600/20">
              <Save className="mr-2 h-5 w-5" /> Gerar O.S. e Salvar
            </Button>
          </div>
        </div>

      </form>
    </div>
  );
}