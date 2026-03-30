import { LoginForm } from "@/components/modules/authentication/login-form";
import { Suspense } from "react";

export default function Page() {
    return (
        <Suspense fallback={<div className="text-center py-8">Loading...</div>}>
            <LoginForm />
        </Suspense>
    );
}