import { ProductType } from "../types/Product";
import cloneDeep from 'lodash/cloneDeep';
import { AccessoryType } from "../types/Accessory";

const shuffle = async (array:Array<ProductType>):Promise<Array<ProductType>> => {
    let currentIndex = array.length;
    let randomIndex;
    let newArray = cloneDeep(array);

    while(currentIndex !== 0){
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

       [newArray[currentIndex], newArray[randomIndex]] = [newArray[randomIndex], newArray[currentIndex]]

    }

    return newArray;
}

const shuffle_acc = async (array: Array<AccessoryType>): Promise<Array<AccessoryType>> => {
    let currentIndex = array.length;
    let randomIndex;
    let newArray = cloneDeep(array);

    while(currentIndex !== 0){
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [newArray[currentIndex], newArray[randomIndex]] = [newArray[randomIndex], newArray[currentIndex]]
    }

    return newArray;
}

export {shuffle, shuffle_acc}