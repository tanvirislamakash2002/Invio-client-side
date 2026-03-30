import { NextRequest, NextResponse } from "next/server"
// import { userService } from "./services/user.service"
import { Roles } from "./constants/roles";

export const proxy = async (request: NextRequest) => {
    const pathName = request.nextUrl.pathname;
    let isAuthenticated = false

    // const { data } = await userService.getSession()
    // if (data) {
    //     isAuthenticated = true
    // }

    // if (!isAuthenticated) {
    //     return NextResponse.redirect(new URL("/login", request.url))
    // }
    // if (
    //     (data.user.role === Roles.admin) &&
    //     (
    //         pathName.startsWith('/seller') ||
    //         pathName.startsWith('/cart') ||
    //         pathName.startsWith('/checkout') ||
    //         pathName.startsWith('/orders')
    //     )
    // ) {
    //     return NextResponse.redirect(new URL("/admin", request.url))
    // }
    // if (
    //     (data.user.role === Roles.customer) &&
    //     (
    //         pathName.startsWith('/seller') ||
    //         pathName.startsWith('/admin')
    //     )
    // ) {
    //     return NextResponse.redirect(new URL("/", request.url))
    // }
    // if (
    //     (data.user.role === Roles.seller) &&
    //     (
    //         pathName.startsWith('/cart') ||
    //         pathName.startsWith('/checkout') ||
    //         pathName.startsWith('/orders')
    //     )
    // ) {
    //     return NextResponse.redirect(new URL("/", request.url))
    // }
    // if (
    //     (data.user.role === Roles.seller) &&
    //     (pathName.startsWith('/admin'))
    // ) {
    //     return NextResponse.redirect(new URL("/seller", request.url))
    // }

    return NextResponse.next()
}

export const config = {
    matcher: [
        // '/cart',
        // '/checkout',
        // '/orders',
        // '/profile',
        // '/seller/:path*',
        // '/admin/:path*'
    ]
}