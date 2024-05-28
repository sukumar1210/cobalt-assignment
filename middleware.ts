import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";


const unprotectedPaths = ['/auth/login', '/auth/callback/google']

export async function middleware(request: NextRequest) {
  const req = request;
  const res = NextResponse.next();
  const url = request.nextUrl;
  const cookies = request.cookies.has('access_token');
  console.log("cookies in Middleware: ", cookies);
  
  if (isTokenRequiredPath(url.pathname) && !cookies) {
    console.log('redirecting to login')
    return NextResponse.redirect('http://localhost:3000/auth/login')
  }

  // if (!unprotectedPaths.includes(url.pathname) && !cookies) {
  //   console.log('request')
  //   console.log(request)
  //   return NextResponse.redirect(new URL('/auth/login', request.url));
  // }

}

function isTokenRequiredPath(pathname: string) {
  return (
    pathname.startsWith('/home')
  );
}