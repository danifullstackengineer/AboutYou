import React, { useState } from "react";
import "../../styles/components/Body/BodyInner.css";
import SingleImage from "./SingleImage";
import TopCategories from "./TopCategories";
import slider5 from "../../assets/jpeg/slider5.webp";
import singleImage1 from "../../assets/misc/singleImage1.webp";
import singleImage2 from "../../assets/misc/singleImage2.webp";
import singleImage3 from "../../assets/misc/singleImage3.webp";
import singleImage4 from "../../assets/misc/singleImage4.webp";
import TitleInner from "./TitleInner";
import SliderTypeOne from "./SliderTypeOne";
import SliderTypeTwo from "./SliderTypeTwo";

//slider--imgm
import slideTypeOneFirst1 from "../../assets/sliderOne/First/one.webp";
import slideTypeOneFirst2 from "../../assets/sliderOne/First/two.webp";
import sliderTypeOneFirst3 from "../../assets/sliderOne/First/three.webp";
import sliderTypeOneFirst4 from "../../assets/sliderOne/First/four.webp";
import sliderTypeOneFirst5 from "../../assets/sliderOne/First/five.webp";
import sliderTypeOneFirstPlaceholder from "../../assets/dropdown/placeholder.jpg";

import sliderTypeOneSecond1 from "../../assets/sliderOne/Second/one.webp";
import sliderTypeOneSecond2 from "../../assets/sliderOne/Second/two.webp";
import sliderTypeOneSecond3 from "../../assets/sliderOne/Second/three.webp";
import sliderTypeOneSecond4 from "../../assets/sliderOne/Second/four.webp";
import sliderTypeOneSecond5 from "../../assets/sliderOne/Second/five.webp";

import sliderTypeOneThree1 from "../../assets/sliderOne/Third/one.webp";
import sliderTypeOneThree2 from "../../assets/sliderOne/Third/two.webp";
import sliderTypeOneThree3 from "../../assets/sliderOne/Third/three.webp";
import sliderTypeOneThree4 from "../../assets/sliderOne/Third/four.webp";
import sliderTypeOneThree5 from "../../assets/sliderOne/Third/five.webp";
import sliderTypeOneThreePlaceholder from "../../assets/dropdown/placeholder.jpg";

import sliderTypeOneFour1 from "../../assets/sliderOne/Four/One.webp";
import sliderTypeOneFour2 from "../../assets/sliderOne/Four/Two.webp";
import sliderTypeOneFour3 from "../../assets/sliderOne/Four/Three.webp";
import sliderTypeOneFour4 from "../../assets/sliderOne/Four/Four.webp";
import sliderTypeOneFour5 from "../../assets/sliderOne/Four/Five.webp";

import sliderTypeOneFive1 from "../../assets/sliderOne/Five/One.jpg";
import sliderTypeOneFive2 from "../../assets/sliderOne/Five/Two.jpg";
import sliderTypeOneFive3 from "../../assets/sliderOne/Five/Three.jpg";
import sliderTypeOneFive4 from "../../assets/sliderOne/Five/Four.jpg";
import sliderTypeOneFive5 from "../../assets/sliderOne/Five/Five.jpg";
import sliderTypeOneFive6 from "../../assets/sliderOne/Five/Six.jpg";

import sliderTypeOneSix1 from "../../assets/sliderOne/Six/One.webp";
import sliderTypeOneSix2 from "../../assets/sliderOne/Six/Two.webp";
import sliderTypeOneSix3 from "../../assets/sliderOne/Six/Three.webp";
import sliderTypeOneSix4 from "../../assets/sliderOne/Six/Four.webp";
import sliderTypeOneSix5 from "../../assets/sliderOne/Six/Five.webp";

// slider-two-img
import sliderTypeTwoBGFirst1 from "../../assets/sliderTwo/First/Back/One.webp";
import sliderTypeTwoBGFirst2 from "../../assets/sliderTwo/First/Back/Two.webp";
import sliderTypeTwoBGFirst3 from "../../assets/sliderTwo/First/Back/Three.webp";
import sliderTypeTwoBGFirst4 from "../../assets/sliderTwo/First/Back/Four.webp";
import sliderTypeTwoBGFirst5 from "../../assets/sliderTwo/First/Back/Five.webp";
import sliderTypeTwoBGFirst6 from "../../assets/sliderTwo/First/Back/Six.webp";
import sliderTypeTwoFGFirst1 from "../../assets/sliderTwo/First/Fore/One.webp";
import sliderTypeTwoFGFirst2 from "../../assets/sliderTwo/First/Fore/Two.webp";
import sliderTypeTwoFGFirst3 from "../../assets/sliderTwo/First/Fore/Three.webp";
import sliderTypeTwoFGFirst4 from "../../assets/sliderTwo/First/Fore/Four.webp";
import sliderTypeTwoFGFirst5 from "../../assets/sliderTwo/First/Fore/Five.webp";
import sliderTypeTwoFGFirst6 from "../../assets/sliderTwo/First/Fore/Six.webp";

