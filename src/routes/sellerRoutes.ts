import { Route } from "@/types";

export const sellerRoutes: Route[] = [
    {
        title: "Seller Management",
        items: [
            {
                title: "Dashboard",
                url: "/seller/dashboard",
            },
            {
                title: "Medicines",
                url: "/seller/medicines"
            },
            {
                title: "Orders",
                url: "/seller/orders",
            },
            {
                title: "home",
                url: "/",
            },
        ],
    },

]