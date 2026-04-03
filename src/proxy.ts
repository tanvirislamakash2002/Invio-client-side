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
    } catch {
        isAuthenticated = false;
    }

    const authRoutes = ["/login", "/signup"];

    //  Handle Auth Pages
    if (authRoutes.includes(pathName)) {
        if (isAuthenticated) {
            return NextResponse.redirect(new URL("/dashboard", request.url));
        }
        return NextResponse.next(); // allow access
    }

    //  Handle Protected Routes
    if (!isAuthenticated) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    //  Role-based access
    const role = user.role;

    if (role === "STAFF") {
        if (pathName.startsWith("/admin")) {
            return NextResponse.redirect(new URL("/dashboard", request.url));
        }
    }

    if (role === "MANAGER") {
        if (pathName.startsWith("/admin/settings")) {
            return NextResponse.redirect(new URL("/dashboard", request.url));
        }
    }

    return NextResponse.next();
};

export const config = {
    matcher: [
        "/login",
        "/signup",
        "/dashboard",
        "/products/:path*",
        "/categories/:path*",
        "/orders/:path*",
        "/restock/:path*",
        "/admin/:path*",
        "/settings/:path*",
    ],
};