import sliderTypeTwoBGSecond1 from "../../assets/sliderTwo/Second/Back/One.webp";
import sliderTypeTwoBGSecond2 from "../../assets/sliderTwo/Second/Back/Two.webp";
import sliderTypeTwoBGSecond3 from "../../assets/sliderTwo/Second/Back/Three.webp";
import sliderTypeTwoBGSecond4 from "../../assets/sliderTwo/Second/Back/Four.webp";
import sliderTypeTwoBGSecond5 from "../../assets/sliderTwo/Second/Back/Five.webp";
import sliderTypeTwoBGSecond6 from "../../assets/sliderTwo/Second/Back/Six.webp";
import sliderTypeTwoFGSecond1 from "../../assets/sliderTwo/Second/Fore/One.webp";
import sliderTypeTwoFGSecond2 from "../../assets/sliderTwo/Second/Fore/Two.webp";
import sliderTypeTwoFGSecond3 from "../../assets/sliderTwo/Second/Fore/Three.webp";
import sliderTypeTwoFGSecond4 from "../../assets/sliderTwo/Second/Fore/Four.webp";
import sliderTypeTwoFGSecond5 from "../../assets/sliderTwo/Second/Fore/Five.webp";
import sliderTypeTwoFGSecond6 from "../../assets/sliderTwo/Second/Fore/Six.webp";

import sliderTypeTwoBGThird1 from "../../assets/sliderTwo/Third/Back/One.webp";
import sliderTypeTwoBGThird3 from "../../assets/sliderTwo/Third/Back/Three.webp";
import sliderTypeTwoBGThird2 from "../../assets/sliderTwo/Third/Back/Two.webp";
import sliderTypeTwoBGThird4 from "../../assets/sliderTwo/Third/Back/Four.webp";
import sliderTypeTwoBGThird5 from "../../assets/sliderTwo/Third/Back/Five.webp";
import sliderTypeTwoBGThird6 from "../../assets/sliderTwo/Third/Back/Six.webp";
import sliderTypeTwoFGThird1 from "../../assets/sliderTwo/Third/Fore/One.webp";
import sliderTypeTwoFGThird2 from "../../assets/sliderTwo/Third/Fore/Two.webp";
import sliderTypeTwoFGThird3 from "../../assets/sliderTwo/Third/Fore/Three.webp";
import sliderTypeTwoFGThird4 from "../../assets/sliderTwo/Third/Fore/Four.webp";
import sliderTypeTwoFGThird5 from "../../assets/sliderTwo/Third/Fore/Five.webp";
import sliderTypeTwoFGThird6 from "../../assets/sliderTwo/Third/Fore/Six.webp";

import sliderTypeTwoBGFour1 from "../../assets/sliderTwo/Four/One.webp";
import sliderTypeTwoBGFour3 from "../../assets/sliderTwo/Four/Three.webp";
import sliderTypeTwoBGFour2 from "../../assets/sliderTwo/Four/Two.webp";
import sliderTypeTwoBGFour4 from "../../assets/sliderTwo/Four/Four.webp";
import sliderTypeTwoBGFour5 from "../../assets/sliderTwo/Four/Five.webp";
import sliderTypeTwoBGFour6 from "../../assets/sliderTwo/Four/Six.webp";

import sliderTypeTwoBGFive1 from "../../assets/sliderTwo/Five/Back/One.webp";
import sliderTypeTwoBGFive3 from "../../assets/sliderTwo/Five/Back/Three.webp";
import sliderTypeTwoBGFive2 from "../../assets/sliderTwo/Five/Back/Two.webp";
import sliderTypeTwoBGFive4 from "../../assets/sliderTwo/Five/Back/Four.webp";
import sliderTypeTwoBGFive5 from "../../assets/sliderTwo/Five/Back/Five.webp";
import sliderTypeTwoBGFive6 from "../../assets/sliderTwo/Five/Back/Six.webp";
import sliderTypeTwoFGFive1 from "../../assets/sliderTwo/Five/Fore/One.webp";
import sliderTypeTwoFGFive2 from "../../assets/sliderTwo/Five/Fore/Two.webp";
import sliderTypeTwoFGFive3 from "../../assets/sliderTwo/Five/Fore/Three.webp";
import sliderTypeTwoFGFive4 from "../../assets/sliderTwo/Five/Fore/Four.webp";
import sliderTypeTwoFGFive5 from "../../assets/sliderTwo/Five/Fore/Five.webp";
import sliderTypeTwoFGFive6 from "../../assets/sliderTwo/Five/Fore/Six.webp";

import sliderTypeTwoBGSix1 from "../../assets/sliderTwo/Six/Back/One.webp";
import sliderTypeTwoBGSix2 from "../../assets/sliderTwo/Six/Back/Two.webp";
import sliderTypeTwoBGSix3 from "../../assets/sliderTwo/Six/Back/Three.webp";
import sliderTypeTwoBGSix4 from "../../assets/sliderTwo/Six/Back/Four.webp";
import sliderTypeTwoBGSix5 from "../../assets/sliderTwo/Six/Back/Five.webp";
import sliderTypeTwoBGSix6 from "../../assets/sliderTwo/Six/Back/Six.webp";
import sliderTypeTwoFGSix1 from "../../assets/sliderTwo/Six/Fore/One.webp";
import sliderTypeTwoFGSix2 from "../../assets/sliderTwo/Six/Fore/Two.webp";
import sliderTypeTwoFGSix3 from "../../assets/sliderTwo/Six/Fore/Three.webp";
import sliderTypeTwoFGSix4 from "../../assets/sliderTwo/Six/Fore/Four.webp";
import sliderTypeTwoFGSix5 from "../../assets/sliderTwo/Six/Fore/Five.webp";
import sliderTypeTwoFGSix6 from "../../assets/sliderTwo/Six/Fore/Six.webp";

