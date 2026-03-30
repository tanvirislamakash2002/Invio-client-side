import { RegisterForm } from "@/components/modules/authentication/register-form";
import { Suspense } from "react";

export default function Page() {
    return (
        <Suspense fallback={<div className="text-center py-8">Loading...</div>}>
            <RegisterForm />
        </Suspense>
    );
}