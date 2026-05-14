// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Sua lógica aqui
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Ignora rotas que não são páginas:
     * - api (rotas de API)
     * - _next/static (arquivos estáticos)
     * - _next/image (otimização de imagens)
     * - favicon.ico, sitemap, etc.
     */
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt).*)',
  ],
}