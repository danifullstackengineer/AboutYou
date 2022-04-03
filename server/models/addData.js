const items2 = [
  {
    backgroundImg: "/assets/sliderTwo/First/Back/One.webp",
    foregroundImg: "/assets/sliderTwo/First/Fore/One.webp",
    title: "ONLY",
    price: "24.90",
    colors: ["black", "khaki"],
    slideNumber: 1
  },
  {
    backgroundImg: "/assets/sliderTwo/First/Back/Two.webp",
    foregroundImg: "/assets/sliderTwo/First/Fore/Two.webp",
    title: "ONLY",
    price: "54.90",
    colors: ["darkblue", "olive", "black", "darkolivegreen"],
    sizes: ["XS", "S", "M", "L"],
    slideNumber: 1
  },
  {
    backgroundImg: "/assets/sliderTwo/First/Back/Three.webp",
    foregroundImg: "/assets/sliderTwo/First/Fore/Three.webp",
    title: "ONLY",
    price: "54.90",
    colors: [
      "black",
      "red",
      "olive",
      "#C2B280",
      "yellow",
      "orange",
      "pink",
      "#77dd77",
    ],
    sizes: ["XS", "S", "M", "L"],
    slideNumber: 1
  },
  {
    backgroundImg: "/assets/sliderTwo/First/Back/Four.webp",
    foregroundImg: "/assets/sliderTwo/First/Fore/Four.webp",
    title: "ONLY",
    price: "43.90",
    colors: [
      "black",
      "#807D84",
      "white",
      "#541F25",
      "beige",
      "#798C93",
      "yellow",
      "pink",
      "darkgreen",
      "#571C1B",
      "#9A4D4E",
      "#1E1F28",
      "khaki",
      "olive",
      "#8FBEEE",
    ],
    tags: [{ name: "More sustainable" }],
    slideNumber: 1
  },
  {
    backgroundImg: "/assets/sliderTwo/First/Back/Five.webp",
    foregroundImg: "/assets/sliderTwo/First/Fore/Five.webp",
    title: "ONLY",
    price: "32.90",
    colors: ["black", "green"],
    sizes: ["M", "L", "XL", "XXL", "XXXL", "4XL"],
    slideNumber: 1
  },
  {
    backgroundImg: "/assets/sliderTwo/First/Back/Six.webp",
    foregroundImg: "/assets/sliderTwo/First/Fore/Six.webp",
    title: "ONLY",
    price: "27.90",
    colors: ["black", "4F1C22", "beige"],
    slideNumber: 1
  },
  {
    backgroundImg: "/assets/sliderTwo/Second/Back/One.webp",
    foregroundImg: "/assets/sliderTwo/Second/Fore/One.webp",
    tags: [{ name: "Exclusive" }],
    title: "ABOUT YOU LIMITED",
    price: "135.90",
    colors: ["beige", "black"],
    sizes: ["M", "L", "XL", "XXL", "XXXL"],
    slideNumber: 2
  },
  {
    backgroundImg: "/assets/sliderTwo/Second/Back/Two.webp",
    foregroundImg: "/assets/sliderTwo/Second/Fore/Two.webp",
    tags: [{ name: "-12%", special: true }, { name: "Exclusive" }],
    title: "ABOUT YOU LIMITED",
    priceDiscount: { full: "32.90", discount: "28.90" },
    colors: ["white", "red"],
    sizes: ["S", "M", "L"],
    slideNumber: 2
  },
  {
    backgroundImg: "/assets/sliderTwo/Second/Back/Three.webp",
    foregroundImg: "/assets/sliderTwo/Second/Fore/Three.webp",
    tags: [{ name: "New" }, { name: "Exclusive" }],
    title: "ABOUT YOU LIMITED",
    price: "27.90",
    colors: ["#F5F5F5", "beige"],
    sizes: ["XS", "S", "M", "L", "XXL"],
    slideNumber: 2
  },
  {
    backgroundImg: "/assets/sliderTwo/Second/Back/Five.webp",
    foregroundImg: "/assets/sliderTwo/Second/Fore/Five.webp",
    tags: [{ name: "-27%", special: true }, { name: "Exclusive" }],
    title: "ABOUT YOU LIMITED",
    priceDiscount: { full: "32.90", discount: "23.90" },
    colors: ["#C0C1AF", "olive"],
    sizes: ["S", "M", "XL", "XXL"],
    slideNumber: 2
  },
  {
    backgroundImg: "/assets/sliderTwo/Second/Back/Four.webp",
    foregroundImg: "/assets/sliderTwo/Second/Fore/Four.webp",
    tags: [{ name: "-10%", special: true }, { name: "Exclusive" }],
    title: "ABOUT YOU LIMITED",
    priceDiscount: { full: "54.90", discount: "48.90" },
    colors: ["black", "blue", "AB5746"],
    sizes: ["XS", "S", "M", "L"],
    slideNumber: 2
  },
  {
    backgroundImg: "/assets/sliderTwo/Second/Back/Six.webp",
    foregroundImg: "/assets/sliderTwo/Second/Fore/Six.webp",
    tags: [{ name: "-15%", special: true }, { name: "Exclusive" }],
    title: "ABOUT YOU LIMITED",
    priceDiscount: { full: "43.90", discount: "36.90" },
    colors: ["grey", "olive"],
    sizes: ["36", "38"],
    slideNumber: 2
  },
  {
    backgroundImg: "/assets/sliderTwo/Third/Back/One.webp",
    foregroundImg: "/assets/sliderTwo/Third/Fore/One.webp",
    tags: [{ name: "More sustainable" }],
    title: "Y.A.S",
    price: "67.90",
    colors: ["black", "#8AE7BC", "beige", "lavender", "lightblue"],
    sizes: ["36", "38", "42"],
    slideNumber: 3
  },
  {
    backgroundImg: "/assets/sliderTwo/Third/Back/Two.webp",
    foregroundImg: "/assets/sliderTwo/Third/Fore/Two.webp",
    tags: [{ name: "More sustainable" }],
    title: "TOMMY JEANS",
    price: "87.90",
    colors: ["blue"],
    sizes: ["34", "36", "40", "42"],
    slideNumber: 3
  },
  {
    backgroundImg: "/assets/sliderTwo/Third/Back/Three.webp",
    foregroundImg: "/assets/sliderTwo/Third/Fore/Three.webp",
    tags: [{ name: "More sustainable" }],
    title: "VILA",
    price: "43.90",
    colors: [
      "black",
      "#CFC9D3",
      "brown",
      "lavender",
      "navy",
      "khaki",
      "#DAD9C4",
      "#9BA8C8",
    ],
    sizes: ["34", "36", "38"],
    slideNumber: 3
  },
  {
    backgroundImg: "/assets/sliderTwo/Third/Back/Four.webp",
    foregroundImg: "/assets/sliderTwo/Third/Fore/Four.webp",
    tags: [{ name: "More sustainable" }],
    title: "EDITED",
    price: "77.90",
    colors: ["black", "#818087", "beige", "khaki", "#311F1E"],
    sizes: ["XS", "S", "M", "L", "XL"],
    slideNumber: 3
  },
  {
    backgroundImg: "/assets/sliderTwo/Third/Back/Five.webp",
    foregroundImg: "/assets/sliderTwo/Third/Fore/Five.webp",
    tags: [{ name: "Premium" }],
    title: "BOSS CASUAL",
    price: "255.90",
    colors: ["#EFE4CB"],
    sizes: ["34", "36", "38", "40"],
    slideNumber: 3
  },
  {
    backgroundImg: "/assets/sliderTwo/Third/Back/Six.webp",
    foregroundImg: "/assets/sliderTwo/Third/Fore/Six.webp",
    tags: [{ name: "New" }, { name: "More sustainable" }],
    title: "EDITED",
    price: "99.90",
    colors: ["#FE7D7E"],
    sizes: ["34", "36", "38", "40", "42"],
    slideNumber: 3
  },
  {
    backgroundImg: "/assets/sliderTwo/Four/One.webp",
    title: "TOMMY HILFIGER",
    price: "87.90",
    colors: ["darkblue", "#F5EDE5"],
    sizes: ["38", "39", "40", "41", "42"],
    slideNumber: 4
  },
  {
    backgroundImg: "/assets/sliderTwo/Four/Two.webp",
    tags: [{ name: "New" }, { name: "More sustainable" }],
    title: "CALVIN KLEIN",
    price: "87.90",
    colors: ["F6E5CF"],
    sizes: ["36", "38", "39", "40"],
    slideNumber: 4
  },
  {
    backgroundImg: "/assets/sliderTwo/Four/Three.webp",
    tags: [{ name: "New" }],
    title: "TOMS",
    price: "54.90",
    colors: ["#EEDED3"],
    slideNumber: 4
  },
  {
    backgroundImg: "/assets/sliderTwo/Four/Four.webp",
    tags: [{ name: "Premium" }],
    title: "CALVIN KLEIN",
    price: "109.90",
    colors: ["#A66827"],
    sizes: ["38"],
    slideNumber: 4
  },
  {
    backgroundImg: "/assets/sliderTwo/Four/Five.webp",
    tags: [{ name: "Premium" }],
    title: "BIANCO",
    price: "87.90",
    colors: ["beige", "black", "#A66827"],
    sizes: ["36", "37", "38", "39", "41"],
    slideNumber: 4
  },
  {
    backgroundImg: "/assets/sliderTwo/Four/Six.webp",
    tags: [{ name: "New" }],
    title: "TOMS",
    price: "62.90",
    colors: ["#E1D1B2"],
    slideNumber: 4
  },
  {
    backgroundImg: "/assets/sliderTwo/Five/Back/One.webp",
    foregroundImg: "/assets/sliderTwo/Five/Fore/One.webp",
    tags: [{ name: "Exclusive" }],
    title: "LEGER BY LENA GERCKE",
    price: "67.90",
    colors: ["black"],
    sizes: ["XS", "S", "L", "XL", "XXL"],
    slideNumber: 5
  },
  {
    backgroundImg: "/assets/sliderTwo/Five/Back/Two.webp",
    foregroundImg: "/assets/sliderTwo/Five/Fore/Two.webp",
    tags: [{ name: "Exclusive" }, { name: "More sustainable" }],
    title: "LEGER BY LENA GERCKE",
    price: "38.90",
    colors: ["black", "beige", "#6B6A6B", "brown", "#602D2F"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    slideNumber: 5
  },
  {
    backgroundImg: "/assets/sliderTwo/Five/Back/Three.webp",
    foregroundImg: "/assets/sliderTwo/Five/Fore/Three.webp",
    tags: [{ name: "Exclusive" }],
    title: "LEGER BY LENA GERCKE",
    price: "27.90",
    colors: ["#663300"],
    sizes: ["34", "38", "40", "42", "44"],
    slideNumber: 5
  },
  {
    backgroundImg: "/assets/sliderTwo/Five/Back/Four.webp",
    foregroundImg: "/assets/sliderTwo/Five/Fore/Four.webp",
    tags: [{ name: "Exclusive" }],
    title: "LEGER BY LENA GERCKE",
    price: "27.90",
    colors: ["#EFE4CB", "black"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    slideNumber: 5
  },
  {
    backgroundImg: "/assets/sliderTwo/Five/Back/Five.webp",
    foregroundImg: "/assets/sliderTwo/Five/Fore/Five.webp",
    tags: [{ name: "New" }, { name: "Exclusive" }],
    title: "LEGER BY LENA GERCKE",
    price: "67.90",
    colors: ["#EFE4CB", "#008B8B"],
    sizes: ["34", "36", "38", "40"],
    slideNumber: 5
  },
  {
    backgroundImg: "/assets/sliderTwo/Five/Back/Six.webp",
    foregroundImg: "/assets/sliderTwo/Five/Fore/Six.webp",
    tags: [{ name: "New" }, { name: "Exclusive" }],
    title: "LEGER BY LENA GERCKE",
    price: "67.90",
    colors: ["green", "black", "beige"],
    sizes: ["34", "36", "38", "40", "42", "44"],
    slideNumber: 5
  },
  {
    backgroundImg: "/assets/sliderTwo/Six/Back/One.webp",
    foregroundImg: "/assets/sliderTwo/Six/Fore/One.webp",
    title: "ATHLECIA",
    price: "36.90",
    colors: ["black"],
    sizes: ["XS", "M", "L", "XL", "XXL"],
    slideNumber: 6
  },
  {
    backgroundImg: "/assets/sliderTwo/Six/Back/Two.webp",
    foregroundImg: "/assets/sliderTwo/Six/Fore/Two.webp",
    title: "ATHLECIA",
    price: "29.90",
    colors: ["black", "white"],
    sizes: ["XS", "S", "L"],
    slideNumber: 6
  },
  {
    backgroundImg: "/assets/sliderTwo/Six/Back/Three.webp",
    foregroundImg: "/assets/sliderTwo/Six/Fore/Three.webp",
    title: "ATHLECIA",
    price: "43.90",
    colors: ["brown"],
    sizes: ["M", "L", "XL", "XXL"],
    slideNumber: 6
  },
  {
    backgroundImg: "/assets/sliderTwo/Six/Back/Four.webp",
    foregroundImg: "/assets/sliderTwo/Six/Fore/Four.webp",
    title: "ATHLECIA",
    price: "27.90",
    colors: ["darkblue", "black"],
    sizes: ["XXS-XS", "S-M", "L-XL"],
    slideNumber: 6
  },
  {
    backgroundImg: "/assets/sliderTwo/Six/Back/Five.webp",
    foregroundImg: "/assets/sliderTwo/Six/Fore/Five.webp",
    title: "ATHLECIA",
    price: "27.90",
    colors: ["black"],
    sizes: ["XL", "XXL"],
    slideNumber: 6
  },
  {
    backgroundImg: "/assets/sliderTwo/Six/Back/Six.webp",
    foregroundImg: "/assets/sliderTwo/Six/Fore/Six.webp",
    title: "ATHLECIA",
    price: "54.90",
    colors: ["black"],
    slideNumber: 6
  },
  {
    backgroundImg: "/assets/sliderTwo/Seven/Back/One.webp",
    foregroundImg: "/assets/sliderTwo/Seven/Fore/One.webp",
    tags: [{ name: "More sustainable" }],
    title: "PIECES",
    price: "21.90",
    colors: [
      "black",
      "green",
      "white",
      "#4A515E",
      "#8A3D3C",
      "olive",
      "#E6E0EE",
      "#799199",
      "#95A7CE",
      "#7B939D",
      "B195C3",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    slideNumber: 7
  },
  {
    backgroundImg: "/assets/sliderTwo/Seven/Back/Two.webp",
    foregroundImg: "/assets/sliderTwo/Seven/Fore/Two.webp",
    title: "VERO MODA AWARE",
    price: "16.90",
    colors: ["black", "blue", "white", "#E1E1DF"],
    sizes: ["XS", "S", "M", "L", "XL"],
    slideNumber: 7
  },
  {
    backgroundImg: "/assets/sliderTwo/Seven/Back/Three.webp",
    foregroundImg: "/assets/sliderTwo/Seven/Fore/Three.webp",
    title: "RICH & ROYAL",
    price: "41.90",
    colors: ["black", "white"],
    sizes: ["XS", "S", "M", "L"],
    slideNumber: 7
  },
  {
    backgroundImg: "/assets/sliderTwo/Seven/Back/Four.webp",
    foregroundImg: "/assets/sliderTwo/Seven/Fore/Four.webp",
    tags: [{ name: "More sustainable" }],
    title: "ROSEMUNDE",
    price: "54.90",
    colors: ["black", "blue", "white", "beige"],
    sizes: ["S", "M", "L", "XL"],
    slideNumber: 7
  },
  {
    backgroundImg: "/assets/sliderTwo/Seven/Back/Five.webp",
    foregroundImg: "/assets/sliderTwo/Seven/Fore/Five.webp",
    tags: [{ name: "2-pack" }],
    title: "ONLY",
    price: "16.90",
    colors: ["black", "blue", "brown"],
    sizes: ["XS", "S", "M", "L", "XL"],
    slideNumber: 7
  },
  {
    backgroundImg: "/assets/sliderTwo/Seven/Back/Six.webp",
    foregroundImg: "/assets/sliderTwo/Seven/Fore/Six.webp",
    tags: [{ name: "New" }, { name: "2-pack" }],
    title: "EDITED",
    price: "32.90",
    colors: ["beige", "white", "black"],
    sizes: ["XS", "M", "L", "XL"],
    slideNumber: 7
  },
  {
    backgroundImg: "/assets/sliderTwo/Eight/Back/One.webp",
    foregroundImg: "/assets/sliderTwo/Eight/Fore/One.webp",
    title: "VILA",
    price: "43.90",
    colors: ["black", "white", "pink", "cyan"],
    sizes: ["XS", "S"],
    slideNumber: 8
  },
  {
    backgroundImg: "/assets/sliderTwo/Eight/Back/Two.webp",
    foregroundImg: "/assets/sliderTwo/Eight/Fore/Two.webp",
    tags: [{ name: "Mom" }, { name: "With nursing function" }],
    title: "MAMALICIOUS",
    price: "38.90",
    colors: ["blue", "white"],
    sizes: ["XS", "XL"],
    slideNumber: 8
  },
  {
    backgroundImg: "/assets/sliderTwo/Eight/Back/Three.webp",
    foregroundImg: "/assets/sliderTwo/Eight/Fore/Three.webp",
    tags: [{ name: "More sustainable" }],
    title: "KAFFE",
    price: "54.90",
    colors: ["green", "blue"],
    sizes: ["XS", "S", "M", "XXL", "XXXL"],
    slideNumber: 8
  },
  {
    backgroundImg: "/assets/sliderTwo/Eight/Back/Four.webp",
    foregroundImg: "/assets/sliderTwo/Eight/Fore/Four.webp",
    tags: [{ name: "Curvy" }],
    title: "ONLY CARMAKOMA",
    price: "41.90",
    colors: ["darkblue", "beige"],
    sizes: ["6XL", "7XL"],
    slideNumber: 8
  },
  {
    backgroundImg: "/assets/sliderTwo/Eight/Back/Five.webp",
    foregroundImg: "/assets/sliderTwo/Eight/Fore/Five.webp",
    title: "IZIA",
    price: "189.95",
    colors: ["darkgreen", "black", "pink"],
    sizes: ["XS-S", "M-L", "XL-XXL"],
    slideNumber: 8
  },
  {
    backgroundImg: "/assets/sliderTwo/Eight/Back/Six.webp",
    foregroundImg: "/assets/sliderTwo/Eight/Fore/Six.webp",
    tags: [{ name: "New" }, { name: "Curvy" }],
    title: "ONLY CARMAKOMA",
    price: "27.90",
    colors: ["black"],
    slideNumber: 8
  },
];
const items = [
  {
    image: "/assets/sliderOne/First/one.webp",
    button: true,
    heart: false,
    lastSlide: false,
    title1: "Make it colorful",
    title2: "Suit up",
    slideNumber: 1
  },
  {
    image: "/assets/sliderOne/First/two.webp",
    button: true,
    heart: false,
    lastSlide: false,
    title1: "New style codes",
    title2: "Color Blocking",
    slideNumber: 1
  },
  {
    image: "/assets/sliderOne/First/three.webp",
    button: true,
    heart: false,
    lastSlide: false,
    title1: "Color Divergent",
    title2: "All black outfits",
    slideNumber: 1
  },
  {
    image: "/assets/sliderOne/First/four.webp",
    button: true,
    heart: false,
    lastSlide: false,
    title1: "1 material, many looks",
    title2: "Knitted sets",
    slideNumber: 1
  },
  {
    image: "/assets/sliderOne/First/five.webp",
    button: true,
    heart: false,
    lastSlide: false,
    title1: "Stolen looks from your dads closet",
    title2: "Dad-Style",
    slideNumber: 1
  },
  {
    image: "/assets/dropdown/placeholder.jpg",
    button: false,
    heart: false,
    lastSlide: true,
    title1: "Stories",
    title2: "Discover now",
    slideNumber: 1
  },
  {
    image: "/assets/sliderOne/Second/one.webp",
    button: false,
    heart: true,
    lastSlide: false,
    title1: "Lilia for LeGer by Lena Gercke",
    title2: "Asymmetrical Shirt Look by LeGer by Lena Gercke",
    slideNumber: 2
  },
  {
    image: "/assets/sliderOne/Second/two.webp",
    button: false,
    heart: true,
    lastSlide: false,
    title1: "Roseanna",
    title2: "Green Look by GMK Curvy Collection",
    slideNumber: 2
  },
  {
    image: "/assets/sliderOne/Second/three.webp",
    button: false,
    heart: true,
    lastSlide: false,
    title1: "Lilia for LeGer by Lena Gercke",
    title2: "Colorful Windbreaker Look by LeGer by Lena Gerck",
    slideNumber: 2
  },
  {
    image: "/assets/sliderOne/Second/four.webp",
    button: false,
    heart: true,
    lastSlide: false,
    title1: "Roseanna",
    title2: "Romantic Dress Look by GMK Curvy Collection",
    slideNumber: 2
  },
  {
    image: "/assets/sliderOne/Second/five.webp",
    button: false,
    heart: true,
    lastSlide: false,
    title1: "Lilly-Marie",
    title2: "Short Business Look by GMK Collection",
    slideNumber: 2
  },
  {
    image: "/assets/sliderOne/Third/one.webp",
    button: true,
    heart: false,
    lastSlide: false,
    title1: "For wedding guests",
    title2: "Cocktail Dresses",
    slideNumber: 3
  },
  {
    image: "/assets/sliderOne/Third/two.webp",
    button: true,
    heart: false,
    lastSlide: false,
    title1: "Color guide for",
    title2: "Wedding Guests",
    slideNumber: 3
  },
  {
    image: "/assets/sliderOne/Third/three.webp",
    button: true,
    heart: false,
    lastSlide: false,
    title1: "For a beautiful figure",
    title2: "Evening Dresses",
    slideNumber: 3
  },
  {
    image:"/assets/sliderOne/Third/four.webp",
    button: true,
    heart: false,
    lastSlide: false,
    title1: "For the bridesmaids & wedding guests",
    title2: "Fancy dresses",
    slideNumber: 3
  },
  {
    image: "/assets/sliderOne/Third/five.webp",
    button: true,
    heart: false,
    lastSlide: false,
    title1: "For the bride",
    title2: "Wedding Guide",
    slideNumber: 3
  },
  {
    image: "/assets/dropdown/placeholder.jpg",
    button: false,
    heart: false,
    lastSlide: true,
    title1: "Stories",
    title2: "Discover now",
    slideNumber: 3
  },
  {
    image: "/assets/sliderOne/Four/One.webp",
    button: false,
    heart: true,
    lastSlide: false,
    title1: "Lena Gercke",
    title2: "Beige Cotton Dress Look by LeGer by Lena Gercke",
    slideNumber: 4
  },
  {
    image: "/assets/sliderOne/Four/Two.webp",
    button: false,
    heart: true,
    lastSlide: false,
    title1: "Tina Neumann for AY Limited",
    title2: "Girly Look by ABOUT YOU Limited",
    slideNumber: 4
  },
  {
    image: "/assets/sliderOne/Four/Three.webp",
    button: false,
    heart: true,
    lastSlide: false,
    title1: "Lilly-Marie",
    title2: "Romantic Dress by GMK Collection",
    slideNumber: 4
  },
  {
    image: "/assets/sliderOne/Four/Four.webp",
    button: false,
    heart: true,
    lastSlide: false,
    title1: "Laura Giurcanu",
    title2: "Taupe Coat Dress Look by ABOUT YOU x Laura Giu",
    slideNumber: 4
  },
  {
    image: "/assets/sliderOne/Four/Five.webp",
    button: false,
    heart: true,
    lastSlide: false,
    title1: "Alina Eremia",
    title2: "Cutout Dress Look by ABOUT YOU x Alina Eremia",
    slideNumber: 4
  },
  {
    image: "/assets/sliderOne/Five/One.jpg",
    button: true,
    heart: false,
    lastSlide: false,
    specialTitle: "ONLY",
    buttonName: "Discover the brand",
    slideNumber: 5
  },
  {
    image: "/assets/sliderOne/Five/Two.jpg",
    button: true,
    heart: false,
    lastSlide: false,
    specialTitle: "LeGer by Lena Gercke",
    buttonName: "Discover the brand",
    slideNumber: 5
  },
  {
    image: "/assets/sliderOne/Five/Three.jpg",
    button: true,
    heart: false,
    lastSlide: false,
    specialTitle: "ABOUT YOU",
    buttonName: "Discover the brand",
    slideNumber: 5
  },
  {
    image: "/assets/sliderOne/Five/Four.jpg",
    button: true,
    heart: false,
    lastSlide: false,
    specialTitle: "ABOUT YOU Limited",
    buttonName: "Discover the brand",
    slideNumber: 5
  },
  {
    image: "/assets/sliderOne/Five/Five.jpg",
    button: true,
    heart: false,
    lastSlide: false,
    specialTitle: "Athlecia",
    buttonName: "Discover the brand",
    slideNumber: 5
  },
  {
    image: "/assets/sliderOne/Five/Six.jpg",
    button: true,
    heart: false,
    lastSlide: false,
    specialTitle: "LIU JO Jeans",
    buttonName: "Discover the brand",
    slideNumber: 5
  },
  {
    image: "/assets/sliderOne/Six/One.webp",
    button: false,
    heart: true,
    lastSlide: false,
    title1: "Lena Gercke",
    title2: "White Wrap Look by LeGer by Lena Gercke",
    slideNumber: 6
  },
  {
    image: "/assets/sliderOne/Six/Two.webp",
    button: false,
    heart: true,
    lastSlide: false,
    title1: "Tina Neumann for AY Limited",
    title2: "Streetstyle Look by ABOUT YOU Limited",
    slideNumber: 6
  },
  {
    image: "/assets/sliderOne/Six/Three.webp",
    button: false,
    heart: true,
    lastSlide: false,
    title1: "Lena Gercke",
    title2: "Chic Black Look by LeGer by Lena Gercke",
    slideNumber: 6
  },
  {
    image: "/assets/sliderOne/Six/Four.webp",
    button: false,
    heart: true,
    lastSlide: false,
    title1: "Tara Zoe",
    title2: "Basic Denim Look by GMK Collection",
    slideNumber: 6
  },
  {
    image: "/assets/sliderOne/Six/Five.webp",
    button: false,
    heart: true,
    lastSlide: false,
    title1: "Lea",
    title2: "Comfy Pants Look",
    slideNumber: 6
  },
]


import SliderTwoProduct from "./SliderTwo.js";
import SliderOneProduct from './SliderOne.js';

const saveItemsToDb = () => {
  for (let i = 0; i < items.length; i++){
    const item = new SliderOneProduct(items[i])
    item.save();
  }
}

const saveItemsToDb2 = () => {
  for (let i = 0; i < items2.length; i++) {
      const item = new SliderTwoProduct(items2[i]);
      item.save();
  }
};

export { saveItemsToDb2, saveItemsToDb };
