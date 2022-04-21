import React, { useContext, useEffect } from "react";
import "../../styles/components/Body/BodyInner.css";
import Product from "../../Comp-Single/Product";
import { useLazyQuery } from "@apollo/client";
import { getAllProductsMain } from "../../Apollo/Products";
import { ProductType } from "../../types/Product";
import { AuthContext } from "../../Context/Auth";
import { getUserLikedProducts } from "../../Apollo/User";

function BodyInner({
  setClickedLogin,
  currentOption,
  chosenMode,
}: {
  setClickedLogin: React.Dispatch<React.SetStateAction<boolean>>;
  currentOption: boolean[];
  chosenMode: boolean | undefined;
}) {
  const aContext = useContext(AuthContext);

  const [
    getAllProductsNonCustomizableQuery,
    { loading: loadingNon, data: dataNon, error: errorNon },
  ] = useLazyQuery(getAllProductsMain, {
    variables: {
      isCustomizable: false,
    },
  });

  const [getAllProductsCustomizableQuery, { loading, data, error }] =
    useLazyQuery(getAllProductsMain, {
      variables: {
        isCustomizable: true,
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

  useEffect(() => {
    if (currentOption[0]) {
      getAllProductsNonCustomizableQuery();
    } else if (currentOption[1]) {
      getAllProductsCustomizableQuery();
    } else if (currentOption[2]) {
    }
  }, [currentOption]);

  useEffect(() => {
    if (aContext.isLoggedIn) {
      getUserLikedProductsQuery();
    }
  }, [aContext]);

  useEffect(() => {
    //TODO: Handle errors
    if (errorNon) {
    }
    if (error) {
    }
    if (errorL) {
    }
  }, [errorNon, error, errorL]);

  return (
    <div className="bodyInner">
      {currentOption[0] && dataNon ? (
        <>
          {dataNon.getProducts.map((product: ProductType, i: number) => {
            return (
              <Product
                key={i}
                liked={
                  dataL
                    ? dataL.getUserInfo.likedProducts.find(
                        (id: string) => id === product.id
                      )
                    : false
                }
                type={"normal"}
                product={product}
                setClickedLogin={setClickedLogin}
              />
            );
          })}
        </>
      ) : currentOption[1] && data ? (
        <>
          {data.getProducts.map((product: ProductType, i: number) => {
            return (
              <Product
                key={i}
                liked={
                  dataL
                    ? dataL.getUserInfo.likedProducts.find(
                        (id: string) => id === product.id
                      )
                    : false
                }
                type="360"
                chosenMode={chosenMode}
                product={product}
                setClickedLogin={setClickedLogin}
              />
            );
          })}
        </>
      ) : // <Product type={"360"} />
      currentOption[2] ? (
        ""
      ) : (
        // <Product type={"normal"} />
        ""
      )}
    </div>
  );
}

export default React.memo(BodyInner);