import sliderTypeTwoBGSeven1 from "../../assets/sliderTwo/Seven/Back/One.webp";
import sliderTypeTwoBGSeven2 from "../../assets/sliderTwo/Seven/Back/Two.webp";
import sliderTypeTwoBGSeven3 from "../../assets/sliderTwo/Seven/Back/Three.webp";
import sliderTypeTwoBGSeven4 from "../../assets/sliderTwo/Seven/Back/Four.webp";
import sliderTypeTwoBGSeven5 from "../../assets/sliderTwo/Seven/Back/Five.webp";
import sliderTypeTwoBGSeven6 from "../../assets/sliderTwo/Seven/Back/Six.webp";
import sliderTypeTwoFGSeven1 from "../../assets/sliderTwo/Seven/Fore/One.webp";
import sliderTypeTwoFGSeven2 from "../../assets/sliderTwo/Seven/Fore/Two.webp";
import sliderTypeTwoFGSeven3 from "../../assets/sliderTwo/Seven/Fore/Three.webp";
import sliderTypeTwoFGSeven4 from "../../assets/sliderTwo/Seven/Fore/Four.webp";
import sliderTypeTwoFGSeven5 from "../../assets/sliderTwo/Seven/Fore/Five.webp";
import sliderTypeTwoFGSeven6 from "../../assets/sliderTwo/Seven/Fore/Six.webp";

import sliderTypeTwoBGEight1 from "../../assets/sliderTwo/Eight/Back/One.webp";
import sliderTypeTwoBGEight2 from "../../assets/sliderTwo/Eight/Back/Two.webp";
import sliderTypeTwoBGEight3 from "../../assets/sliderTwo/Eight/Back/Three.webp";
import sliderTypeTwoBGEight4 from "../../assets/sliderTwo/Eight/Back/Four.webp";
import sliderTypeTwoBGEight5 from "../../assets/sliderTwo/Eight/Back/Five.webp";
import sliderTypeTwoBGEight6 from "../../assets/sliderTwo/Eight/Back/Six.webp";
import sliderTypeTwoFGEight1 from "../../assets/sliderTwo/Eight/Fore/One.webp";
import sliderTypeTwoFGEight2 from "../../assets/sliderTwo/Eight/Fore/Two.webp";
import sliderTypeTwoFGEight3 from "../../assets/sliderTwo/Eight/Fore/Three.webp";
import sliderTypeTwoFGEight4 from "../../assets/sliderTwo/Eight/Fore/Four.webp";
import sliderTypeTwoFGEight5 from "../../assets/sliderTwo/Eight/Fore/Five.webp";
import sliderTypeTwoFGEight6 from "../../assets/sliderTwo/Eight/Fore/Six.webp";
import FooterInner from "./FooterInner";

