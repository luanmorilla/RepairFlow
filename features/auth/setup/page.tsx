import { Metadata } from "next";
import { ShopSetupForm } from "@/features/shop/components/shop-setup-form";

export const metadata: Metadata = {
  title: "Configurar Assistência | RepairFlow",
  description: "Configure os dados da sua loja para emissão de documentos.",
};

export default function SetupPage() {
  return <ShopSetupForm />;
}