import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Por enquanto, apenas permite que a requisição siga.
  // Depois você pode adicionar lógica de proteção de rotas aqui.
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Ignora rotas que não devem passar pelo middleware:
     * - api (rotas de API)
     * - _next/static (arquivos estáticos)
     * - _next/image (otimização de imagens)
     * - favicon.ico, robots.txt, etc.
     */
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt).*)',
  ],
};