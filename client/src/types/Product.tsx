export type ProductType = {
    id: string;
    backgroundImg: string;
    foregroundImg: string;
    title: string;
    price: number;
    colors: string[];
    sizes: number[];
    accessoryId?: string[];
    likes: number;
}