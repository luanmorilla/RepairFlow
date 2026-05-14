"use client";

import { Package, Plus, Search, AlertTriangle, Smartphone, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const parts = [
  { id: 1, name: "Tela Frontal iPhone 11", brand: "Apple", stock: 2, minStock: 5, price: "R$ 180,00", category: "Telas" },
  { id: 2, name: "Bateria S20 FE", brand: "Samsung", stock: 12, minStock: 3, price: "R$ 65,00", category: "Baterias" },
  { id: 3, name: "Conector de Carga Moto G60", brand: "Motorola", stock: 8, minStock: 4, price: "R$ 15,00", category: "Conectores" },
  { id: 4, name: "Tela Frontal iPhone 13 Pro", brand: "Apple", stock: 1, minStock: 2, price: "R$ 1.200,00", category: "Telas" },
];

export function InventoryList() {
  return (
    <div className="space-y-6">
      {/* HEADER DE ESTOQUE */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Estoque de Peças</h1>
          <p className="text-zinc-500 text-sm">Gerencie componentes e suprimentos da bancada.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="border-white/10 bg-white/5 text-zinc-300 rounded-xl hover:bg-white/10">
            Exportar Inventário
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold shadow-lg shadow-blue-600/20 px-6">
            <Plus className="mr-2 h-5 w-5" /> Adicionar Peça
          </Button>
        </div>
      </div>

      {/* BARRA DE PESQUISA E FILTROS */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-3 text-zinc-500" size={18} />
          <Input 
            placeholder="Buscar por modelo de celular ou nome da peça..." 
            className="h-12 bg-white/5 border-white/10 rounded-xl pl-12 focus:border-blue-500"
          />
        </div>
        <select className="bg-white/5 border border-white/10 rounded-xl px-4 text-sm text-zinc-400 focus:outline-none focus:border-blue-500">
          <option>Todas as Categorias</option>
          <option>Telas</option>
          <option>Baterias</option>
          <option>Carcaças</option>
        </select>
      </div>

      {/* TABELA DE COMPONENTES */}
      <div className="glass-panel rounded-[32px] border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-white/[0.03] border-b border-white/5">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Item / Compatibilidade</th>
                <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider text-center">Estoque Atual</th>
                <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Custo Unitário</th>
                <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {parts.map((item) => (
                <tr key={item.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-zinc-900 rounded-lg flex items-center justify-center border border-white/5">
                        <Smartphone size={18} className="text-zinc-500" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-zinc-200">{item.name}</p>
                        <p className="text-xs text-zinc-500">{item.brand} • {item.category}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className={`text-sm font-bold ${item.stock <= item.minStock ? 'text-red-400' : 'text-white'}`}>
                      {item.stock} un.
                    </span>
                  </td>
                  <td className="px-6 py-5 text-sm text-zinc-300 font-medium">
                    {item.price}
                  </td>
                  <td className="px-6 py-5">
                    {item.stock <= item.minStock ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 text-red-400 text-[10px] font-bold border border-red-500/20 uppercase tracking-tighter">
                        <AlertTriangle size={12} /> Estoque Baixo
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold border border-emerald-500/20 uppercase tracking-tighter">
                        Em Dia
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button className="text-zinc-600 group-hover:text-white transition-colors">
                      <ChevronRight size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}