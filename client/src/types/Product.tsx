import { ExtendedProductType } from '../Context/Basket';
import type {AccessoryType} from './Accessory';
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
    dark?: boolean;
}

export type ProductTypeBasket = ExtendedProductType & {
    selectedSize: ProductType['sizes'][0];
    selectedColor: ProductType['colors'][0];
    selectedAccessory?: AccessoryType;
    customStyle?: FileList[0]
}