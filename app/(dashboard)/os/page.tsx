"use client";

import { useState, useEffect } from "react";
import { 
  Smartphone, User, Zap, CheckCircle2, DollarSign, ClipboardList, Info
} from "lucide-react";

export default function NovaOS() {
  const [custoPeca, setCustoPeca] = useState<number>(0);
  const [dificuldade, setDificuldade] = useState<number>(1.5); // 150%
  const [modelo, setModelo] = useState("");
  const [orcamentoFinal, setOrcamentoFinal] = useState(0);

  // LÓGICA DE PRECIFICAÇÃO AUTOMÁTICA
  useEffect(() => {
    if (custoPeca <= 0) {
      setOrcamentoFinal(0);
      return;
    }

    // 1. Multiplicador de Dificuldade (150%, 200% ou 250%)
    let resultado = custoPeca * dificuldade;

    // 2. Inteligência de Marca (Apple Tax)
    const eApple = modelo.toLowerCase().includes("iphone");
    if (eApple) {
      resultado *= 1.20; // +20% de margem de segurança para iPhones
    }

    // 3. Arredondamento Psicológico (terminar em 9)
    const valorVenda = Math.ceil(resultado / 10) * 10 - 1;
    setOrcamentoFinal(valorVenda);
  }, [custoPeca, dificuldade, modelo]);

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8">
      
      {/* Título */}
      <div className="flex items-center gap-4">
        <div className="h-14 w-14 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/20">
          <ClipboardList className="text-white" size={28} />
        </div>
        <div>
          <h1 className="text-3xl font-black text-white italic uppercase tracking-tighter">Entrada de Serviço</h1>
          <p className="text-zinc-500 font-medium text-sm">Cálculo de lucro automático</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LADO ESQUERDO: CAMPOS DE ENTRADA */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white/[0.02] border border-white/5 p-8 rounded-[2.5rem] shadow-2xl">
            <h2 className="text-blue-500 text-[10px] font-black uppercase tracking-widest mb-6 flex items-center gap-2">
              <Smartphone size={14} /> Detalhes do Aparelho
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <label className="text-[10px] text-zinc-500 font-bold uppercase ml-2">Modelo</label>
                <input 
                  value={modelo}
                  onChange={(e) => setModelo(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 p-4 rounded-2xl outline-none focus:border-blue-500 transition-all text-white font-bold" 
                  placeholder="Ex: iPhone 13 Pro Max" 
                />
              </div>

              {/* CAMPO DO VALOR DA PEÇA */}
              <div className="space-y-2">
                <label className="text-[10px] text-emerald-500 font-bold uppercase ml-2 italic">Valor da Peça (Seu Custo)</label>
                <div className="relative">
                  <DollarSign size={18} className="absolute left-4 top-4 text-emerald-500" />
                  <input 
                    type="number"
                    onChange={(e) => setCustoPeca(Number(e.target.value))}
                    className="w-full bg-emerald-500/5 border border-emerald-500/20 p-4 pl-12 rounded-2xl outline-none focus:border-emerald-500 transition-all text-emerald-400 font-black text-xl" 
                    placeholder="0,00" 
                  />
                </div>
              </div>
            </div>

            <textarea className="w-full bg-black/40 border border-white/10 p-4 rounded-2xl h-32 outline-none focus:border-blue-500 transition-all text-white resize-none" placeholder="Relato do cliente..." />
          </div>
        </div>

        {/* LADO DIREITO: ORÇAMENTO E DIFICULDADE */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Seletor de Dificuldade */}
          <div className="bg-white/[0.01] border border-white/5 p-6 rounded-[2rem]">
            <h2 className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-4 italic">Dificuldade do Reparo</h2>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: 'Fácil (150%)', val: 1.5 },
                { label: 'Média (200%)', val: 2.0 },
                { label: 'Difícil (250%)', val: 2.5 }
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() => setDificuldade(item.val)}
                  className={`py-3 rounded-xl text-[9px] font-black uppercase transition-all ${
                    dificuldade === item.val ? "bg-white text-black shadow-lg" : "bg-white/5 text-zinc-500 hover:bg-white/10"
                  }`}
                >
                  {item.label.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* CARD DE PREÇO FINAL SUGERIDO */}
          <div className="bg-gradient-to-br from-blue-600 to-indigo-900 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden group border border-white/10">
            <Zap className="absolute -right-4 -top-4 text-white/10 group-hover:scale-125 transition-transform duration-700" size={150} />
            
            <span className="text-blue-100/60 text-[10px] font-black uppercase tracking-widest">Valor de Venda Sugerido</span>
            <div className="text-5xl font-black text-white mt-2 tracking-tighter">
              R$ {orcamentoFinal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-blue-200/50 text-[10px] font-bold uppercase italic">Sua Mão de Obra:</span>
                <span className="text-emerald-400 font-black bg-emerald-500/10 px-3 py-1 rounded-full text-sm">
                  + R$ {(orcamentoFinal - custoPeca > 0 ? orcamentoFinal - custoPeca : 0).toFixed(2)}
                </span>
              </div>

              <button className="w-full bg-white text-blue-700 h-16 rounded-2xl font-black text-sm flex items-center justify-center gap-3 hover:bg-zinc-100 active:scale-95 transition-all shadow-xl">
                GERAR O.S.
                <CheckCircle2 size={20} />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}