import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });

  if (!token) {
    return NextResponse.redirect(new URL("/sign-in", req.nextUrl));
  }

  if (
    req.nextUrl.pathname.startsWith("/dashboard/patient") &&
    token.role === "doctor"
  ) {
    return NextResponse.rewrite(new URL("/dashboard/doctor", req.url));
  }

  if (
    req.nextUrl.pathname.startsWith("/dashboard/doctor") &&
    token.role !== "doctor"
  ) {
    return NextResponse.rewrite(new URL("/dashboard/patient", req.url));
  }
}
// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your middleware

export const config = {
  matcher: ["/dashboard/:path*"],
};
