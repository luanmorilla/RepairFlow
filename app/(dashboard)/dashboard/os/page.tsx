"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Calculator,
  Clock,
  Cpu,
  DollarSign,
  FileText,
  Gauge,
  Info,
  Layers,
  MessageCircle,
  PenTool,
  RefreshCcw,
  Settings,
  ShieldAlert,
  ShieldCheck,
  Smartphone,
  Thermometer,
  TrendingUp,
  Wrench,
  ZapOff,
  ChevronRight,
  Building2,
  User2,
  Sparkles,
} from "lucide-react";

type DeviceType = "iphone" | "android" | "unknown";

interface CompanyData {
  name: string;
  phone: string;
  logo?: string;
  warrantyDays: number;
}

interface CalculoResultado {
  total: number;
  maoDeObra: number;
  seguroRisco: number;
  markupAplicado: number;
  lucroEstimado: number;
  scoreDificuldade: number;
  categoriaServico: string;
  tempoEstimado: string;
  deviceType: DeviceType;
  deviceTier: string;
  riscoAbertura: string;
}

type DefectRule = {
  score: number;
  category: string;
  keywords: string[];
  tempo: string;
  reserveRate: number;
};

const DEFECT_RULES: DefectRule[] = [
  {
    score: 10,
    category: "Microsolda / Placa",
    keywords: [
      "cpu",
      "nand",
      "baseband",
      "pmic",
      "pmu",
      "tristar",
      "hydra",
      "codec",
      "reballing",
      "reball",
      "curto",
      "placa morta",
      "linha rompida",
      "jumpers",
      "interposer",
      "camada",
      "escavação",
      "swap",
      "swapping",
    ],
    tempo: "4h - 72h",
    reserveRate: 0.25,
  },

  {
    score: 8,
    category: "Alto Risco",
    keywords: [
      "face id",
      "touch id",
      "oled",
      "amoled",
      "tela curva",
      "curvo",
      "vidro traseiro",
      "molhado",
      "queda na água",
      "oxidação",
      "display original",
    ],
    tempo: "2h - 24h",
    reserveRate: 0.2,
  },

  {
    score: 5,
    category: "Reparo de Componentes",
    keywords: [
      "bateria",
      "conector de carga",
      "porta de carga",
      "subplaca",
      "campainha",
      "microfone",
      "alto falante",
      "câmera",
      "flex",
      "não carrega",
    ],
    tempo: "1h - 4h",
    reserveRate: 0.15,
  },

  {
    score: 3,
    category: "Software / Estético",
    keywords: [
      "software",
      "flash",
      "reset",
      "frp",
      "icloud",
      "conta google",
      "película",
      "gaveta",
      "limpeza",
    ],
    tempo: "20min - 2h",
    reserveRate: 0.08,
  },
];

const PREMIUM_KEYWORDS = [
  "iphone 15",
  "iphone 14",
  "iphone 13",
  "iphone 16",
  "pro max",
  "ultra",
  "fold",
  "flip",
  "s24",
  "s23",
  "pixel 9",
  "pixel 8",
];

