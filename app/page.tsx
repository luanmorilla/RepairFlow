import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950 text-white">
      <div className="text-center">
        <h1 className="text-5xl font-bold">RepairFlow</h1>

        <p className="mt-4 text-zinc-400">
          Sistema inteligente para assistência técnica
        </p>

        {/* Botões de navegação adicionados abaixo */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/login" 
            className="px-8 py-3 bg-white text-zinc-950 font-semibold rounded-md hover:bg-zinc-200 transition-colors"
          >
            Acessar Sistema
          </Link>
          
          <Link 
            href="/register" 
            className="px-8 py-3 border border-zinc-700 font-semibold rounded-md hover:bg-zinc-900 transition-colors"
          >
            Criar Conta Grátis
          </Link>
        </div>
      </div>
    </main>
  );
}