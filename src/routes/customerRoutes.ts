import { Route } from "@/types";

export const customerRoutes: Route[] = [
    {
        title: "Customer Management",
        items: [
            {
                title: "Cart",
                url: "/cart",
            },
            {
                title: "Checkout",
                url: "/checkout",
            },
            {
                title: "Orders",
                url: "/orders",
            },
            {
                title: "home",
                url: "/",
            },
        ],
    },

]