function normalizeText(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function containsAny(text: string, keywords: string[]) {
  return keywords.some((k) => text.includes(k));
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function roundShelfPrice(value: number) {
  return Math.ceil(value / 10) * 10 - 1;
}

function detectDeviceType(text: string): DeviceType {
  if (text.includes("iphone")) return "iphone";

  const androidBrands = [
    "samsung",
    "xiaomi",
    "redmi",
    "poco",
    "motorola",
    "moto",
    "realme",
    "oneplus",
    "galaxy",
  ];

  if (containsAny(text, androidBrands)) return "android";

  return "unknown";
}

function classifyDefect(text: string) {
  for (const rule of DEFECT_RULES) {
    if (containsAny(text, rule.keywords)) {
      return rule;
    }
  }

  return {
    score: 2,
    category: "Básico",
    tempo: "10min - 1h",
    reserveRate: 0.05,
  };
}

function buildAnalysis({
  modelo,
  defeito,
  custoPeca,
}: {
  modelo: string;
  defeito: string;
  custoPeca: number;
}): CalculoResultado {
  const query = normalizeText(`${modelo} ${defeito}`);

  const deviceType = detectDeviceType(query);
  const defect = classifyDefect(query);

  const isPremium = containsAny(query, PREMIUM_KEYWORDS);

  let score = defect.score;

  if (isPremium) score += 2;

  score = clamp(score, 1, 10);

  let markup = deviceType === "iphone" ? 2 : 1.7;

  if (score >= 8) markup += 0.5;
  if (isPremium) markup += 0.2;

  let maoDeObra = 120;

  if (score >= 10) maoDeObra = 750;
  else if (score >= 8) maoDeObra = 420;
  else if (score >= 6) maoDeObra = 260;
  else if (score >= 4) maoDeObra = 180;

  const seguro = custoPeca * defect.reserveRate;

  let total = custoPeca * markup + maoDeObra + seguro;

  total = roundShelfPrice(total);

  return {
    total,
    maoDeObra,
    seguroRisco: seguro,
    markupAplicado: markup,
    lucroEstimado: total - custoPeca,
    scoreDificuldade: score,
    categoriaServico: defect.category,
    tempoEstimado: defect.tempo,
    deviceType,
    deviceTier: isPremium ? "Premium" : "Convencional",
    riscoAbertura:
      score >= 9 ? "Muito alto" : score >= 7 ? "Alto" : "Moderado",
  };
}

export default function RepairFlowOrderPage() {
  const [company, setCompany] = useState<CompanyData>({
    name: "RepairFlow",
    phone: "5511999999999",
    warrantyDays: 90,
    logo: "",
  });

  const [cliente, setCliente] = useState("");
  const [modelo, setModelo] = useState("");
  const [defeito, setDefeito] = useState("");
  const [custoPeca, setCustoPeca] = useState<number>(0);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedCompany = localStorage.getItem("repairflow-company");

    if (savedCompany) {
      setCompany(JSON.parse(savedCompany));
    }
  }, []);

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 250);

    return () => clearTimeout(timer);
  }, [modelo, defeito, custoPeca]);

  const resultado = useMemo(() => {
    return buildAnalysis({
      modelo,
      defeito,
      custoPeca,
    });
  }, [modelo, defeito, custoPeca]);

  function gerarTextoWhatsApp() {
    return `
📋 *ORÇAMENTO TÉCNICO*

🏢 ${company.name}

👤 Cliente: ${cliente || "Não informado"}
📱 Modelo: ${modelo || "Não informado"}

🛠 Serviço:
${defeito || "Não informado"}

📊 Categoria: ${resultado.categoriaServico}
⚙️ Dificuldade: ${resultado.scoreDificuldade}/10
⏱ Prazo: ${resultado.tempoEstimado}

💰 Valor total: R$ ${resultado.total.toFixed(2)}

🛡 Garantia: ${company.warrantyDays} dias

Obrigado pela preferência.
${company.name}
    `;
  }

  function enviarWhatsApp() {
    const texto = gerarTextoWhatsApp();

    window.open(
      `https://wa.me/${company.phone}?text=${encodeURIComponent(texto)}`,
      "_blank"
    );
  }

  function baixarPDF() {
    const html = `
      <html>
        <head>
          <title>${company.name}</title>

          <style>
            body{
              font-family: Arial;
              padding:40px;
              color:#111827;
            }

            .header{
              display:flex;
              justify-content:space-between;
              align-items:center;
              border-bottom:2px solid #111827;
              padding-bottom:20px;
              margin-bottom:30px;
            }

            .brand{
              display:flex;
              align-items:center;
              gap:16px;
            }

            .logo{
              width:70px;
              height:70px;
              border-radius:20px;
              overflow:hidden;
              background:#111827;
              color:white;
              display:flex;
              align-items:center;
              justify-content:center;
              font-weight:800;
            }

            .logo img{
              width:100%;
              height:100%;
              object-fit:cover;
            }

            .title{
              font-size:28px;
              font-weight:900;
            }

            .section{
              border:1px solid #e5e7eb;
              border-radius:16px;
              padding:20px;
              margin-bottom:18px;
            }

            .row{
              margin-bottom:12px;
            }

            .label{
              font-size:12px;
              font-weight:700;
              color:#6b7280;
            }

            .value{
              font-size:14px;
              font-weight:700;
              margin-top:4px;
            }

            .price{
              font-size:40px;
              font-weight:900;
            }
          </style>
        </head>

        <body>

          <div class="header">

            <div class="brand">

              <div class="logo">
                ${
                  company.logo
                    ? `<img src="${company.logo}" />`
                    : company.name.slice(0, 2)
                }
              </div>

              <div>
                <div class="title">${company.name}</div>
                <div>Ordem de Serviço Técnica</div>
              </div>

            </div>

            <div>
              Garantia: ${company.warrantyDays} dias
            </div>

          </div>

          <div class="section">
            <div class="row">
              <div class="label">Cliente</div>
              <div class="value">${cliente}</div>
            </div>

            <div class="row">
              <div class="label">Aparelho</div>
              <div class="value">${modelo}</div>
            </div>

            <div class="row">
              <div class="label">Defeito</div>
              <div class="value">${defeito}</div>
            </div>
          </div>

          <div class="section">
            <div class="row">
              <div class="label">Categoria</div>
              <div class="value">${resultado.categoriaServico}</div>
            </div>

            <div class="row">
              <div class="label">Dificuldade</div>
              <div class="value">${resultado.scoreDificuldade}/10</div>
            </div>

            <div class="row">
              <div class="label">Prazo</div>
              <div class="value">${resultado.tempoEstimado}</div>
            </div>
          </div>

          <div class="section">
            <div class="label">Valor final</div>
            <div class="price">
              R$ ${resultado.total.toFixed(2)}
            </div>
          </div>

        </body>
      </html>
    `;

    const win = window.open("", "_blank");

    if (!win) return;

    win.document.write(html);
    win.document.close();

    setTimeout(() => {
      win.print();
    }, 500);
  }

  const StatCard = ({
    icon: Icon,
    label,
    value,
  }: {
    icon: React.ElementType;
    label: string;
    value: string;
  }) => (
    <div className="bg-white/[0.03] border border-white/5 p-5 rounded-3xl">
      <div className="p-2 w-fit rounded-xl bg-blue-500/10 mb-3">
        <Icon className="text-blue-500" size={18} />
      </div>

      <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-black">
        {label}
      </p>

      <p className="text-white text-lg font-black mt-1">{value}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#030303] text-white p-4 md:p-8">
      <header className="max-w-7xl mx-auto flex items-center justify-between mb-10">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center shadow-2xl">
            <Calculator size={30} />
          </div>

          <div>
            <h1 className="text-4xl font-black tracking-tight">
              {company.name}
            </h1>

            <p className="text-zinc-500 text-sm mt-1 uppercase tracking-[0.3em]">
              Repair Intelligence System
            </p>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4 flex items-center gap-4">
          <RefreshCcw className="animate-spin text-emerald-400" size={18} />

          <div>
            <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-black">
              Sistema
            </p>

            <p className="text-xs text-emerald-400 font-bold">
              Operacional
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-8">
        <section className="lg:col-span-7 bg-zinc-900/40 border border-white/5 rounded-[40px] p-8 md:p-10">
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <Sparkles className="text-blue-500" size={18} />

              <h2 className="text-sm uppercase tracking-[0.3em] font-black">
                Engenharia Técnica
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <Input
                icon={User2}
                label="Cliente"
                value={cliente}
                onChange={setCliente}
                placeholder="Nome do cliente"
              />

              <Input
                icon={Smartphone}
                label="Modelo"
                value={modelo}
                onChange={setModelo}
                placeholder="Ex: iPhone 15 Pro Max"
              />
            </div>

            <div>
              <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-black flex items-center gap-2 mb-4">
                <Wrench size={14} className="text-orange-500" />
                Defeito
              </label>

              <textarea
                value={defeito}
                onChange={(e) => setDefeito(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-3xl h-44 p-6 text-white outline-none focus:border-blue-500 resize-none"
              />
            </div>

            <div>
              <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-black flex items-center gap-2 mb-4">
                <DollarSign size={14} className="text-emerald-500" />
                Custo da peça
              </label>

              <input
                type="number"
                value={custoPeca}
                onChange={(e) => setCustoPeca(Number(e.target.value))}
                className="w-full bg-emerald-500/5 border border-emerald-500/20 rounded-3xl p-6 text-3xl font-black text-emerald-400 outline-none"
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatCard
                icon={Cpu}
                label="Score"
                value={`${resultado.scoreDificuldade}/10`}
              />

              <StatCard
                icon={TrendingUp}
                label="Markup"
                value={`${resultado.markupAplicado.toFixed(2)}x`}
              />

              <StatCard
                icon={Clock}
                label="Prazo"
                value={resultado.tempoEstimado}
              />

              <StatCard
                icon={ShieldCheck}
                label="Reserva"
                value={`R$ ${resultado.seguroRisco.toFixed(0)}`}
              />
            </div>
          </div>
        </section>

        <aside className="lg:col-span-5 bg-gradient-to-br from-indigo-700 via-blue-800 to-slate-950 rounded-[40px] p-10 border border-white/10 shadow-2xl">
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div className="bg-white/10 px-4 py-2 rounded-full text-[10px] uppercase tracking-widest font-black">
                Resultado
              </div>

              {loading && (
                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              )}
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-blue-200/60 font-black mb-2">
                Valor final
              </p>

              <div className="flex items-end gap-3">
                <span className="text-3xl font-black">R$</span>

                <h3 className="text-7xl font-black tracking-tighter">
                  {resultado.total.toLocaleString("pt-BR", {
                    minimumFractionDigits: 0,
                  })}
                </h3>
              </div>
            </div>

            <div className="space-y-4">
              <ResultRow
                label="Mão de obra"
                value={`R$ ${resultado.maoDeObra.toFixed(2)}`}
              />

              <ResultRow
                label="Lucro estimado"
                value={`R$ ${resultado.lucroEstimado.toFixed(2)}`}
              />

              <ResultRow
                label="Categoria"
                value={resultado.categoriaServico}
              />

              <ResultRow
                label="Risco"
                value={resultado.riscoAbertura}
              />
            </div>

            <div className="space-y-4 pt-4">
              <button
                onClick={baixarPDF}
                className="w-full h-24 rounded-[30px] bg-white text-blue-900 font-black text-xl flex items-center justify-center gap-3 hover:scale-[1.02] transition-all"
              >
                Baixar PDF
                <ChevronRight size={24} />
              </button>

              <button
                onClick={enviarWhatsApp}
                className="w-full h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-200 font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3"
              >
                <MessageCircle size={18} />
                Enviar WhatsApp
              </button>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}

function Input({
  icon: Icon,
  label,
  value,
  onChange,
  placeholder,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <div>
      <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-black flex items-center gap-2 mb-4">
        <Icon size={14} className="text-blue-500" />
        {label}
      </label>

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-black/40 border border-white/10 rounded-3xl p-5 text-white font-bold outline-none focus:border-blue-500 transition-all"
      />
    </div>
  );
}

function ResultRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between bg-black/20 rounded-2xl p-5 border border-white/5">
      <span className="text-[10px] uppercase tracking-widest font-black text-blue-200">
        {label}
      </span>

      <span className="text-white font-black">
        {value}
      </span>
    </div>
  );
}