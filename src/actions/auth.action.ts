"use server";

import { userService } from "@/services/user.service";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { env } from "@/env";

// Get current session
export const getSession = async () => {
    return await userService.getSession();
};

// Logout user
export const logout = async () => {
    try {
        const cookieStore = await cookies();
        const sessionToken = cookieStore.get("better-auth.session_token")?.value;
        
        if (sessionToken) {
            await fetch(`${env.AUTH_URL}/logout`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookieStore.toString()
                }
            });
        }

        cookieStore.delete("better-auth.session_token");
        cookieStore.delete("better-auth.session_data");

        return { success: true };
    } catch (error) {
        console.error("Logout error:", error);
        return { success: false };
    }
};