import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

const authMiddleware = withAuth({
  pages: {
    signIn: "/admin"
  }
});

export default function middleware(req: Parameters<typeof authMiddleware>[0]) {
  const pathname = req.nextUrl.pathname;
  if (pathname === "/admin") return NextResponse.next();
  return authMiddleware(req);
}

export const config = {
  matcher: ["/admin/:path*"]
};

