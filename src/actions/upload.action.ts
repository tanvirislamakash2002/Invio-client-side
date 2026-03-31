"use server";

import { uploadService } from "@/services/upload.service";
import { updateTag } from "next/cache";

// Public upload for registration (no auth)
export const uploadPublicAvatar = async (formData: FormData) => {
    const result = await uploadService.uploadPublic(formData);
    if (!result.error) {
        updateTag("profile");
    }
    return result;
};

// Authenticated upload for logged-in users
export const uploadAvatar = async (formData: FormData) => {
    const result = await uploadService.upload(formData, "avatar");
    if (!result.error) {
        updateTag("profile");
    }
    return result;
};