import React, { useContext, useEffect, useState } from "react";
import "../../styles/components/Body/BodyInner.css";
import Product from "../../Comp-Single/Product";
import { useLazyQuery } from "@apollo/client";
import { getAllProductsMain } from "../../Apollo/Products";
import { ProductType } from "../../types/Product";
import { AuthContext } from "../../Context/Auth";
import { getUserLikedProducts } from "../../Apollo/User";
import shuffle from "../../Logic/randomize";
import ProductCustom from "../../Comp-Single/ProductCustom";

function BodyInner({
  setClickedLogin,
  chosenMode,
  setClickedMenu,
  clickedMenu,
  setClickedBasket,
  setClickedWishlist,
  setClickedUser,
  setClickedLanguage,
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
  setClickedUser: React.Dispatch<React.SetStateAction<boolean>>;
  setClickedLanguage: React.Dispatch<React.SetStateAction<boolean>>;
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

  useEffect(()=>{
    if(dataNon){
      console.log(dataNon)
    }
  }, [dataNon])

  //todo: remove after you got 50 pics for each product




  useEffect(() => {
    if (aContext.isLoggedIn) {
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
        chosenMode={chosenMode}
        product={product}
        setClickedLogin={setClickedLogin}
        setClickedMenu={setClickedMenu}
        liked={true}
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
      randomProd.map((product: ProductType, i:number) => {
        if(product.id === "626153ac8b26eced2ce17eb1" || product.id === "6267c0266583c7fb140f3843"){
        return (
          <>
          <Product key={product.id}
          chosenMode={chosenMode}
          product={product}
          setClickedLogin={setClickedLogin}
          setClickedMenu={setClickedMenu}
          liked={true}
          clickedMenu={clickedMenu}
          setClickedBasket={setClickedBasket}
          setClickedWishlist={setClickedWishlist}
          handleOpening={handleOpening}
          clickedBasket={clickedBasket}
          clickedWishlist={clickedWishlist}
          //todo: change when got first 50 pics
          firstProduct={product.id === "626153ac8b26eced2ce17eb1"}
          type="360"
          />
          {product.id === "626153ac8b26eced2ce17eb1" ? <ProductCustom productId={product.id}/> : ""}
          </>
        )
        }
      })
    : ""}
      </div>
  );
}

export default React.memo(BodyInner);
