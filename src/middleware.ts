import { NextRequest, NextResponse } from "next/server";



const privatePath = ['/me']
const authPaths = ['/login', '/register']

export function middleware(request : NextRequest) {
    const {pathname} = request.nextUrl
    console.log('>>>>check pathname', pathname);
    
    const sessionToken = request.cookies.get('sessionToken')?.value;
    console.log('>>check sessionToken', sessionToken);
    
    if(privatePath.some(path => pathname.startsWith(path) && !sessionToken) ) {
        return NextResponse.redirect(new URL('/login', request.url))
    }


    if(authPaths.some(path => pathname.startsWith(path) && sessionToken)) {
        return NextResponse.redirect(new URL('/me', request.url))

    }
    
  return NextResponse.next();
}

export const config = {
    matcher: [
        ...privatePath, ...authPaths
    ]
}


