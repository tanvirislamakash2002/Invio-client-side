import { NextRequest, NextResponse } from "next/server";
import { userService } from "./services/user.service";

export const proxy = async (request: NextRequest) => {
    const pathName = request.nextUrl.pathname;

    let isAuthenticated = false;
    let user = null;

    try {
        const { data } = await userService.getSession();
        if (data?.user) {
            isAuthenticated = true;
            user = data.user;
        }
    } catch (error) {
        isAuthenticated = false;
    }

    //  If not logged in → redirect to login
    if (!isAuthenticated) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    //  Role-based access control
    const role = user.role;

    //  STAFF restrictions
    if (role === "STAFF") {
        if (pathName.startsWith("/admin")) {
            return NextResponse.redirect(new URL("/dashboard", request.url));
        }
    }

    //  MANAGER restrictions
    if (role === "MANAGER") {
        if (pathName.startsWith("/admin/settings")) {
            return NextResponse.redirect(new URL("/dashboard", request.url));
        }
    }

    return NextResponse.next();
};

export const config = {
    matcher: [
        "/dashboard",
        "/products/:path*",
        "/categories/:path*",
        "/orders/:path*",
        "/restock/:path*",
        "/admin/:path*",
        "/settings/:path*"
    ]
};