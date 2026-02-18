import {NextRequest, NextResponse} from "next/server";
import {authenticationRoutes, publicRoutes} from "@/app/routes";
import {auth} from "@/app/auth";

export async function proxy(request: NextRequest) {
    const {nextUrl} = request
    const session = await auth()

    const isPublic = publicRoutes.includes(nextUrl.pathname)
    const isAuthenticationRoute = authenticationRoutes.includes(nextUrl.pathname)
    if (isPublic) {
        return NextResponse.next()
    }

    if (isAuthenticationRoute) {
        if (session?.user) {
            return NextResponse.redirect(new URL('/members', nextUrl))
        }
        return NextResponse.next()
    }

    if (!publicRoutes || !session?.user) {
        return NextResponse.redirect(new URL('/login', nextUrl))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)']
}