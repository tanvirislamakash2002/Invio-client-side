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
        
        // Get the actual cookie names from your browser
        const sessionToken = cookieStore.get("__Secure-none.session_token")?.value;
        
        if (sessionToken) {
            // Call the correct sign-out endpoint
            await fetch(`${env.AUTH_URL}/sign-out`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookieStore.toString()
                }
            });
        }

        // Delete the actual cookie names
        cookieStore.delete("__Secure-none.session_token");
        cookieStore.delete("__Secure-none.session_data");

        return { success: true };
    } catch (error) {
        console.error("Logout error:", error);
        return { success: false };
    }
};