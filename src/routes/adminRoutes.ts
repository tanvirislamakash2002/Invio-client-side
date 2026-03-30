import { Route } from "@/types";

export const adminRoutes: Route[] = [
    {
        title: "Admin Management",
        items: [
            {
                title: "Users",
                url: "/admin/users",
            },
            {
                title: "Categories",
                url: "/admin/categories"
            },
            {
                title: "Orders",
                url: "/admin/orders",
            },
            {
                title: "home",
                url: "/",
            },
        ],
    },
]