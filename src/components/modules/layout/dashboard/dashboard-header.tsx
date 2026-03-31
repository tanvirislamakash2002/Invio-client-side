"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
    Bell,
    User,
    LogOut,
    ChevronDown,
    Settings
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { logout } from "@/actions/auth.action";
import Link from "next/link";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    image?: string;
}

interface DashboardHeaderProps {
    user: User;
}

const getBreadcrumbs = (pathname: string) => {
    const segments = pathname.split("/").filter(Boolean);
    const breadcrumbs = [];

    let currentPath = "";
    for (const segment of segments) {
        currentPath += `/${segment}`;
        let label = segment.charAt(0).toUpperCase() + segment.slice(1);
        
        // Custom labels
        if (segment === "restock-queue") label = "Restock Queue";
        if (segment === "activity-log") label = "Activity Log";
        if (segment === "new") label = "Add New";
        
        breadcrumbs.push({
            label,
            href: currentPath,
            isLast: currentPath === pathname
        });
    }

    return breadcrumbs;
};

const getPageTitle = (pathname: string) => {
    const lastSegment = pathname.split("/").filter(Boolean).pop();
    
    switch (lastSegment) {
        case "dashboard": return "Dashboard";
        case "products": return "Products";
        case "new": return "Add Product";
        case "orders": return "Orders";
        case "categories": return "Categories";
        case "restock-queue": return "Restock Queue";
        case "activity-log": return "Activity Log";
        default: return "Invio";
    }
};

export function DashboardHeader({ user }: DashboardHeaderProps) {
    const pathname = usePathname();
    const router = useRouter();
    const [isScrolled, setIsScrolled] = useState(false);
    const breadcrumbs = getBreadcrumbs(pathname);
    const pageTitle = getPageTitle(pathname);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleLogout = async () => {
        const toastId = toast.loading("Logging out...");
        try {
            await logout();
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

    return (
        <header className={`sticky top-0 z-40 w-full transition-all duration-300 ${
            isScrolled 
                ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b shadow-sm" 
                : "bg-background border-b"
        }`}>
            <div className="flex h-16 items-center justify-between px-4 md:px-6 w-full">
                {/* Left Section */}
                <div className="flex items-center gap-2 min-w-0 flex-1">
                    <SidebarTrigger className="-ml-1 flex-shrink-0" />
                    <Separator orientation="vertical" className="h-4 hidden md:block flex-shrink-0" />
                    
                    {/* Breadcrumbs - Desktop */}
                    <div className="hidden md:flex min-w-0 overflow-x-auto scrollbar-none">
                        <Breadcrumb>
                            <BreadcrumbList className="flex-nowrap whitespace-nowrap">
                                <BreadcrumbItem>
                                    <BreadcrumbLink href="/dashboard">
                                        Dashboard
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                {breadcrumbs.length > 0 && (
                                    <BreadcrumbSeparator />
                                )}
                                {breadcrumbs.map((crumb, index) => (
                                    <BreadcrumbItem key={crumb.href}>
                                        {crumb.isLast ? (
                                            <BreadcrumbPage className="truncate max-w-[200px]">
                                                {crumb.label}
                                            </BreadcrumbPage>
                                        ) : (
                                            <>
                                                <BreadcrumbLink href={crumb.href} className="truncate max-w-[150px]">
                                                    {crumb.label}
                                                </BreadcrumbLink>
                                                {index < breadcrumbs.length - 1 && (
                                                    <BreadcrumbSeparator />
                                                )}
                                            </>
                                        )}
                                    </BreadcrumbItem>
                                ))}
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                    
                    {/* Mobile page title */}
                    <span className="text-lg font-semibold md:hidden truncate">
                        {pageTitle}
                    </span>
                </div>
                
                {/* Right Section */}
                <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
                    {/* Theme Toggle */}
                    <ThemeToggle />
                    
                    {/* User Menu */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="flex items-center gap-2 px-2 h-9 flex-shrink-0">
                                <Avatar className="h-7 w-7">
                                    <AvatarImage src={user.image} />
                                    <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-xs">
                                        {getInitials(user.name)}
                                    </AvatarFallback>
                                </Avatar>
                                <span className="hidden md:inline text-sm font-medium max-w-[100px] truncate">
                                    {user.name}
                                </span>
                                <ChevronDown className="h-4 w-4 text-muted-foreground hidden md:block flex-shrink-0" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                            <div className="px-2 py-1.5">
                                <p className="text-sm font-medium truncate">{user.name}</p>
                                <p className="text-xs text-muted-foreground truncate">
                                    {user.email}
                                </p>
                                <p className="text-xs text-indigo-600 mt-1 capitalize">
                                    {user.role.toLowerCase()}
                                </p>
                            </div>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                                <Link href="/profile" className="cursor-pointer">
                                    <User className="mr-2 h-4 w-4 flex-shrink-0" />
                                    <span className="truncate">Profile</span>
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                                onClick={handleLogout} 
                                className="text-red-600 cursor-pointer"
                            >
                                <LogOut className="mr-2 h-4 w-4 flex-shrink-0" />
                                <span className="truncate">Logout</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
}