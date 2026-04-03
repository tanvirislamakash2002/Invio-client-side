
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { redirect } from "next/navigation";
import { userService } from "@/services/user.service";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { AppSidebar } from "@/components/layout/app-sidebar";

export const dynamic = 'force-dynamic';

export default async function DashboardLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { data, error } = await userService.getSession();

    if (error || !data?.user) {
        redirect("/login?redirect=/dashboard");
    }

    const userInfo = data.user;

    // Staff can access dashboard (view only)
    // Admin and Manager have full access
    // All roles can access dashboard
    if (userInfo.role !== "ADMIN" && userInfo.role !== "MANAGER" && userInfo.role !== "STAFF") {
        redirect("/login");
    }

    return (
        <SidebarProvider defaultOpen={true}>
            <div className="flex h-screen w-full overflow-hidden">
                <AppSidebar user={userInfo} />
                <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                    <DashboardHeader user={userInfo} />
                    <main className="flex-1 overflow-y-auto p-4 md:p-6">
                        {children}
                    </main>
                </div>
            </div>
        </SidebarProvider>
    );
}