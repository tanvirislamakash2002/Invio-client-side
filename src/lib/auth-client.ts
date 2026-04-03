import { createAuthClient } from "better-auth/react";

const BACKEND_URL = process.env.NODE_ENV === "production"
    ? "https://invio-server.vercel.app"
    : "http://localhost:5000";

export const authClient = createAuthClient({
    baseURL: BACKEND_URL,
    fetchOptions: {
        credentials: "include",
    },
});

// If you need type declarations
declare module "better-auth/react" {
    interface User {
        role: "ADMIN" | "MANAGER" | "STAFF";
        phone?: string | null;
        isActive?: boolean;
    }

    interface Session {
        user: User;
    }
}