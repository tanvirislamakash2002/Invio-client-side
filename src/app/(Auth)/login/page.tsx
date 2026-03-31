import { LoginForm } from "@/components/modules/auth/login-form";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="text-center py-8">Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}