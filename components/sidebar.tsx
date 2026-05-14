"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Wrench, 
  Smartphone, 
  Users, 
  Package, 
  Settings, 
  LogOut,
  ClipboardList
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { icon: LayoutDashboard, label: "Visão Geral", href: "/dashboard" },
  { icon: ClipboardList, label: "Ordens de Serviço", href: "/dashboard/os" },
  { icon: Package, label: "Estoque de Peças", href: "/dashboard/inventory" },
  { icon: Users, label: "Clientes", href: "/dashboard/clients" },
  { icon: Settings, label: "Configurações", href: "/dashboard/settings" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-white/5 bg-[#020617]/50 backdrop-blur-xl flex flex-col">
      <div className="p-6">
        <div className="flex items-center gap-3 px-2">
          <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Smartphone className="text-white size={20}" />
          </div>
          <span className="font-bold text-xl tracking-tight text-premium">RepairFlow</span>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all group",
              pathname === item.href 
                ? "bg-blue-600/10 text-blue-400 border border-blue-600/20" 
                : "text-zinc-400 hover:text-white hover:bg-white/5"
            )}
          >
            <item.icon className={cn(
              "size-5",
              pathname === item.href ? "text-blue-400" : "text-zinc-500 group-hover:text-zinc-300"
            )} />
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-white/5">
        <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-sm font-medium text-zinc-500 hover:text-red-400 hover:bg-red-400/5 transition-all">
          <LogOut size={20} />
          Sair do Sistema
        </button>
      </div>
    </aside>
  );
}