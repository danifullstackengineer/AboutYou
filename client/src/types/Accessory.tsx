export type AccessoryType = {
    _id: string;
    backgroundImg: string;
    title: string;
    price: number;
    likes: number;
    parentId: string[];
    dark: true;
	colors?: string[];
	sizes?: string[]
}
export type AccessoryTypeBasket = AccessoryType & {
	selectedSize: undefined;
	selectedColor: undefined;
	selectedAccessory: undefined;
	customStyle: undefined;
	quantity: number;
}