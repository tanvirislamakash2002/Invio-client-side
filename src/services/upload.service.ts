import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

export const uploadService = {
    // Public upload for registration
    uploadPublic: async (formData: FormData) => {
        try {
            const res = await fetch(`${API_URL}/upload/avatar/public`, {
                method: "POST",
                body: formData
            });
            
            const data = await res.json();
            
            if (!res.ok) {
                return { 
                    data: null, 
                    error: { message: data.message || "Failed to upload image" } 
                };
            }
            
            return { data: data.data, error: null };
        } catch (error) {
            console.error("Public upload error:", error);
            return { data: null, error: { message: "Something went wrong" } };
        }
    },
    
    // Authenticated upload
    upload: async (formData: FormData, endpoint: string) => {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/upload/${endpoint}`, {
                method: "POST",
                headers: {
                    Cookie: cookieStore.toString()
                },
                body: formData
            });
            
            const data = await res.json();
            
            if (!res.ok) {
                return { 
                    data: null, 
                    error: { message: data.message || `Failed to upload to ${endpoint}` } 
                };
            }
            
            return { data: data.data, error: null };
        } catch (error) {
            console.error(`Upload to ${endpoint} error:`, error);
            return { data: null, error: { message: "Something went wrong" } };
        }
    },
};