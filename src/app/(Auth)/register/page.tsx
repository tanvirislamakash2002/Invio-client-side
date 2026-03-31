import { RegisterForm } from "@/components/modules/auth/register-form";
import { Suspense } from "react";

export default function Register() {
  return (
    <Suspense fallback={<div className="text-center py-8">Loading...</div>}>
      <RegisterForm />
    </Suspense>
  );
}