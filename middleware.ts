import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const req = request;
  const res = NextResponse.next();
  const url = request.nextUrl;
  const cookies = request.cookies.has("access_token");

  // redirect to login from home if token is not present
  if (isTokenRequiredPath(url.pathname) && !cookies) {
    console.log("redirecting to login");
    return NextResponse.redirect("http://localhost:3000/auth/login");
  }

  // redirect to home from login if token is present
  if (url.pathname === "/auth/login" && cookies) {
    console.log("redirecting to home");
    return NextResponse.redirect("http://localhost:3000/home");
  }
}

function isTokenRequiredPath(pathname: string) {
  return pathname.startsWith("/home");
}
