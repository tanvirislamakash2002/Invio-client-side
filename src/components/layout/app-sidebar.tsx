"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar";
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    AlertTriangle,
    Activity,
    Settings,
    LogOut,
    ChevronRight,
    Tags,
    User,
    PlusCircle,
    List
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { logout } from "@/actions/auth.action";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    image?: string;
}

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
    user: User;
}

// Routes based on role
const getRoutes = (role: string) => {
    const commonRoutes = [
        {
            title: "Main",
            items: [
                {
                    title: "Dashboard",
                    url: "/dashboard",
                    icon: LayoutDashboard,
                    roles: ["ADMIN", "MANAGER", "STAFF"]
                },
            ],
        },
        {
            title: "Inventory",
            items: [
                {
                    title: "Products",
                    url: "/products",
                    icon: Package,
                    roles: ["ADMIN", "MANAGER", "STAFF"]
                },
                {
                    title: "Add Product",
                    url: "/products/new",
                    icon: PlusCircle,
                    roles: ["ADMIN", "MANAGER"]
                },
                {
                    title: "Categories",
                    url: "/categories",
                    icon: Tags,
                    roles: ["ADMIN", "MANAGER", "STAFF"]
                },
            ],
        },
        {
            title: "Orders",
            items: [
                {
                    title: "All Orders",
                    url: "/orders",
                    icon: ShoppingCart,
                    roles: ["ADMIN", "MANAGER", "STAFF"]
                },
                {
                    title: "Create Order",
                    url: "/orders/new",
                    icon: PlusCircle,
                    roles: ["ADMIN", "MANAGER", "STAFF"]
                },
            ],
        },
    ];

    const adminManagerRoutes = [
        {
            title: "Management",
            items: [
                {
                    title: "Restock Queue",
                    url: "/restock-queue",
                    icon: AlertTriangle,
                    roles: ["ADMIN", "MANAGER"]
                },
                {
                    title: "Activity Log",
                    url: "/activity-log",
                    icon: Activity,
                    roles: ["ADMIN", "MANAGER"]
                },
            ],
        },
    ];

    const adminOnlyRoutes = [
        {
            title: "Admin",
            items: [
                {
                    title: "User Management",
                    url: "/admin/users",
                    icon: User,
                    roles: ["ADMIN"]
                },
            ],
        },
    ];

    let routes = [...commonRoutes];

    if (role === "ADMIN" || role === "MANAGER") {
        routes = [...routes, ...adminManagerRoutes];
    }

    if (role === "ADMIN") {
        routes = [...routes, ...adminOnlyRoutes];
    }

    return routes;
};

export function AppSidebar({ user, ...props }: AppSidebarProps) {
    const pathname = usePathname();
    const router = useRouter();
    const routes = getRoutes(user.role);

    const isActive = (url: string) => {
        if (url === "/dashboard") return pathname === url;
        return pathname.startsWith(url);
    };

    const handleLogout = async () => {
        const toastId = toast.loading("Logging out...");
        try {
            await authClient.signOut(); 
            toast.success("Logged out successfully", { id: toastId });
            router.push("/login");
            router.refresh();
        } catch (error) {
            toast.error("Failed to logout", { id: toastId });
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

    const getRoleColor = (role: string) => {
        switch (role) {
            case "ADMIN":
                return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
            case "MANAGER":
                return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
            default:
                return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400";
        }
    };

    return (
        <Sidebar collapsible="icon" className="border-r shrink-0 h-screen sticky top-0" {...props}>
            {/* Sidebar Header */}
            <SidebarHeader className="border-b px-4 py-4 h-16 flex-shrink-0">
                <Link href="/dashboard" className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                        <span className="text-white font-bold text-sm">I</span>
                    </div>
                    <span className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent whitespace-nowrap">
                        Invio
                    </span>
                    <span className="text-xs text-muted-foreground hidden group-data-[collapsible=icon]:hidden">
                        {user.role.toLowerCase()}
                    </span>
                </Link>
            </SidebarHeader>

            {/* Sidebar Content */}
            <SidebarContent className="flex-1 overflow-y-auto">
                {routes.map((group) => (
                    <SidebarGroup key={group.title}>
                        <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-wider px-2">
                            {group.title}
                        </SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {group.items.map((item) => {
                                    const Icon = item.icon;
                                    const active = isActive(item.url);

                                    return (
                                        <SidebarMenuItem key={item.title}>
                                            <SidebarMenuButton asChild isActive={active} tooltip={item.title}>
                                                <Link href={item.url} className="flex items-center gap-3">
                                                    <Icon className="h-4 w-4 flex-shrink-0" />
                                                    <span className="truncate">{item.title}</span>
                                                    {active && (
                                                        <ChevronRight className="h-3 w-3 ml-auto flex-shrink-0" />
                                                    )}
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    );
                                })}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>

            {/* Sidebar Footer */}
            <SidebarFooter className="border-t p-4 flex-shrink-0">
                <div className="flex items-center gap-3 mb-3 min-w-0">
                    <Avatar className="h-9 w-9 flex-shrink-0">
                        <AvatarImage src={user.image} />
                        <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
                            {getInitials(user.name)}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0 group-data-[collapsible=icon]:hidden">
                        <p className="text-sm font-medium truncate">{user.name}</p>
                        <p className="text-xs text-muted-foreground truncate">
                            {user.email}
                        </p>
                        <span className={`text-xs px-1.5 py-0.5 rounded-full inline-block mt-1 ${getRoleColor(user.role)}`}>
                            {user.role.toLowerCase()}
                        </span>
                    </div>
                </div>
                <div className="space-y-1">
                    {/* <Button
                        variant="ghost"
                        className="w-full justify-start text-muted-foreground hover:text-foreground"
                        asChild
                    >
                        <Link href="/profile">
                            <User className="h-4 w-4 mr-2 flex-shrink-0" />
                            <span className="group-data-[collapsible=icon]:hidden truncate">Profile</span>
                        </Link>
                    </Button> */}
                    <Button
                        variant="ghost"
                        className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20"
                        onClick={handleLogout}
                    >
                        <LogOut className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span className="group-data-[collapsible=icon]:hidden truncate">Logout</span>
                    </Button>
                </div>
            </SidebarFooter>

            <SidebarRail />
        </Sidebar>
    );
}