function BodyInner() {
  const [single1, setSingle1] = useState<{
    info: { title1: string; title2: string; bgColor: string };
    image: string;
    button: string;
  }>({
    info: {
      title1: "With a flair",
      title2: "Flattering dresses",
      bgColor: "rgb(227,126,126)",
    },
    image: slider5,
    button: "Story",
  });

  const [single2, setSingle2] = useState<{
    info: { title1: string; title2: string; bgColor: string };
    image: string;
    button: string;
  }>({
    info: {
      title1: "Patrizia Palme",
      title2: "Black Satin Dress Look by ABOUT YOU Limited",
      bgColor: "rgb(207,196,186)",
    },
    image: singleImage1,
    button: "Outfit",
  });

  //Titltes
  const [title1, setTitle1] = useState<{ title1: string; title2: string }>({
    title1: "New",
    title2: "Our latest trends, guides & styling ideas",
  });
  const [title2, setTitle2] = useState<{ title1: string; title2: string }>({
    title1: "New outfits",
    title2: "New in stock",
  });
  const [title3, setTitle3] = useState<{ title1: string; title2: string }>({
    title1: "Wedding",
    title2: "For brides, bridesmaids, and wedding guests",
  });
  const [title4, setTitle4] = useState<{ title1: string; title2: string }>({
    title1: "Popular items",
    title2: "From ONLY",
  });
  const [title5, setTitle5] = useState<{ title1: string; title2: string }>({
    title1: "Popular products",
    title2: "From ABOUT YOU Limited",
  });
  const [title6, setTitle6] = useState<{ title1: string; title2: string }>({
    title1: "Popular Outfits",
    title2: "From the undefined category",
  });
  const [title7, setTitle7] = useState<{ title1: string; title2: string }>({
    title1: "Popular items",
    title2: "From the Dresses category",
  });
  const [title8, setTitle8] = useState<{ title1: string; title2: string }>({
    title1: "Popular brands",
    title2: "Our favorite brands for you",
  });
  const [title9, setTitle9] = useState<{ title1: string; title2: string }>({
    title1: "Popular items",
    title2: "From the Espadrilles category",
  });
  const [title10, setTitle10] = useState<{ title1: string; title2: string }>({
    title1: "Popular items",
    title2: "From LeGer by Lena Gercke",
  });
  const [title11, setTitle11] = useState<{ title1: string; title2: string }>({
    title1: "Popular products",
    title2: "From Athlecia",
  });
  const [title12, setTitle12] = useState<{ title1: string; title2: string }>({
    title1: "Popular outfits",
    title2: "From the undefined category",
  });
  const [title13, setTitle13] = useState<{ title1: string; title2: string }>({
    title1: "Popular items",
    title2: "From the Tops category",
  });
  const [title14, setTitle14] = useState<{ title1: string; title2: string }>({
    title1: "Popular items",
    title2: "From the Tunics category",
  });

  const [single3, setSingle3] = useState<{
    info: { title1: string; title2: string; bgColor: string };
    image: string;
    button: string;
  }>({
    info: {
      title1: "Fancy dress",
      title2: "Wedding season",
      bgColor: "rgb(244,194,194)",
    },
    image: singleImage2,
    button: "Story",
  });

  const [single4, setSingle4] = useState<{
    info: { title1: string; title2: string; bgColor: string };
    image: string;
    button: string;
  }>({
    info: {
      title1: "Tina Neumann for AY Limited",
      title2: "Dress Look by ABOUT YOU Limited",
      bgColor: "rgb(207,196,186)",
    },
    image: singleImage3,
    button: "Story",
  });

  const [single5, setSingle5] = useState<{
    info: { title1: string; title2: string; bgColor: string };
    image: string;
    button: string;
  }>({
    info: {
      title1: "Tina Neumann for AY Limited",
      title2: "Checkered Look by ABOUT YOU Limited",
      bgColor: "rgb(207,135,107)",
    },
    image: singleImage4,
    button: "Story",
  });

  // Slider One
  const [sliderOne, setSliderOne] = useState<
    {
      image: string;
      button: boolean;
      heart: boolean;
      lastSlide: boolean;
      title1?: string;
      title2?: string;
    }[]
  >([
    {
      image: slideTypeOneFirst1,
      button: true,
      heart: false,
      lastSlide: false,
      title1: "Make it colorful",
      title2: "Suit up",
    },
    {
      image: slideTypeOneFirst2,
      button: true,
      heart: false,
      lastSlide: false,
      title1: "New style codes",
      title2: "Color Blocking",
    },
    {
      image: sliderTypeOneFirst3,
      button: true,
      heart: false,
      lastSlide: false,
      title1: "Color Divergent",
      title2: "All black outfits",
    },
    {
      image: sliderTypeOneFirst4,
      button: true,
      heart: false,
      lastSlide: false,
      title1: "1 material, many looks",
      title2: "Knitted sets",
    },
    {
      image: sliderTypeOneFirst5,
      button: true,
      heart: false,
      lastSlide: false,
      title1: "Stolen looks from your dads closet",
      title2: "Dad-Style",
    },
    {
      image: sliderTypeOneFirstPlaceholder,
      button: false,
      heart: false,
      lastSlide: true,
      title1: "Stories",
      title2: "Discover now",
    },
  ]);

  const [sliderTwo, setSliderTwo] = useState<
    {
      image: string;
      button: boolean;
      heart: boolean;
      lastSlide: boolean;
      title1?: string;
      title2?: string;
    }[]
  >([
    {
      image: sliderTypeOneSecond1,
      button: false,
      heart: true,
      lastSlide: false,
      title1: "Lilia for LeGer by Lena Gercke",
      title2: "Asymmetrical Shirt Look by LeGer by Lena Gercke",
    },
    {
      image: sliderTypeOneSecond2,
      button: false,
      heart: true,
      lastSlide: false,
      title1: "Roseanna",
      title2: "Green Look by GMK Curvy Collection",
    },
    {
      image: sliderTypeOneSecond3,
      button: false,
      heart: true,
      lastSlide: false,
      title1: "Lilia for LeGer by Lena Gercke",
      title2: "Colorful Windbreaker Look by LeGer by Lena Gerck",
    },
    {
      image: sliderTypeOneSecond4,
      button: false,
      heart: true,
      lastSlide: false,
      title1: "Roseanna",
      title2: "Romantic Dress Look by GMK Curvy Collection",
    },
    {
      image: sliderTypeOneSecond5,
      button: false,
      heart: true,
      lastSlide: false,
      title1: "Lilly-Marie",
      title2: "Short Business Look by GMK Collection",
    },
  ]);

  const [sliderThree, setSliderThree] = useState<
    {
      image: string;
      button: boolean;
      heart: boolean;
      lastSlide: boolean;
      title1?: string;
      title2?: string;
    }[]
  >([
    {
      image: sliderTypeOneThree1,
      button: true,
      heart: false,
      lastSlide: false,
      title1: "For wedding guests",
      title2: "Cocktail Dresses",
    },
    {
      image: sliderTypeOneThree2,
      button: true,
      heart: false,
      lastSlide: false,
      title1: "Color guide for",
      title2: "Wedding Guests",
    },
    {
      image: sliderTypeOneThree3,
      button: true,
      heart: false,
      lastSlide: false,
      title1: "For a beautiful figure",
      title2: "Evening Dresses",
    },
    {
      image: sliderTypeOneThree4,
      button: true,
      heart: false,
      lastSlide: false,
      title1: "For the bridesmaids & wedding guests",
      title2: "Fancy dresses",
    },
    {
      image: sliderTypeOneThree5,
      button: true,
      heart: false,
      lastSlide: false,
      title1: "For the bride",
      title2: "Wedding Guide",
    },
    {
      image: sliderTypeOneThreePlaceholder,
      button: false,
      heart: false,
      lastSlide: true,
      title1: "Stories",
      title2: "Discover now",
    },
  ]);
  const [sliderSix, setSliderSix] = useState<
    {
      image: string;
      button: boolean;
      heart: boolean;
      lastSlide: boolean;
      title1?: string;
      title2?: string;
    }[]
  >([
    {
      image: sliderTypeOneFour1,
      button: false,
      heart: true,
      lastSlide: false,
      title1: "Lena Gercke",
      title2: "Beige Cotton Dress Look by LeGer by Lena Gercke",
    },
    {
      image: sliderTypeOneFour2,
      button: false,
      heart: true,
      lastSlide: false,
      title1: "Tina Neumann for AY Limited",
      title2: "Girly Look by ABOUT YOU Limited",
    },
    {
      image: sliderTypeOneFour3,
      button: false,
      heart: true,
      lastSlide: false,
      title1: "Lilly-Marie",
      title2: "Romantic Dress by GMK Collection",
    },
    {
      image: sliderTypeOneFour4,
      button: false,
      heart: true,
      lastSlide: false,
      title1: "Laura Giurcanu",
      title2: "Taupe Coat Dress Look by ABOUT YOU x Laura Giu",
    },
    {
      image: sliderTypeOneFour5,
      button: false,
      heart: true,
      lastSlide: false,
      title1: "Alina Eremia",
      title2: "Cutout Dress Look by ABOUT YOU x Alina Eremia",
    },
  ]);
  const [sliderEight, setSliderEight] = useState<
    {
      image: string;
      button: boolean;
      heart: boolean;
      lastSlide: boolean;
      title1?: string;
      title2?: string;
      specialTitle?: string;
      buttonName?: string;
    }[]
  >([
    {
      image: sliderTypeOneFive1,
      button: true,
      heart: false,
      lastSlide: false,
      specialTitle: "ONLY",
      buttonName: "Discover the brand",
    },
    {
      image: sliderTypeOneFive2,
      button: true,
      heart: false,
      lastSlide: false,
      specialTitle: "LeGer by Lena Gercke",
      buttonName: "Discover the brand",
    },
    {
      image: sliderTypeOneFive3,
      button: true,
      heart: false,
      lastSlide: false,
      specialTitle: "ABOUT YOU",
      buttonName: "Discover the brand",
    },
    {
      image: sliderTypeOneFive4,
      button: true,
      heart: false,
      lastSlide: false,
      specialTitle: "ABOUT YOU Limited",
      buttonName: "Discover the brand",
    },
    {
      image: sliderTypeOneFive5,
      button: true,
      heart: false,
      lastSlide: false,
      specialTitle: "Athlecia",
      buttonName: "Discover the brand",
    },
    {
      image: sliderTypeOneFive6,
      button: true,
      heart: false,
      lastSlide: false,
      specialTitle: "LIU JO Jeans",
      buttonName: "Discover the brand",
    },
  ]);
  const [sliderTwelve, setSliderTwelve] = useState<
    {
      image: string;
      button: boolean;
      heart: boolean;
      lastSlide: boolean;
      title1?: string;
      title2?: string;
      specialTitle?: string;
      buttonName?: string;
    }[]
  >([
    {
      image: sliderTypeOneSix1,
      button: false,
      heart: true,
      lastSlide: false,
      title1: "Lena Gercke",
      title2: "White Wrap Look by LeGer by Lena Gercke",
    },
    {
      image: sliderTypeOneSix2,
      button: false,
      heart: true,
      lastSlide: false,
      title1: "Tina Neumann for AY Limited",
      title2: "Streetstyle Look by ABOUT YOU Limited",
    },
    {
      image: sliderTypeOneSix3,
      button: false,
      heart: true,
      lastSlide: false,
      title1: "Lena Gercke",
      title2: "Chic Black Look by LeGer by Lena Gercke",
    },
    {
      image: sliderTypeOneSix4,
      button: false,
      heart: true,
      lastSlide: false,
      title1: "Tara Zoe",
      title2: "Basic Denim Look by GMK Collection",
    },
    {
      image: sliderTypeOneSix5,
      button: false,
      heart: true,
      lastSlide: false,
      title1: "Lea",
      title2: "Comfy Pants Look",
    },
  ]);

  // Slider Two
  const [sliderFour, setSliderFour] = useState<
    {
      backgroundImg: string;
      foregroundImg: string;
      tags?: { name: string; special?: boolean }[];
      title: string;
      price: string;
      colors: string[];
      sizes?: string[];
    }[]
  >([
    {
      backgroundImg: sliderTypeTwoBGFirst1,
      foregroundImg: sliderTypeTwoFGFirst1,
      title: "ONLY",
      price: "24.90",
      colors: ["black", "khaki"],
    },
    {
      backgroundImg: sliderTypeTwoBGFirst2,
      foregroundImg: sliderTypeTwoFGFirst2,
      title: "ONLY",
      price: "54.90",
      colors: ["darkblue", "olive", "black", "darkolivegreen"],
      sizes: ["XS", "S", "M", "L"],
    },
    {
      backgroundImg: sliderTypeTwoBGFirst3,
      foregroundImg: sliderTypeTwoFGFirst3,
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
    },
    {
      backgroundImg: sliderTypeTwoBGFirst4,
      foregroundImg: sliderTypeTwoFGFirst4,
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
    },
    {
      backgroundImg: sliderTypeTwoBGFirst5,
      foregroundImg: sliderTypeTwoFGFirst5,
      title: "ONLY",
      price: "32.90",
      colors: ["black", "green"],
      sizes: ["M", "L", "XL", "XXL", "XXXL", "4XL"],
    },
    {
      backgroundImg: sliderTypeTwoBGFirst6,
      foregroundImg: sliderTypeTwoFGFirst6,
      title: "ONLY",
      price: "27.90",
      colors: ["black", "4F1C22", "beige"],
    },
  ]);

  const [sliderFive, setSliderFive] = useState<
    {
      backgroundImg: string;
      foregroundImg: string;
      tags?: { name: string; special?: boolean }[];
      title: string;
      price: string | { full: string; discount: string };
      colors: string[];
      sizes?: string[];
    }[]
  >([
    {
      backgroundImg: sliderTypeTwoBGSecond1,
      foregroundImg: sliderTypeTwoFGSecond1,
      tags: [{ name: "Exclusive" }],
      title: "ABOUT YOU LIMITED",
      price: "135.90",
      colors: ["beige", "black"],
      sizes: ["M", "L", "XL", "XXL", "XXXL"],
    },
    {
      backgroundImg: sliderTypeTwoBGSecond2,
      foregroundImg: sliderTypeTwoFGSecond2,
      tags: [{ name: "-12%", special: true }, { name: "Exclusive" }],
      title: "ABOUT YOU LIMITED",
      price: { full: "32.90", discount: "28.90" },
      colors: ["white", "red"],
      sizes: ["S", "M", "L"],
    },
    {
      backgroundImg: sliderTypeTwoBGSecond3,
      foregroundImg: sliderTypeTwoFGSecond3,
      tags: [{ name: "New" }, { name: "Exclusive" }],
      title: "ABOUT YOU LIMITED",
      price: "27.90",
      colors: ["#F5F5F5", "beige"],
      sizes: ["XS", "S", "M", "L", "XXL"],
    },
    {
      backgroundImg: sliderTypeTwoBGSecond5,
      foregroundImg: sliderTypeTwoFGSecond5,
      tags: [{ name: "-27%", special: true }, { name: "Exclusive" }],
      title: "ABOUT YOU LIMITED",
      price: { full: "32.90", discount: "23.90" },
      colors: ["#C0C1AF", "olive"],
      sizes: ["S", "M", "XL", "XXL"],
    },
    {
      backgroundImg: sliderTypeTwoBGSecond4,
      foregroundImg: sliderTypeTwoFGSecond4,
      tags: [{ name: "-10%", special: true }, { name: "Exclusive" }],
      title: "ABOUT YOU LIMITED",
      price: { full: "54.90", discount: "48.90" },
      colors: ["black", "blue", "AB5746"],
      sizes: ["XS", "S", "M", "L"],
    },
    {
      backgroundImg: sliderTypeTwoBGSecond6,
      foregroundImg: sliderTypeTwoFGSecond6,
      tags: [{ name: "-15%", special: true }, { name: "Exclusive" }],
      title: "ABOUT YOU LIMITED",
      price: { full: "43.90", discount: "36.90" },
      colors: ["grey", "olive"],
      sizes: ["36", "38"],
    },
  ]);
  const [sliderSeven, setSliderSeven] = useState<
    {
      backgroundImg: string;
      foregroundImg: string;
      tags?: { name: string; special?: boolean }[];
      title: string;
      price: string | { full: string; discount: string };
      colors: string[];
      sizes?: string[];
    }[]
  >([
    {
      backgroundImg: sliderTypeTwoBGThird1,
      foregroundImg: sliderTypeTwoFGThird1,
      tags: [{ name: "More sustainable" }],
      title: "Y.A.S",
      price: "67.90",
      colors: ["black", "#8AE7BC", "beige", "lavender", "lightblue"],
      sizes: ["36", "38", "42"],
    },
    {
      backgroundImg: sliderTypeTwoBGThird2,
      foregroundImg: sliderTypeTwoFGThird2,
      tags: [{ name: "More sustainable" }],
      title: "TOMMY JEANS",
      price: "87.90",
      colors: ["blue"],
      sizes: ["34", "36", "40", "42"],
    },
    {
      backgroundImg: sliderTypeTwoBGThird3,
      foregroundImg: sliderTypeTwoFGThird3,
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
    },
    {
      backgroundImg: sliderTypeTwoBGThird4,
      foregroundImg: sliderTypeTwoFGThird4,
      tags: [{ name: "More sustainable" }],
      title: "EDITED",
      price: "77.90",
      colors: ["black", "#818087", "beige", "khaki", "#311F1E"],
      sizes: ["XS", "S", "M", "L", "XL"],
    },
    {
      backgroundImg: sliderTypeTwoBGThird5,
      foregroundImg: sliderTypeTwoFGThird5,
      tags: [{ name: "Premium" }],
      title: "BOSS CASUAL",
      price: "255.90",
      colors: ["#EFE4CB"],
      sizes: ["34", "36", "38", "40"],
    },
    {
      backgroundImg: sliderTypeTwoBGThird6,
      foregroundImg: sliderTypeTwoFGThird6,
      tags: [{ name: "New" }, { name: "More sustainable" }],
      title: "EDITED",
      price: "99.90",
      colors: ["#FE7D7E"],
      sizes: ["34", "36", "38", "40", "42"],
    },
  ]);

  const [sliderNine, setSliderNine] = useState<
    {
      backgroundImg: string;
      foregroundImg?: string;
      tags?: { name: string; special?: boolean }[];
      title: string;
      price: string | { full: string; discount: string };
      colors: string[];
      sizes?: string[];
    }[]
  >([
    {
      backgroundImg: sliderTypeTwoBGFour1,
      title: "TOMMY HILFIGER",
      price: "87.90",
      colors: ["darkblue", "#F5EDE5"],
      sizes: ["38", "39", "40", "41", "42"],
    },
    {
      backgroundImg: sliderTypeTwoBGFour2,
      tags: [{ name: "New" }, { name: "More sustainable" }],
      title: "CALVIN KLEIN",
      price: "87.90",
      colors: ["F6E5CF"],
      sizes: ["36", "38", "39", "40"],
    },
    {
      backgroundImg: sliderTypeTwoBGFour3,
      tags: [{ name: "New" }],
      title: "TOMS",
      price: "54.90",
      colors: ["#EEDED3"],
    },
    {
      backgroundImg: sliderTypeTwoBGFour4,
      tags: [{ name: "Premium" }],
      title: "CALVIN KLEIN",
      price: "109.90",
      colors: ["#A66827"],
      sizes: ["38"],
    },
    {
      backgroundImg: sliderTypeTwoBGFour5,
      tags: [{ name: "Premium" }],
      title: "BIANCO",
      price: "87.90",
      colors: ["beige", "black", "#A66827"],
      sizes: ["36", "37", "38", "39", "41"],
    },
    {
      backgroundImg: sliderTypeTwoBGFour6,
      tags: [{ name: "New" }],
      title: "TOMS",
      price: "62.90",
      colors: ["#E1D1B2"],
    },
  ]);
  const [sliderTen, setSliderTen] = useState<
    {
      backgroundImg: string;
      foregroundImg: string;
      tags?: { name: string; special?: boolean }[];
      title: string;
      price: string | { full: string; discount: string };
      colors: string[];
      sizes?: string[];
    }[]
  >([
    {
      backgroundImg: sliderTypeTwoBGFive1,
      foregroundImg: sliderTypeTwoFGFive1,
      tags: [{ name: "Exclusive" }],
      title: "LEGER BY LENA GERCKE",
      price: "67.90",
      colors: ["black"],
      sizes: ["XS", "S", "L", "XL", "XXL"],
    },
    {
      backgroundImg: sliderTypeTwoBGFive2,
      foregroundImg: sliderTypeTwoFGFive2,
      tags: [{ name: "Exclusive" }, { name: "More sustainable" }],
      title: "LEGER BY LENA GERCKE",
      price: "38.90",
      colors: ["black", "beige", "#6B6A6B", "brown", "#602D2F"],
      sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    },
    {
      backgroundImg: sliderTypeTwoBGFive3,
      foregroundImg: sliderTypeTwoFGFive3,
      tags: [{ name: "Exclusive" }],
      title: "LEGER BY LENA GERCKE",
      price: "27.90",
      colors: ["#663300"],
      sizes: ["34", "38", "40", "42", "44"],
    },
    {
      backgroundImg: sliderTypeTwoBGFive4,
      foregroundImg: sliderTypeTwoFGFive4,
      tags: [{ name: "Exclusive" }],
      title: "LEGER BY LENA GERCKE",
      price: "27.90",
      colors: ["#EFE4CB", "black"],
      sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    },
    {
      backgroundImg: sliderTypeTwoBGFive5,
      foregroundImg: sliderTypeTwoFGFive5,
      tags: [{ name: "New" }, { name: "Exclusive" }],
      title: "LEGER BY LENA GERCKE",
      price: "67.90",
      colors: ["#EFE4CB", "#008B8B"],
      sizes: ["34", "36", "38", "40"],
    },
    {
      backgroundImg: sliderTypeTwoBGFive6,
      foregroundImg: sliderTypeTwoFGFive6,
      tags: [{ name: "New" }, { name: "Exclusive" }],
      title: "LEGER BY LENA GERCKE",
      price: "67.90",
      colors: ["green", "black", "beige"],
      sizes: ["34", "36", "38", "40", "42", "44"],
    },
  ]);
  const [sliderEleven, setSliderEleven] = useState<
    {
      backgroundImg: string;
      foregroundImg: string;
      tags?: { name: string; special?: boolean }[];
      title: string;
      price: string | { full: string; discount: string };
      colors: string[];
      sizes?: string[];
    }[]
  >([
    {
      backgroundImg: sliderTypeTwoBGSix1,
      foregroundImg: sliderTypeTwoFGSix1,
      title: "ATHLECIA",
      price: "36.90",
      colors: ["black"],
      sizes: ["XS", "M", "L", "XL", "XXL"],
    },
    {
      backgroundImg: sliderTypeTwoBGSix2,
      foregroundImg: sliderTypeTwoFGSix2,
      title: "ATHLECIA",
      price: "29.90",
      colors: ["black", "white"],
      sizes: ["XS", "S", "L"],
    },
    {
      backgroundImg: sliderTypeTwoBGSix3,
      foregroundImg: sliderTypeTwoFGSix3,
      title: "ATHLECIA",
      price: "43.90",
      colors: ["brown"],
      sizes: ["M", "L", "XL", "XXL"],
    },
    {
      backgroundImg: sliderTypeTwoBGSix4,
      foregroundImg: sliderTypeTwoFGSix4,
      title: "ATHLECIA",
      price: "27.90",
      colors: ["darkblue", "black"],
      sizes: ["XXS-XS", "S-M", "L-XL"],
    },
    {
      backgroundImg: sliderTypeTwoBGSix5,
      foregroundImg: sliderTypeTwoFGSix5,
      title: "ATHLECIA",
      price: "27.90",
      colors: ["black"],
      sizes: ["XL", "XXL"],
    },
    {
      backgroundImg: sliderTypeTwoBGSix6,
      foregroundImg: sliderTypeTwoFGSix6,
      title: "ATHLECIA",
      price: "54.90",
      colors: ["black"],
    },
  ]);
  const [sliderThirteen, setSliderThirteen] = useState<
    {
      backgroundImg: string;
      foregroundImg: string;
      tags?: { name: string; special?: boolean }[];
      title: string;
      price: string | { full: string; discount: string };
      colors: string[];
      sizes?: string[];
    }[]
  >([
    {
      backgroundImg: sliderTypeTwoBGSeven1,
      foregroundImg: sliderTypeTwoFGSeven1,
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
    },
    {
      backgroundImg: sliderTypeTwoBGSeven2,
      foregroundImg: sliderTypeTwoFGSeven2,
      title: "VERO MODA AWARE",
      price: "16.90",
      colors: ["black", "blue", "white", "#E1E1DF"],
      sizes: ["XS", "S", "M", "L", "XL"],
    },
    {
      backgroundImg: sliderTypeTwoBGSeven3,
      foregroundImg: sliderTypeTwoFGSeven3,
      title: "RICH & ROYAL",
      price: "41.90",
      colors: ["black", "white"],
      sizes: ["XS", "S", "M", "L"],
    },
    {
      backgroundImg: sliderTypeTwoBGSeven4,
      foregroundImg: sliderTypeTwoFGSeven4,
      tags: [{ name: "More sustainable" }],
      title: "ROSEMUNDE",
      price: "54.90",
      colors: ["black", "blue", "white", "beige"],
      sizes: ["S", "M", "L", "XL"],
    },
    {
      backgroundImg: sliderTypeTwoBGSeven5,
      foregroundImg: sliderTypeTwoFGSeven5,
      tags: [{ name: "2-pack" }],
      title: "ONLY",
      price: "16.90",
      colors: ["black", "blue", "brown"],
      sizes: ["XS", "S", "M", "L", "XL"],
    },
    {
      backgroundImg: sliderTypeTwoBGSeven6,
      foregroundImg: sliderTypeTwoFGSeven6,
      tags: [{ name: "New" }, { name: "2-pack" }],
      title: "EDITED",
      price: "32.90",
      colors: ["beige", "white", "black"],
      sizes: ["XS", "M", "L", "XL"],
    },
  ]);
  const [sliderFourtheen, setSliderFourtheen] = useState<
    {
      backgroundImg: string;
      foregroundImg: string;
      tags?: { name: string; special?: boolean }[];
      title: string;
      price: string | { full: string; discount: string };
      colors: string[];
      sizes?: string[];
    }[]
  >([
    {
      backgroundImg: sliderTypeTwoBGEight1,
      foregroundImg: sliderTypeTwoFGEight1,
      title: "VILA",
      price: "43.90",
      colors: ["black", "white", "pink", "cyan"],
      sizes: ["XS", "S"],
    },
    {
      backgroundImg: sliderTypeTwoBGEight2,
      foregroundImg: sliderTypeTwoFGEight2,
      tags: [{ name: "Mom" }, { name: "With nursing function" }],
      title: "MAMALICIOUS",
      price: "38.90",
      colors: ["blue", "white"],
      sizes: ["XS", "XL"],
    },
    {
      backgroundImg: sliderTypeTwoBGEight3,
      foregroundImg: sliderTypeTwoFGEight3,
      tags: [{ name: "More sustainable" }],
      title: "KAFFE",
      price: "54.90",
      colors: ["green", "blue"],
      sizes: ["XS", "S", "M", "XXL", "XXXL"],
    },
    {
      backgroundImg: sliderTypeTwoBGEight4,
      foregroundImg: sliderTypeTwoFGEight4,
      tags: [{ name: "Curvy" }],
      title: "ONLY CARMAKOMA",
      price: "41.90",
      colors: ["darkblue", "beige"],
      sizes: ["6XL", "7XL"],
    },
    {
      backgroundImg: sliderTypeTwoBGEight5,
      foregroundImg: sliderTypeTwoFGEight5,
      title: "IZIA",
      price: "189.95",
      colors: ["darkgreen", "black", "pink"],
      sizes: ["XS-S", "M-L", "XL-XXL"],
    },
    {
      backgroundImg: sliderTypeTwoBGEight6,
      foregroundImg: sliderTypeTwoFGEight6,
      tags: [{ name: "New" }, { name: "Curvy" }],
      title: "ONLY CARMAKOMA",
      price: "27.90",
      colors: ["black"],
    },
  ]);

  return (
    <div className="bodyInner">
      <TopCategories />
      <SingleImage
        info={single1.info}
        image={single1.image}
        button={single1.button}
      />
      <TitleInner title={title1} />
      <SliderTypeOne props={sliderOne} />
      <TitleInner title={title2} />
      <SliderTypeOne props={sliderTwo} notfull={true} />
      <SingleImage
        info={single2.info}
        image={single2.image}
        button={single2.button}
      />
      <TitleInner title={title3} />
      <SliderTypeOne props={sliderThree} />
      <TitleInner title={title4} />
      <SliderTypeTwo props={sliderFour} />
      <SingleImage
        info={single3.info}
        image={single3.image}
        button={single3.button}
      />
      <TitleInner title={title5} />
      <SliderTypeTwo props={sliderFive} />
      <TitleInner title={title6} />
      <SliderTypeOne props={sliderSix} notfull={true} />
      <SingleImage
        info={single4.info}
        image={single4.image}
        button={single4.button}
      />
      <TitleInner title={title7} />
      <SliderTypeTwo props={sliderSeven} />
      <TitleInner title={title8} />
      <SliderTypeOne props={sliderEight} />
      <SingleImage
        info={single5.info}
        image={single5.image}
        button={single5.button}
      />
      <TitleInner title={title9} />
      <SliderTypeTwo props={sliderNine} />
      <TitleInner title={title10} />
      <SliderTypeTwo props={sliderTen} />
      <TitleInner title={title11} />
      <SliderTypeTwo props={sliderEleven} />
      <TitleInner title={title12} />
      <SliderTypeOne props={sliderTwelve} notfull={true} />
      <TitleInner title={title13} />
      <SliderTypeTwo props={sliderThirteen} />
      <TitleInner title={title14} />
      <SliderTypeTwo props={sliderFourtheen} />
      <FooterInner />
    </div>
  );
}

export default BodyInner;
