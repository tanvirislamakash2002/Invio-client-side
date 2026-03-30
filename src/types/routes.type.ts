export interface Route {
    title: string;
    items: {
        title: string;
        url: string;
        icon?: React.ElementType;
    }[];
}