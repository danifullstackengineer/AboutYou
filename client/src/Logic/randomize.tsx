import { ProductType } from "../types/Product";
import cloneDeep from 'lodash/cloneDeep';

const shuffle = (array:Array<ProductType>):Array<ProductType> => {
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

export default shuffle;