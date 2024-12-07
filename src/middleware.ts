import type {NextRequest} from 'next/server'
import {NextResponse} from 'next/server'
import {COOKIE_JWT_NAME} from "@/configs";

export async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname
    if (pathname.startsWith('/cart')) {
        const jwt = request.cookies.get(COOKIE_JWT_NAME)
        if (!jwt)
            return NextResponse.redirect(new URL('/login', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',],
}