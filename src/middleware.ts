import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
   const isPublicpath=request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/signup'
   if(isPublicpath){
    return NextResponse.next()
   }
   const token=request.cookies.get('token')?.value
   if(!token){
    console.log("token",token)
    return NextResponse.redirect(new URL('/login',request.url))
   }
   return NextResponse.next()
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/login',
    '/signup'
  ]
}