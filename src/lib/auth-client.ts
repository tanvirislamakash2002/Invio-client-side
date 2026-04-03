import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
    baseURL: typeof window !== "undefined" ? window.location.origin : "",
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