import { createAuthClient } from "better-auth/react";

// Determine the API base URL based on environment
const getBaseURL = () => {
  // Browser environment
  if (typeof window !== "undefined") {
    // Check if we're on localhost (development)
    const isLocalhost = window.location.hostname === "localhost" || 
                        window.location.hostname === "127.0.0.1";
    
    
    if (isLocalhost) {
      // Use your backend server on port 5000 for local development
      return "http://localhost:5000";
    }
    
    // In production (Vercel), use the same origin
    return window.location.origin;
  }
  
  // Server-side rendering fallback
  return process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
};

const baseURL = getBaseURL();

export const authClient = createAuthClient({
    baseURL: baseURL,
    fetchOptions: {
        credentials: "include",
    },
});

// Type declarations...
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