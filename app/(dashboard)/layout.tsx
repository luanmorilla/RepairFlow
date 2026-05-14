"use client";

import { useState } from "react";
import { 
  LayoutDashboard, 
  ClipboardList, 
  Users, 
  Settings, 
  Menu, 
  X,
  LogOut,
  Smartphone,
  ShieldCheck // Ícone para Consulta de IMEI
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();

  // Dados da assistência
  const shopInfo = {
    name: "MonilaCell",
    // Se você tiver a URL da logo, coloque aqui. 
    // Por enquanto, usaremos o ícone de Smartphone como logo oficial.
    logo: null 
  };

  const menuItems = [
    { icon: LayoutDashboard, label: "Visão Geral", href: "/dashboard/inventory" },
    { icon: ClipboardList, label: "Ordens de Serviço", href: "/dashboard/os" },
    { icon: ShieldCheck, label: "Consultar IMEI", href: "/dashboard/imei" }, // Nova Opção
    { icon: Users, label: "Clientes", href: "/dashboard/clientes" },
    { icon: Settings, label: "Configurações", href: "/dashboard/setup" }, // Link para o Setup
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-white flex font-sans">
      {/* Sidebar */}
      <AnimatePresence mode="wait">
        {isSidebarOpen && (
          <motion.aside
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            className="w-72 border-r border-white/5 bg-slate-950/50 backdrop-blur-xl flex flex-col z-50"
          >
            {/* Logo Section */}
            <div className="p-8 flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-600/20">
                <Smartphone size={24} className="text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight uppercase border-b-2 border-blue-600/50">
                {shopInfo.name}
              </span>
            </div>

            {/* Menu Nav */}
            <nav className="flex-1 px-4 space-y-2 mt-4">
              {menuItems.map((item, idx) => {
                const isActive = pathname === item.href;
                return (
                  <Link key={idx} href={item.href}>
                    <button
                      className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group mb-1 ${
                        isActive 
                        ? "bg-blue-600/10 text-blue-400 border border-blue-600/20 shadow-[0_0_15px_rgba(37,99,235,0.1)]" 
                        : "text-zinc-500 hover:bg-white/5 hover:text-zinc-300"
                      }`}
                    >
                      <item.icon size={20} className={isActive ? "text-blue-400" : "group-hover:text-zinc-300"} />
                      <span className="font-medium text-sm">{item.label}</span>
                    </button>
                  </Link>
                );
              })}
            </nav>

            {/* Bottom Section */}
            <div className="p-6 border-t border-white/5">
              <button className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-zinc-500 hover:bg-red-500/10 hover:text-red-400 transition-all group">
                <LogOut size={20} className="group-hover:translate-x-1 transition-transform" />
                <span className="font-medium text-sm">Encerrar Sessão</span>
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {/* Header Superior */}
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-8 bg-[#020617]/80 backdrop-blur-md z-40">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2.5 hover:bg-white/5 rounded-xl text-zinc-400 border border-transparent hover:border-white/10 transition-all"
          >
            {isSidebarOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Perfil com Ícone da Assistência no lugar do M */}
          <div className="flex items-center gap-4 group cursor-pointer">
             <div className="text-right hidden sm:block">
               <p className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">{shopInfo.name}</p>
               <p className="text-[10px] text-zinc-500 uppercase tracking-[0.2em]">Painel Admin</p>
             </div>
             <div className="h-12 w-12 rounded-2xl bg-blue-600/10 border border-blue-600/20 flex items-center justify-center text-blue-500 shadow-inner group-hover:scale-105 transition-transform">
                {/* Aqui está o ícone da sua assistência */}
                <Smartphone size={24} />
             </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {children}
        </div>
      </main>
    </div>
  );
}