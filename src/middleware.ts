import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const isAdminRoute = req.nextUrl.pathname.startsWith("/admin")
    const isLoginPage = req.nextUrl.pathname === "/admin/login"

    // Si c'est la page de login et l'utilisateur est déjà connecté
    if (isLoginPage && token) {
      return NextResponse.redirect(new URL("/admin/dashboard", req.url))
    }

    // Si c'est une route admin (sauf login) et l'utilisateur n'est pas admin
    if (isAdminRoute && !isLoginPage && token?.role !== "admin") {
      return NextResponse.redirect(new URL("/admin/login", req.url))
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const isLoginPage = req.nextUrl.pathname === "/admin/login"
        if (isLoginPage) return true // Toujours autoriser l'accès à la page de login
        return !!token // Autoriser l'accès aux autres pages si connecté
      },
    },
  }
)

export const config = {
  matcher: ["/admin/:path*"]
}
