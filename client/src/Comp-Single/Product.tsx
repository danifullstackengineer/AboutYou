import React, { useContext, useEffect, useRef, useState } from 'react'
import { ProductType } from '../types/Product'
import '../styles/Comp-Single/Product.css';
import { BasketContext } from '../Context/Basket';
import { WishlistContext } from '../Context/Wishlist';
import { AuthContext } from '../Context/Auth';
import { useMutation } from '@apollo/client';
import { setLikedProduct } from '../Apollo/Products';

const Product = ({product, setClickedLogin, setClickedMenu, liked, clickedMenu, setClickedBasket, setClickedWishlist, handleOpening, clickedBasket, clickedWishlist}:{product:ProductType, setClickedLogin:React.Dispatch<React.SetStateAction<boolean>>, liked: boolean, clickedMenu:boolean, setClickedBasket:React.Dispatch<React.SetStateAction<boolean>>, setClickedWishlist: React.Dispatch<React.SetStateAction<boolean>>,  setClickedMenu:React.Dispatch<React.SetStateAction<boolean>>, clickedBasket: boolean, clickedWishlist: boolean,handleOpening: (type: "user" | "wishlist" | "basket" | "language") => void }) => {
    

  const bContext = useContext(BasketContext);
  const wContext = useContext(WishlistContext);
  const aContext = useContext(AuthContext);

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

    const [isMounted ,setIsMounted] = useState<boolean>(false);

    const [likedInner, setLikedInner] = useState<boolean>(liked);
    const [likes, setLikes] = useState<number>(product.likes);

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

  const handleLoadingLike = () => {

  }

  const handleLike = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void => {
    if(!loading){
    e.stopPropagation();
    if (!aContext.isLoggedIn) {
      setClickedLogin(true);
    } else {
      likedMutation().then(() => {
        setLikes(likedInner ? likes - 1: !liked ?  likes + 1 : likes);
        setLikedInner(!likedInner);
      })
    }
  }
  };


  return (
    <div className={`product`}>
        <div className={`product__img`}>
            <img src={product.backgroundImg + "1.jpg"} alt={""} loading={"lazy"}/>
            <img src={product.foregroundImg + "10.jpg"} alt={""} loading={"lazy"}/>
        </div>
        <h3>{product.title}</h3>
        <div className="product__btns">
            <div className="product__btns-heart" onClick={handleLike}>
                <img src={true? "/assets/svg/heart.svg" : "/assets/svg/heart-half.svg"} alt="" loading={"lazy"} />
                <span>{likes}</span>
            </div>
            <button onClick={(e) => handleWishlist(e)} className={wContext.isInWishlist(product.id) ? "product__btns-wishlist-clicked" : ""}></button>
            <div className="product__btns-basket" onClick={(e) => handleBasket(e)}>
              <img src={bContext.isInBasket(product.id) ? "/assets/svg/basket_clicked.svg" : "/assets/svg/basket_unclicked.svg"} alt="" loading={"lazy"}/>
            </div>
        </div>
    </div>
  )
}

export default Product