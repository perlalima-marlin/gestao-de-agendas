import { NextRequest, NextResponse } from "next/server"

const PROTECTED_PREFIXES = ["/dashboard", "/app", "/settings"]

export function proxy(_request: NextRequest) {
  // Auth desativada temporariamente — acesso direto ao dashboard
  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
