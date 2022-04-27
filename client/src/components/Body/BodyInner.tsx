import React, { useContext, useEffect, useState } from "react";
import "../../styles/components/Body/BodyInner.css";
import { useLazyQuery } from "@apollo/client";
import { getAllProductsMain } from "../../Apollo/Products";
import { ProductType } from "../../types/Product";
import { AuthContext } from "../../Context/Auth";
import { getUserLikedProducts } from "../../Apollo/User";
import shuffle from "../../Logic/randomize";
import ProductCustom from "../../Comp-Single/ProductCustom";
import Product from "../../Comp-Single/Product";

function BodyInner({
  setClickedLogin,
  chosenMode,
  setClickedMenu,
  clickedMenu,
  setClickedBasket,
  setClickedWishlist,
  handleOpening,
  clickedBasket,
  clickedWishlist,
  custom,
  accessories
}: {
  setClickedLogin: React.Dispatch<React.SetStateAction<boolean>>;
  chosenMode: boolean | undefined;
  setClickedMenu: React.Dispatch<React.SetStateAction<boolean>>;
  clickedMenu: boolean;
  setClickedBasket: React.Dispatch<React.SetStateAction<boolean>>;
  setClickedWishlist: React.Dispatch<React.SetStateAction<boolean>>;
  handleOpening: (type: "user" | "wishlist" | "basket" | "language") => void;
  clickedBasket: boolean;
  clickedWishlist: boolean;
  custom?:boolean;
  accessories?:boolean;
}) {
  const aContext = useContext(AuthContext);

  const [randomProd, setRandomProd] = useState<ProductType[]>();

  const [
    getAllProductsNonCustomizableQuery,
    { loading: loadingNon, data: dataNon, error: errorNon },
  ] = useLazyQuery(getAllProductsMain, {
    variables: {
      isCustomizable: false,
    },
  });

  const [
    getUserLikedProductsQuery,
    { loading: loadingL, data: dataL, error: errorL },
  ] = useLazyQuery(getUserLikedProducts, {
    variables: {
      id: aContext.userId,
    },
  });

  useEffect(()=>{
    if(!accessories && !dataNon){
      getAllProductsNonCustomizableQuery();
    }
  }, [window.location.pathname])

  useEffect(()=>{
    if(dataNon && custom && !randomProd){
      //todo: change when got first 50 pics
      // setRandomProd(shuffle(dataNon.getProducts));
      setRandomProd(dataNon.getProducts);
    }
  }, [dataNon, custom])


  //todo: remove after you got 50 pics for each product


  const [isMounted, setIsMounted] = useState<boolean>(false);


  useEffect(() => {
    if (aContext.isLoggedIn && !isMounted) {
      setIsMounted(true);
      getUserLikedProductsQuery();
    }
  }, [aContext]);


  // useEffect(() => {
  //   //TODO: Handle errors
  //   if (errorNon) {
  //   }
  //   if (error) {
  //   }
  //   if (errorL) {
  //   }
  // }, [errorNon, error, errorL]);
  

  return (
    <div className="bodyInner">
      {dataNon && !custom && !accessories ? 
      dataNon.getProducts.map((product:ProductType) => {
        return <Product key={product.id}
        product={product}
        setClickedLogin={setClickedLogin}
        setClickedMenu={setClickedMenu}
        liked={dataL ? dataL.getUserInfo.likedProducts.filter((productL:string) => productL === product.id ? product : undefined).length > 0 : false}
        clickedMenu={clickedMenu}
        setClickedBasket={setClickedBasket}
        setClickedWishlist={setClickedWishlist}
        handleOpening={handleOpening}
        clickedBasket={clickedBasket}
        clickedWishlist={clickedWishlist}
        />
      }) : ""  
    }
    {
      randomProd && custom? 
      randomProd.map((product: ProductType, i:number) => {}) : ""}
      </div>
  );
}

export default React.memo(BodyInner);
