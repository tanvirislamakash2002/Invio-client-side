"use server";

import { userService } from "@/services/user.service";

// Get current session
export const getSession = async () => {
    return await userService.getSession();
};
