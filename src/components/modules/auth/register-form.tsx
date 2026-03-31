"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { authClient } from "@/lib/auth-client";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { Eye, EyeOff, Loader2, Mail, Lock, User, Camera, X } from "lucide-react";
import * as z from "zod";
import { env } from "@/env";
import { uploadAvatar, uploadPublicAvatar } from "@/actions/upload.action";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
  image: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type FormValues = z.infer<typeof formSchema>;

export function RegisterForm({ ...props }: React.ComponentProps<typeof Card>) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      image: "",
    },
    onSubmit: async ({ value }) => {
      const result = formSchema.safeParse(value);

      if (!result.success) {
        const errorMessage = result.error.issues[0]?.message || "Validation failed";
        toast.error(errorMessage);
        return;
      }

      setIsLoading(true);
      setError(null);
      const toastId = toast.loading("Creating your account...");

      try {
        const response = await authClient.signUp.email({
          name: result.data.name,
          email: result.data.email,
          password: result.data.password,
          role: "STAFF",
          image: result.data.image,
        } as any);

        if (response.error) {
          toast.error(response.error.message || "Failed to create account", { id: toastId });
          setError(response.error.message || "Registration failed");
          return;
        }

        toast.success("Account created successfully!", { id: toastId });
        router.push("/dashboard");
      } catch (error) {
        toast.error("Something went wrong. Please try again.", { id: toastId });
        setError("Failed to create account. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
  });


const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
        toast.error("Please select an image file");
        return;
    }

    if (file.size > 2 * 1024 * 1024) {
        toast.error("Image must be less than 2MB");
        return;
    }

    setIsUploading(true);
    const toastId = toast.loading("Uploading image...");

    try {
        const formData = new FormData();
        formData.append("file", file);

        // Use public upload for registration
        const result = await uploadPublicAvatar(formData);
        
        if (result.error) {
            toast.error(result.error.message, { id: toastId });
            return;
        }
        
        if (result.data?.url) {
            form.setFieldValue("image", result.data.url);
            setAvatarPreview(result.data.url);
            toast.success("Image uploaded!", { id: toastId });
        } else {
            toast.error("Upload failed: No image URL returned", { id: toastId });
        }
    } catch (error) {
        toast.error("Failed to upload image", { id: toastId });
    } finally {
        setIsUploading(false);
    }
};

  const removeImage = () => {
    form.setFieldValue("image", "");
    setAvatarPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const passwordStrength = (password: string) => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 2) return { text: "Weak", color: "bg-red-500", width: "w-1/3" };
    if (score <= 4) return { text: "Good", color: "bg-yellow-500", width: "w-2/3" };
    return { text: "Strong", color: "bg-green-500", width: "w-full" };
  };

  return (
    <Card className="border-0 shadow-none w-full max-w-md mx-auto" {...props}>
      <CardHeader className="space-y-1 p-6 pb-4">
        <CardTitle className="text-2xl font-bold text-center">Create an account</CardTitle>
        <CardDescription className="text-center">
          Get started with Invio inventory management
        </CardDescription>
      </CardHeader>

      <CardContent className="p-6 pt-0">
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form
          id="register-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="space-y-4"
        >
          {/* Profile Picture Upload */}
          <div className="flex justify-center mb-2">
            <div className="relative">
              <Avatar className="h-24 w-24 border-2 border-indigo-200 dark:border-indigo-800">
                <AvatarImage src={avatarPreview || undefined} />
                <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-2xl">
                  {getInitials(form.getFieldValue("name") || "U")}
                </AvatarFallback>
              </Avatar>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                disabled={isLoading || isUploading}
              />
              {!avatarPreview ? (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isLoading || isUploading}
                  className="absolute -bottom-2 -right-2 p-1.5 bg-indigo-600 rounded-full text-white shadow-md hover:bg-indigo-700 disabled:opacity-50 transition-colors"
                >
                  {isUploading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Camera className="h-4 w-4" />
                  )}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={removeImage}
                  disabled={isLoading || isUploading}
                  className="absolute -bottom-2 -right-2 p-1.5 bg-red-500 rounded-full text-white shadow-md hover:bg-red-600 disabled:opacity-50 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {/* Full Name */}
          <form.Field name="name">
            {(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <div className="space-y-2">
                  <Label htmlFor={field.name} className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    Full Name
                  </Label>
                  <Input
                    id={field.name}
                    type="text"
                    placeholder="John Doe"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    disabled={isLoading}
                    className={isInvalid ? "border-red-500" : ""}
                  />
                  {isInvalid && (
                    <p className="text-sm text-red-500">{field.state.meta.errors.join(", ")}</p>
                  )}
                </div>
              );
            }}
          </form.Field>

          {/* Email */}
          <form.Field name="email">
            {(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <div className="space-y-2">
                  <Label htmlFor={field.name} className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    Email Address
                  </Label>
                  <Input
                    id={field.name}
                    type="email"
                    placeholder="name@company.com"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    disabled={isLoading}
                    className={isInvalid ? "border-red-500" : ""}
                  />
                  {isInvalid && (
                    <p className="text-sm text-red-500">{field.state.meta.errors.join(", ")}</p>
                  )}
                </div>
              );
            }}
          </form.Field>

          {/* Password */}
          <form.Field name="password">
            {(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
              const strength = passwordStrength(field.state.value);
              return (
                <div className="space-y-2">
                  <Label htmlFor={field.name} className="flex items-center gap-2">
                    <Lock className="h-4 w-4 text-muted-foreground" />
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id={field.name}
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      disabled={isLoading}
                      className={isInvalid ? "border-red-500 pr-10" : "pr-10"}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {field.state.value && (
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div className={`h-full ${strength.color} ${strength.width} transition-all`} />
                        </div>
                        <span className="text-xs text-muted-foreground">{strength.text}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Must be at least 8 characters with uppercase, lowercase, and number
                      </p>
                    </div>
                  )}
                  {isInvalid && (
                    <p className="text-sm text-red-500">{field.state.meta.errors.join(", ")}</p>
                  )}
                </div>
              );
            }}
          </form.Field>

          {/* Confirm Password */}
          <form.Field name="confirmPassword">
            {(field) => {
              const password = form.getFieldValue("password");
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
              const doNotMatch = field.state.value && password && field.state.value !== password;
              return (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Confirm Password</Label>
                  <div className="relative">
                    <Input
                      id={field.name}
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      disabled={isLoading}
                      className={(isInvalid || doNotMatch) ? "border-red-500 pr-10" : "pr-10"}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {isInvalid && (
                    <p className="text-sm text-red-500">{field.state.meta.errors.join(", ")}</p>
                  )}
                  {doNotMatch && (
                    <p className="text-sm text-red-500">Passwords do not match</p>
                  )}
                </div>
              );
            }}
          </form.Field>

          {/* Role Note */}
          <div className="p-3 bg-muted/30 rounded-lg border border-muted">
            <p className="text-xs text-muted-foreground text-center">
              You're signing up as a <span className="font-medium text-indigo-600">Staff</span> member.
              Staff can create orders and view inventory.
            </p>
          </div>
        </form>
      </CardContent>

      <CardFooter className="flex flex-col space-y-4 p-6 pt-0">
        <Button
          form="register-form"
          type="submit"
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating account...
            </>
          ) : (
            "Create Account"
          )}
        </Button>

        <p className="text-xs text-center text-muted-foreground">
          By creating an account, you agree to our{" "}
          <Link href="/terms" className="text-indigo-600 hover:underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-indigo-600 hover:underline">
            Privacy Policy
          </Link>
        </p>

        <p className="text-sm text-center text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="text-indigo-600 hover:underline font-medium">
            Sign in
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}