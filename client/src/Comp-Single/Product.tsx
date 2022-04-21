import "../styles/Comp-Single/Product.css";
import { useWindowDimensions } from "../Hooks/Viewport";
import React, { useContext, useEffect, useRef, useState } from "react";
import useMouse from "@react-hook/mouse-position";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { BasketContext } from "../Context/Basket";
import { AuthContext } from "../Context/Auth";
import { ProductType } from "../types/Product";
import { WishlistContext } from "../Context/Wishlist";
function Product({
  type,
  chosenMode,
  product,
  setClickedLogin,
  liked
}: {
  type: string;
  chosenMode?: boolean | undefined;
  product: ProductType;
    setClickedLogin: React.Dispatch<React.SetStateAction<boolean>>;
    liked: boolean;
}) {
  const { width } = useWindowDimensions();
  const bContext = useContext(BasketContext);
  const aContext = useContext(AuthContext);
  const wContext = useContext(WishlistContext);

  const navigate = useNavigate();

  const [currentWay, setCurrentWay] = useState<boolean>(false);
  const [saved, setSaved] = useState<boolean>(false);

  const [currentImageOne, setCurrentImageOne] = useState<string>("1.jpg");
  const [currentImageTwo, setCurrentImageTwo] = useState<string>("10.jpg");

  useEffect(() => {
    if (width < 1000) {
      setCurrentWay(true);
    } else {
      setCurrentWay(false);
    }
  }, [width]);

  const [clicked, setClicked] = useState<boolean>();
  const imgOneRef = useRef<HTMLImageElement>(null);
  const divRef = useRef<HTMLDivElement>(null);

  const mouse = useMouse(divRef, {
    enterDelay: 0,
    leaveDelay: 0,
  });
  const mouseImgOne = useMouse(imgOneRef, {
    enterDelay: 0,
    leaveDelay: 0,
  });

  const [isViewing360, setIsViewing360] = useState<boolean>(false);

  useEffect(() => {
    if (isViewing360 && divRef.current && mouse.clientX) {
      const amount = (
        mouse.clientX /
        (divRef.current.offsetWidth / 50)
      ).toFixed(0);
      if (parseInt(amount) > 51) {
        setCurrentImageOne("51.jpg");
      } else {
        setCurrentImageOne(amount + ".jpg");
      }
    } else {
      setCurrentImageOne("1.jpg");
      setIsViewing360(false);
    }
  }, [isViewing360, mouse]);

  const handleWishlist = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    e.stopPropagation();
    if (!aContext.isLoggedIn) {
      setClickedLogin(true);
    } else {
      // setSaved(!saved);
      if (wContext.isInWishlist(product.id)) {
        wContext.removeFromWishlist(product.id);
      } else {
        wContext.addToWishlist(product);
      }
    }
  };

  const handleLikes = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void => {
    e.stopPropagation();
    // if (clicked) {
    //   setClicked(false);
    //   setLikes(likes - 1);
    // } else {
    //   setClicked(true);
    //   setLikes(likes + 1);
    // }
    if (!aContext.isLoggedIn) {
      setClickedLogin(true)
    } else {
      if (liked) {
        
      } else {
        
      }
    }
  };

  const handleBasket = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void => {
    e.stopPropagation();
    if (bContext.isInBasket(product.id)) {
      bContext.removeFromBasket(product.id);
    } else {
      bContext.addToBasket(product);
    }
  };

  return (
    <div
      className={`product ${chosenMode === false ? "product-dark" : ""} ${
        type === "360" ? "product-360" : ""
      }`}
      style={{
        cursor: isViewing360
          ? `url("../../../assets/cursor/cursor.svg"), auto`
          : "pointer",
      }}
      ref={divRef}
      onClick={() =>
        type === "360" ? setIsViewing360(!isViewing360) : undefined
      }
    >
      <div className="product-cursor"></div>
      {type === "360" ? (
        <div className={`product__360`}>
          <img src={"/assets/cursor/360-icon.svg"} alt={""} loading={"lazy"} />
        </div>
      ) : (
        ""
      )}
      <div className="product__title">{product.title}</div>
      <img
        src={
          type === "360"
            ? product.backgroundImg + currentImageOne
            : product.backgroundImg
        }
        alt={""}
        className={`${currentWay ? "product__img-special-bg" : ""} ${
          isViewing360 ? "product__img-special-360" : ""
        }`}
        loading={"lazy"}
      />
      <img
        src={
          type === "360"
            ? product.foregroundImg + currentImageTwo
            : product.foregroundImg
        }
        alt={""}
        className={`${currentWay ? "product__img-special" : ""} ${
          isViewing360 ? "product__img-special-no360" : ""
        }`}
        loading={"lazy"}
      />
      <button
        type="button"
        onClick={handleWishlist}
        className={`${
          wContext.isInWishlist(product.id) ? "product__saved" : ""
        }`}
      ></button>
      <div
        className={`product__heart ${liked ? "product__heart-clicked" : ""}`}
        onClick={(e) => {
          handleLikes(e);
        }}
      >
        {clicked ? (
          <img src={"/assets/svg/heart.svg"} alt="" loading={"lazy"} />
        ) : (
          <img src={"/assets/svg/heart-half.svg"} alt="" loading={"lazy"} />
        )}
        <span>{product.likes}</span>
      </div>
      <div
        className={
          !clicked ? `product__overlay-unclicked` : "product__overlay-clicked"
        }
      ></div>
      <div className={`product__basket`} onClick={(e) => handleBasket(e)}>
        {bContext.isInBasket(product.id) ? (
          <img src={"/assets/svg/basket_clicked.svg"} alt="" loading={"lazy"} />
        ) : (
          <img
            src={"/assets/svg/basket_unclicked.svg"}
            alt=""
            loading={"lazy"}
          />
        )}
      </div>
      <button type="button" onClick={() => navigate("/product/id")}>
        <IoIosArrowForward />
      </button>
    </div>
  );
}

export default React.memo(Product);