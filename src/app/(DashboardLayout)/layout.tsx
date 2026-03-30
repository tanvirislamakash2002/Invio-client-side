// dashboard-layout.tsx
import { AppSidebar } from "@/components/layout/dashboard/app-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { userService } from "@/services/user.service";
import { redirect } from "next/navigation";
import { Roles } from "@/constants/roles";
import { DashboardHeader } from "@/components/layout/dashboard/dashboard-header";

export const dynamic = 'force-dynamic';

// dashboard-layout.tsx
export default async function DashboardLayout({
    seller,
    admin
}: Readonly<{
    seller: React.ReactNode;
    admin: React.ReactNode;
}>) {
    const { data, error } = await userService.getSession();
    
    if (error || !data?.user) {
        redirect("/login?redirect=/dashboard");
    }
    
    const userInfo = data.user;
    
    if (userInfo.role !== Roles.seller && userInfo.role !== Roles.admin) {
        redirect("/shop");
    }
    
    return (
        <SidebarProvider defaultOpen={true}>
            <div className="flex h-screen w-full overflow-hidden">
                <AppSidebar user={userInfo} />
                <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                    <DashboardHeader user={userInfo} />
                    <main className="flex-1 overflow-y-auto p-4 md:p-6">
                        {userInfo.role === Roles.seller && seller}
                        {userInfo.role === Roles.admin && admin}
                    </main>
                </div>
            </div>
        </SidebarProvider>
    );
}