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

//slider--imgm
import slideTypeOneFirst1 from "../../assets/sliderOne/First/one.webp";
import slideTypeOneFirst2 from "../../assets/sliderOne/First/two.webp";
import sliderTypeOneFirst3 from "../../assets/sliderOne/First/three.webp";
import sliderTypeOneFirst4 from "../../assets/sliderOne/First/four.webp";
import sliderTypeOneFirst5 from "../../assets/sliderOne/First/five.webp";
import sliderTypeOneFirstPlaceholder from "../../assets/dropdown/placeholder.jpg";

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

  const [title1, setTitle1] = useState<{ title1: string; title2: string }>({
    title1: "New",
    title2: "Our latest trends, guides & styling ideas",
  });
  const [title2, setTitle2] = useState<{ title1: string; title2: string }>({
    title1: "New outfits",
    title2: "New in stock",
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
      title2: "Discover now"
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
      <SingleImage
        info={single2.info}
        image={single2.image}
        button={single2.button}
      />
      <SingleImage
        info={single3.info}
        image={single3.image}
        button={single3.button}
      />
      <SingleImage
        info={single4.info}
        image={single4.image}
        button={single4.button}
      />
      <SingleImage
        info={single5.info}
        image={single5.image}
        button={single5.button}
      />
    </div>
  );
}

export default BodyInner;
