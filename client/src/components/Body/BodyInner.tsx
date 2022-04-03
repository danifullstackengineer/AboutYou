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
import { useQuery } from "@apollo/client";
import { getSliderOneItem, getSliderTwoItem } from "../../Apollo/Products";
import FooterInner from "./FooterInner";
import { useEffect } from "react";

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


  const { data: sliderOne1 } = useQuery(getSliderOneItem, {
    variables: {
      slideNumber: 1,
    },
  });
  const { data: sliderOne2 } = useQuery(getSliderOneItem, {
    variables: {
      slideNumber: 2,
    },
  });
  const { data: sliderOne3 } = useQuery(getSliderOneItem, {
    variables: {
      slideNumber: 3,
    },
  });
  const { data: sliderOne4 } = useQuery(getSliderOneItem, {
    variables: {
      slideNumber: 4,
    },
  });
  const { data: sliderOne5 } = useQuery(getSliderOneItem, {
    variables: {
      slideNumber: 5,
    },
  });
  const { data: sliderOne6 } = useQuery(getSliderOneItem, {
    variables: {
      slideNumber: 6,
    },
  });

  // --- Slider Type Two --- //
  const { data: sliderTwo1 } = useQuery(getSliderTwoItem, {
    variables: {
      slideNumber: 1,
    },
  });
  const { data: sliderTwo2 } = useQuery(getSliderTwoItem, {
    variables: {
      slideNumber: 2,
    },
  });
  const { data: sliderTwo3 } = useQuery(getSliderTwoItem, {
    variables: {
      slideNumber: 3,
    },
  });
  const { data: sliderTwo4 } = useQuery(getSliderTwoItem, {
    variables: {
      slideNumber: 4,
    },
  });
  const { data: sliderTwo5 } = useQuery(getSliderTwoItem, {
    variables: {
      slideNumber: 5,
    },
  });
  const { data: sliderTwo6 } = useQuery(getSliderTwoItem, {
    variables: {
      slideNumber: 6,
    },
  });
  const { data: sliderTwo7 } = useQuery(getSliderTwoItem, {
    variables: {
      slideNumber: 7,
    },
  });
  const { data: sliderTwo8 } = useQuery(getSliderTwoItem, {
    variables: {
      slideNumber: 8,
    },
  });

  return (
    <div className="bodyInner">
      <TopCategories />
      <SingleImage
        info={single1.info}
        image={single1.image}
        button={single1.button}
      />
      <TitleInner title={title1} />
      {sliderOne1 ? (
        <SliderTypeOne
          props={sliderOne1.getSliderOneProductsBasedOnSlideNumber}
        />
      ) : (
        ""
      )}
      <TitleInner title={title2} />
      {sliderOne2 ? (
        <SliderTypeOne
          props={sliderOne2.getSliderOneProductsBasedOnSlideNumber}
          notfull={true}
        />
      ) : (
        ""
      )}
      <SingleImage
        info={single2.info}
        image={single2.image}
        button={single2.button}
      />
      <TitleInner title={title3} />
      {sliderOne3 ? (
        <SliderTypeOne
          props={sliderOne3.getSliderOneProductsBasedOnSlideNumber}
        />
      ) : (
        ""
      )}
      <TitleInner title={title4} />
      {sliderTwo1 ? (
        <SliderTypeTwo
          props={sliderTwo1.getSliderTwoProductsBasedOnSlideNumber}
        />
      ) : (
        ""
      )}
      <SingleImage
        info={single3.info}
        image={single3.image}
        button={single3.button}
      />
      <TitleInner title={title5} />
      {sliderTwo2 ? (
        <SliderTypeTwo
          props={sliderTwo2.getSliderTwoProductsBasedOnSlideNumber}
        />
      ) : (
        ""
      )}
      <TitleInner title={title6} />
      {sliderOne4 ? (
        <SliderTypeOne
          props={sliderOne4.getSliderOneProductsBasedOnSlideNumber}
          notfull={true}
        />
      ) : (
        ""
      )}
      <SingleImage
        info={single4.info}
        image={single4.image}
        button={single4.button}
      />
      <TitleInner title={title7} />
      {sliderTwo3 ? (
        <SliderTypeTwo
          props={sliderTwo3.getSliderTwoProductsBasedOnSlideNumber}
        />
      ) : (
        ""
      )}
      <TitleInner title={title8} />
      {sliderOne5 ? (
        <SliderTypeOne
          props={sliderOne5.getSliderOneProductsBasedOnSlideNumber}
        />
      ) : (
        ""
      )}
      <SingleImage
        info={single5.info}
        image={single5.image}
        button={single5.button}
      />
      <TitleInner title={title9} />
      {sliderTwo4 ? (
        <SliderTypeTwo
          props={sliderTwo4.getSliderTwoProductsBasedOnSlideNumber}
        />
      ) : (
        ""
      )}
      <TitleInner title={title10} />
      {sliderTwo5 ? (
        <SliderTypeTwo
          props={sliderTwo5.getSliderTwoProductsBasedOnSlideNumber}
        />
      ) : (
        ""
      )}
      <TitleInner title={title11} />
      {sliderTwo6 ? (
        <SliderTypeTwo
          props={sliderTwo6.getSliderTwoProductsBasedOnSlideNumber}
        />
      ) : (
        ""
      )}
      <TitleInner title={title12} />
      {sliderOne6 ? (
        <SliderTypeOne
          props={sliderOne6.getSliderOneProductsBasedOnSlideNumber}
          notfull={true}
        />
      ) : (
        ""
      )}
      <TitleInner title={title13} />
      {sliderTwo7 ? (
        <SliderTypeTwo
          props={sliderTwo7.getSliderTwoProductsBasedOnSlideNumber}
        />
      ) : (
        ""
      )}
      <TitleInner title={title14} />
      {sliderTwo8 ? (
        <SliderTypeTwo
          props={sliderTwo8.getSliderTwoProductsBasedOnSlideNumber}
        />
      ) : (
        ""
      )}
      <FooterInner />
    </div>
  );
}

export default BodyInner;
