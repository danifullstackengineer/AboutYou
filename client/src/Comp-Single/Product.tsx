import "../styles/Comp-Single/Product.css";
import { useWindowDimensions } from "../Hooks/Viewport";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import useMouse from "@react-hook/mouse-position";
import { useNavigate } from "react-router-dom";
import { BasketContext } from "../Context/Basket";
import { AuthContext } from "../Context/Auth";
import { ProductType } from "../types/Product";
import { WishlistContext } from "../Context/Wishlist";
import { useMutation } from "@apollo/client";
import { setLikedProduct } from "../Apollo/Products";
import LazyLoad from "react-lazyload";


function Product({
  type,
  chosenMode,
  product,
  setClickedLogin,
  setClickedMenu,
  liked,
  clickedMenu,
  setClickedBasket,
  setClickedWishlist,
  handleOpening,
  clickedBasket,
  clickedWishlist,
  firstProduct
}: {
  type?: string;
  chosenMode?: boolean | undefined;
  product: ProductType;
  setClickedLogin: React.Dispatch<React.SetStateAction<boolean>>;
  liked: boolean;
  setClickedMenu: React.Dispatch<React.SetStateAction<boolean>>;
  clickedMenu: boolean;
  setClickedBasket: React.Dispatch<React.SetStateAction<boolean>>;
  setClickedWishlist: React.Dispatch<React.SetStateAction<boolean>>;
  handleOpening: (type: "user" | "wishlist" | "basket" | "language") => void;
  clickedBasket: boolean;
  clickedWishlist: boolean;
  firstProduct?:boolean;
}) {
  const { width } = useWindowDimensions();
  const bContext = useContext(BasketContext);
  const aContext = useContext(AuthContext);
  const wContext = useContext(WishlistContext);

  const navigate = useNavigate();

  const [currentWay, setCurrentWay] = useState<boolean>(false);

  const [likedAmount, setLikedAmount] = useState<number>(product.likes);

  const [images, setImages] = useState<{src: string; active: boolean}[]>();

  const [currentImageOne, setCurrentImageOne] = useState<string>("1.jpg");
  const [currentImageTwo, setCurrentImageTwo] = useState<string>("10.jpg");

  const imgFunc = useCallback(():{src: string;active: boolean}[]=> {
    var arr = []
    for (let i= 1; i< 52 ; i++){
      if( i===10){
        arr.push({src: "/assets/Product/360/" + i + ".jpg", active: true});
      }
      else{
      arr.push({src: "/assets/Product/360/" + i + ".jpg", active: false});
      }
    }
    return arr;
  }, [])
  const [likedMutation, { loading, data, error }] = useMutation(
    setLikedProduct,
    {
      variables: {
        id: aContext.userId,
        likedId: product.id,
        liked: !liked,
      },
    }
  );

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

  const handleWishlist = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    e.stopPropagation();
    if (!aContext.isLoggedIn) {
      setClickedLogin(true);
    } else {
      if (wContext.isInWishlist(product.id)) {
        wContext.removeFromWishlist(product.id);
      } else {
        wContext.addToWishlist(product);
      }
      if (!clickedMenu) {
        setClickedMenu(true);
        setTimeout(() => {
          setClickedWishlist(true);
        }, 150);
      } else {
        if (!clickedWishlist) {
          handleOpening("wishlist");
        }
      }
    }
  };

  const [heartSrc, setHeartSrc] = useState<string>(
    "/assets/svg/heart-half.svg"
  );

  useEffect(() => {
    if (liked) {
      setHeartSrc("/assets/svg/heart.svg");
    } else {
      setHeartSrc("/assets/svg/heart-half.svg");
    }
  }, [liked]);

  //TODO: FIX LIKES
  const handleLikes = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void => {
    e.stopPropagation();
    if (!aContext.isLoggedIn) {
      setClickedLogin(true);
    } else {
      setClicked(!clicked);
      likedMutation();
    }
  };
  //TODO: Handle this error
  useEffect(() => {}, [error]);

  const handleBasket = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void => {
    e.stopPropagation();
    if (bContext.isInBasket(product.id)) {
      bContext.removeFromBasket(product.id);
    } else {
      bContext.addToBasket(product);
    }
    if (!clickedMenu) {
      setClickedMenu(true);
      setTimeout(() => {
        setClickedBasket(true);
      }, 150);
    } else {
      if (!clickedBasket) {
        handleOpening("basket");
      }
    }
  };



    useEffect(
    useCallback(() => {
      if (isViewing360 && divRef.current && mouse.clientX) {
        if(!images){

        }
        setImages(imgFunc())
        const amount = (
          mouse.clientX /
          (divRef.current.offsetWidth / 50)
        ).toFixed(0);
        if(parseInt(amount) > 50){
          setCurrentImageOne("51.jpg");
          setIsViewing360(false);
        }else{
          if(images){
            setImages([...images.filter((img, i)=>{
              if(i===parseInt(amount)){
                img.active = true;
              }
              else{
                img.active = false;
              }
              return img;
            })])
          }
        }
      }else{
        setCurrentImageOne("1.jpg");
        setIsViewing360(false);
      }
    }, [isViewing360, mouse]),
    [isViewing360, mouse]
  );


  return (
    <div
      className={`product ${chosenMode === false ? "product-dark" : ""} ${
        type === "360" ? "product-360" : ""} ${firstProduct ? "product-first" : ""}`}
      style={{
        cursor: isViewing360 && firstProduct
          ? `url("../../../assets/cursor/cursor.svg"), auto`
          : "pointer",
      }}
      ref={divRef}
      onClick={() =>
        type === "360" && firstProduct ? setIsViewing360(!isViewing360) : undefined
      }
    >
      <div className="product__left">
      <div className="product-cursor"></div>
      {firstProduct ? (
        <div className={`product__360`}>
          <LazyLoad height={1}>
            <img
              src={"/assets/cursor/360-icon.svg"}
              alt={""}
              loading={"lazy"}
            />
          </LazyLoad>
        </div>
      ) : (
        ""
      )}
      <div className="product__title">{product.title}</div>
        <img
          src={
            type === "360"
              ?  isViewing360 && images ? images.filter(img=> img.active ? img : "")[0].src : product.backgroundImg + currentImageOne
              : product.backgroundImg
          }
          alt={""}
          className={`product__img-img ${
            currentWay ? "product__img-special-bg" : ""
          } ${isViewing360 ? "product__img-special-360" : ""}`}
        />
        <img
          src={
            type === "360"
              ? product.foregroundImg + currentImageTwo
              : product.foregroundImg
          }
          alt={""}
          className={`product__img-img ${
            currentWay ? "product__img-special" : ""
          } ${isViewing360 ? "product__img-special-no360" : ""}`}
          loading={"lazy"}
        />
      {firstProduct ? <> <button
        type="button"
        onClick={handleWishlist}
        className={`${
          wContext.isInWishlist(product.id) ? "product__saved" : ""
        }`}
      ></button>
      <div
        className={`product__heart ${
          clicked && !liked
            ? "product__heart-clicked"
            : liked
            ? "product__heart-liked-already"
            : ""
        }`}
        onClick={(e) => {
          handleLikes(e);
        }}
        onMouseOver={() => {
          liked
            ? setHeartSrc("/assets/svg/heart-half.svg")
            : setHeartSrc("/assets/svg/heart.svg");
        }}
        onMouseLeave={() => {
          liked
            ? setHeartSrc("/assets/svg/heart.svg")
            : setHeartSrc("/assets/svg/heart-half.svg");
        }}
      >
        <img src={heartSrc} alt="" loading={"lazy"} />
        <span>{likedAmount}</span>
      </div>
      <div
        className={
          !clicked
            ? `product__overlay-unclicked`
            : !liked
            ? "product__overlay-clicked"
            : ""
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
      </div></> : ""}
      </div>
      {firstProduct ? <div className="product__right">
        <div className="product__right-custom"></div>
        <div className="product__right-image"></div>
      </div> : ""}
    </div>
  );
}

export default React.memo(Product);
