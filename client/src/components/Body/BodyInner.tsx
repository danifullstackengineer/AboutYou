import React, { useContext, useEffect, useRef, useState } from "react";
import "../../styles/components/Body/BodyInner.css";
import { useLazyQuery } from "@apollo/client";
import { getAllProductsMain } from "../../Apollo/Products";
import { ProductType } from "../../types/Product";
import { AuthContext } from "../../Context/Auth";
import { getUserLikedProducts } from "../../Apollo/User";
import { shuffle, shuffle_acc } from "../../Logic/randomize";
import ProductCustom from "../../Comp-Single/ProductCustom";
import Product from "../../Comp-Single/Product";
import Product360 from "../../Comp-Single/Product360";
import { AccessoryType } from "../../types/Accessory";
import { getAccessories } from "../../Apollo/Accessory";
import Accessory from "../../Comp-Single/Accessory";

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
  accessories,
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
  custom?: boolean;
  accessories?: boolean;
}) {
  const aContext = useContext(AuthContext);

  const [randomProd, setRandomProd] = useState<ProductType[]>();
  const [randomAcc, setRandomAcc] = useState<AccessoryType[]>();

  const [
    getAllProductsNonCustomizableQuery,
    { loading: loadingNon, data: dataNon, error: errorNon },
  ] = useLazyQuery(getAllProductsMain, {
    variables: {
      dark: chosenMode === undefined || chosenMode ? false : true,
    },
  });

  const [
    getAllAccessoriesQuery,
    { loading: loadingAcc, data: dataAcc, error: errorAcc },
  ] = useLazyQuery(getAccessories);

  const [
    getUserLikedProductsQuery,
    { loading: loadingL, data: dataL, error: errorL },
  ] = useLazyQuery(getUserLikedProducts, {
    variables: {
      id: aContext.userId,
    },
  });

  useEffect(() => {
    if (!accessories) {
      getAllProductsNonCustomizableQuery();
    }
  }, [window.location.pathname, chosenMode]);

  useEffect(() => {
    if (window.location.pathname === "/accessories" && !dataAcc) {
      getAllAccessoriesQuery();
    }
  }, [window.location.pathname]);

  useEffect(() => {
    if (dataNon && custom) {
      shuffle(dataNon.getProducts).then((res) => {
        setRandomProd(res);
      });
    }
  }, [dataNon, custom]);

  useEffect(() => {
    if (dataAcc && accessories && !randomAcc) {
      shuffle_acc(dataAcc.getAccessories).then((res) => {
        setRandomAcc(res);
      });
    }
  }, [dataAcc, accessories]);

  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    if (aContext.isLoggedIn && !isMounted) {
      setIsMounted(true);
      getUserLikedProductsQuery();
    }
  }, [aContext]);

  const ref360 = useRef<HTMLDivElement>(null);

  const [hasClicked, setHasClicked] = useState<boolean>(false);

  const handleChangeProduct360 = (product: ProductType): void => {
    if (randomProd) {
      const current = Object.assign({}, randomProd[0]);
      setRandomProd((prevState) =>
        prevState?.map((inner_prod, i) =>
          i === 0
            ? product
            : inner_prod.id === product.id
            ? current
            : inner_prod
        )
      );
      setHasClicked(true);
    }
  };

  useEffect(() => {
    if (ref360.current && hasClicked) {
      setHasClicked(false);
      ref360.current.scrollIntoView({ block: "end" });
    }
  }, [hasClicked, ref360]);

  // useEffect(() => {
  //   //TODO: Handle errors
  //   if (errorNon) {
  //   }
  //   if (error) {
  //   }
  //   if (errorL) {
  //   }
  //   if (errorAcc){
  //
  // }
  // }, [errorNon, error, errorL]);

  return (
    <div className="bodyInner">
      {dataNon && !custom && !accessories
        ? dataNon.getProducts.map((product: ProductType) => {
            return (
              <Product
                key={product.id}
                product={product}
                setClickedLogin={setClickedLogin}
                setClickedMenu={setClickedMenu}
                liked={
                  dataL
                    ? dataL.getUserInfo.likedProducts.filter(
                        (productL: string) =>
                          productL === product.id ? product : undefined
                      ).length > 0
                    : false
                }
                clickedMenu={clickedMenu}
                setClickedBasket={setClickedBasket}
                setClickedWishlist={setClickedWishlist}
                handleOpening={handleOpening}
                clickedBasket={clickedBasket}
                clickedWishlist={clickedWishlist}
              />
            );
          })
        : ""}
      {randomProd &&
      custom &&
      (chosenMode === undefined || chosenMode === true) &&
      !loadingNon ? (
        <>
          <Product360
            ref360={ref360}
            product={randomProd[0]}
            clickedBasket={clickedBasket}
            clickedMenu={clickedMenu}
            setClickedBasket={setClickedBasket}
            setClickedMenu={setClickedMenu}
            handleOpening={handleOpening}
          />
          <div className="bodyInner-random">
            {randomProd.map((product: ProductType, i: number) => {
              if (i > 0) {
                return (
                  <ProductCustom
                    product={product}
                    key={i}
                    handleChangeProduct360={handleChangeProduct360}
                  />
                );
              }
            })}
          </div>
        </>
      ) : (
        ""
      )}
      {randomProd &&
      custom &&
      chosenMode === false &&
      chosenMode !== undefined &&
      !loadingNon ? (
        <div className="bodyInner-random">
          {randomProd.map((product: ProductType, i: number) => {
            return (
              <ProductCustom
                product={product}
                key={i}
                dark={true}
                clickedMenu={clickedMenu}
                setClickedBasket={setClickedBasket}
                setClickedMenu={setClickedMenu}
                clickedBasket={clickedBasket}
                handleOpening={handleOpening}
                setClickedLogin={setClickedLogin}
                setClickedWishlist={setClickedWishlist}
                clickedWishlist={clickedWishlist}
              />
            );
          })}
        </div>
      ) : (
        ""
      )}
      {randomAcc && accessories && !loadingAcc ? (
        <div className="bodyInner-random">
          {randomAcc.map((accessory: AccessoryType, i: number) => {
            return <Accessory accessory={accessory} key={i} />;
          })}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default BodyInner;
