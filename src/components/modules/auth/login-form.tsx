"use client";

import { useState } from "react";
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
import { authClient } from "@/lib/auth-client";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { Eye, EyeOff, Loader2, Mail, Lock, LogIn, Sparkles } from "lucide-react";
import * as z from "zod";

interface User {
  id: string;
  email: string;
  name: string;
  role: "ADMIN" | "MANAGER" | "STAFF";
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  image?: string | null;
  phone?: string | null;
  address?: string | null;
  isActive?: boolean;
}

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

const DEMO_CREDENTIALS = {
  admin: { email: "demo@admin.com", password: "demo123", role: "ADMIN" },
  manager: { email: "demo@manager.com", password: "demo123", role: "MANAGER" },
  staff: { email: "demo@staff.com", password: "demo123", role: "STAFF" },
};

export function LoginForm({ ...props }: React.ComponentProps<typeof Card>) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDemoLoading, setIsDemoLoading] = useState<string | null>(null);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
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
      const toastId = toast.loading("Logging in...");

      try {
        const response = await authClient.signIn.email({
          email: result.data.email,
          password: result.data.password,
        });

        if (response.error) {
          toast.error(response.error.message || "Failed to login", { id: toastId });
          setError(response.error.message || "Invalid email or password");
          return;
        }

        toast.success("Logged in successfully!", { id: toastId });
        router.push("/dashboard");
      } catch (error) {
        toast.error("Something went wrong. Please try again.", { id: toastId });
        setError("Failed to login. Please check your credentials.");
      } finally {
        setIsLoading(false);
      }
    },
  });

  const handleDemoLogin = async (role: "admin" | "manager" | "staff") => {
    const credentials = DEMO_CREDENTIALS[role];
    setIsDemoLoading(role);
    setError(null);
    const toastId = toast.loading(`Logging in as ${role.toUpperCase()}...`);

    try {
      const response = await authClient.signIn.email({
        email: credentials.email,
        password: credentials.password,
      });

      if (response.error) {
        toast.error(response.error.message || "Failed to login", { id: toastId });
        setError(response.error.message || "Demo login failed");
        return;
      }

      toast.success(`Logged in as ${role.toUpperCase()}!`, { id: toastId });
      router.push("/dashboard");
    } catch (error) {
      toast.error("Something went wrong. Please try again.", { id: toastId });
      setError("Demo login failed. Please try again.");
    } finally {
      setIsDemoLoading(null);
    }
  };

  return (
    <Card className="border-0 shadow-none w-full max-w-md mx-auto" {...props}>
      <CardHeader className="space-y-1 p-6 pb-4">
        <CardTitle className="text-2xl font-bold text-center">Welcome back</CardTitle>
        <CardDescription className="text-center">
          Sign in to your Invio account
        </CardDescription>
      </CardHeader>

      <CardContent className="p-6 pt-0">
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form
          id="login-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="space-y-4"
        >
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
                    disabled={isLoading || isDemoLoading !== null}
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
              return (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor={field.name} className="flex items-center gap-2">
                      <Lock className="h-4 w-4 text-muted-foreground" />
                      Password
                    </Label>
                    <Link
                      href="/forgot-password"
                      className="text-sm text-indigo-600 hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Input
                      id={field.name}
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      disabled={isLoading || isDemoLoading !== null}
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
                  {isInvalid && (
                    <p className="text-sm text-red-500">{field.state.meta.errors.join(", ")}</p>
                  )}
                </div>
              );
            }}
          </form.Field>

          {/* Remember Me */}
          <div className="flex items-center">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded border-gray-300" />
              <span className="text-sm text-muted-foreground">Remember me</span>
            </label>
          </div>

          {/* Sign In Button */}
          <Button
            form="login-form"
            type="submit"
            className="w-full mt-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
            disabled={isLoading || isDemoLoading !== null}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              <>
                <LogIn className="mr-2 h-4 w-4" />
                Sign In
              </>
            )}
          </Button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200 dark:border-slate-800" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white dark:bg-slate-900 px-2 text-muted-foreground">
              Demo Credentials
            </span>
          </div>
        </div>

        {/* Demo Login Buttons */}
        <div className="space-y-3">
          <Button
            type="button"
            variant="outline"
            className="w-full border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 hover:border-indigo-300"
            onClick={() => handleDemoLogin("admin")}
            disabled={isLoading || isDemoLoading !== null}
          >
            {isDemoLoading === "admin" ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <Sparkles className="h-4 w-4 mr-2 text-amber-500" />
            )}
            Admin Demo
          </Button>
          <div className="grid grid-cols-2 gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleDemoLogin("manager")}
              disabled={isLoading || isDemoLoading !== null}
              className="border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-950/30"
            >
              {isDemoLoading === "manager" ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                "Manager Demo"
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleDemoLogin("staff")}
              disabled={isLoading || isDemoLoading !== null}
              className="border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900/30"
            >
              {isDemoLoading === "staff" ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                "Staff Demo"
              )}
            </Button>
          </div>
        </div>

      </CardContent>

      <CardFooter className="flex justify-center p-6 pt-0">
        <p className="text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link href="/register" className="text-indigo-600 hover:underline font-medium">
            Create an account
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}