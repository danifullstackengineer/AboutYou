import Products from "../models/Products.js";

const createProducts = async (_, res) => {
    try {
        for (let i = 0; i < items.length; i++) {
            await new Products({
                backgroundImg: items[i].backgroundImg,
                foregroundImg: items[i].foregroundImg,
                title: items[i].title,
                price: items[i].price,
                colors: items[i].colors,
                sizes: items[i].sizes,
                isCustomizable: items[i].isCustomizable
            }).save().then(async (res) => {
                console.log(`Created product with id: ${res.id}`)
            })
        }
        return res.send("Success!!")
    }
    catch (err) {
        console.error(err);
    }
};

const items = [
  {
    backgroundImg: "/assets/Product/pegasusFirst.jpg",
    foregroundImg: "/assets/Product/pegasusSecond.webp",
    title: "Nike Pegasus",
    price: 39.99,
    colors: ["White", "Black"],
    sizes: [39, 40, 41],
    isCustomizable: false,
  },
  {
    backgroundImg: "/assets/Product/air-max-plus-3First.webp",
    foregroundImg: "/assets/Product/air-max-plus-3Second.webp",
    title: "Nike Air Max Plus 3",
    price: 103.99,
    colors: ["Black", "Purple"],
    sizes: [41, 42, 43, 44, 45],
    isCustomizable: false,
  },
  {
    backgroundImg: "/assets/Product/blazer-mid-77First.webp",
    foregroundImg: "/assets/Product/blazer-mid-77Second.webp",
    title: "Nike Blazer Mid 77",
    price: 499.99,
    colors: ["White", "Red", "Orange"],
    sizes: [42, 43, 44],
    isCustomizable: false,
  },
  {
    backgroundImg: "/assets/Product/air-zoom-pegasusFirst.webp",
    foregroundImg: "/assets/Product/air-zoom-pegasusSecond.webp",
    title: "Nike Air Zoom Pegasus",
    price: 1022.99,
    colors: ["White", "Black", "Purple", "Orange", "Red", "Beige"],
    sizes: [35, 36, 37, 38, 39, 40, 41, 42, 43, 44],
    isCustomizable: false,
  },
  {
    backgroundImg: "/assets/Product/360/",
    foregroundImg: "/assets/Product/360/",
    title: "Nike Pegasus",
    price: 3099.99,
    colors: ["White", "Purple", "Orange"],
    sizes: [39, 40, 41, 42, 43, 44, 45, 46],
    isCustomizable: true,
  },
];

export { createProducts };
