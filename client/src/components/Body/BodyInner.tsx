// import React, {
//   Suspense,
//   useCallback,
//   useContext,
//   useEffect,
//   useRef,
//   useState,
// } from "react";
// import "../../styles/components/Body/BodyInner.css";
// import { useLazyQuery } from "@apollo/client";
// import { getAllProductsMain } from "../../Apollo/Products";
// import { ProductType } from "../../types/Product";
// import { AuthContext } from "../../Context/Auth";
// import { getUserLikedProducts } from "../../Apollo/User";
// import { shuffle, shuffle_acc } from "../../Logic/randomize";
// import ProductCustom from "../../Comp-Single/ProductCustom";
// import Product from "../../Comp-Single/Product";
// import Product360 from "../../Comp-Single/Product360";
// import { AccessoryType } from "../../types/Accessory";
// import { getAccessories } from "../../Apollo/Accessory";
// import Accessory from "../../Comp-Single/Accessory";
// import { useLocation } from "react-router-dom";

// function BodyInner({
//   setClickedLogin,
//   chosenMode,
//   setClickedMenu,
//   clickedMenu,
//   setClickedBasket,
//   setClickedWishlist,
//   handleOpening,
//   clickedBasket,
//   clickedWishlist,
//   custom,
//   accessories,
// }: {
//   setClickedLogin: React.Dispatch<React.SetStateAction<boolean>>;
//   chosenMode: boolean | undefined;
//   setClickedMenu: React.Dispatch<React.SetStateAction<boolean>>;
//   clickedMenu: boolean;
//   setClickedBasket: React.Dispatch<React.SetStateAction<boolean>>;
//   setClickedWishlist: React.Dispatch<React.SetStateAction<boolean>>;
//   handleOpening: (type: "user" | "wishlist" | "basket" | "language") => void;
//   clickedBasket: boolean;
//   clickedWishlist: boolean;
//   custom?: boolean;
//   accessories?: boolean;
// }) {
//   const aContext = useContext(AuthContext);

//   const location = useLocation();
//   const [offset, setOffset] = useState<number>(0);
//   const single_column_limit = 3;
//   const three_column_limit = 10;
//   const [loadMoreProducts, setLoadMoreProducts] = useState<boolean>(false);
//   const lastProductRef = useRef<HTMLDivElement>(null);

//   const [randomProd, setRandomProd] = useState<ProductType[]>();
//   const [randomAcc, setRandomAcc] = useState<AccessoryType[]>();

//   const [id, setId] = useState<string>();

//   useEffect(() => {
//     if (aContext.userId) {
//       setId(aContext.userId);
//     }
//   }, [aContext.userId]);

//   console.log(location.pathname);
//   const [
//     getAllProductsNonCustomizableQuery,
//     {
//       loading: loadingNon,
//       data: dataNon,
//       error: errorNon,
//       fetchMore: fetchMoreProducts,
//     },
//   ] = useLazyQuery(getAllProductsMain, {
//     variables: {
//       dark: chosenMode === undefined || chosenMode ? false : true,
//       offset,
//       limit:
//         location.pathname === "/" ? single_column_limit : three_column_limit,
//     },
//   });

//   const [
//     getAllAccessoriesQuery,
//     { loading: loadingAcc, data: dataAcc, error: errorAcc },
//   ] = useLazyQuery(getAccessories);

//   const [
//     getUserLikedProductsQuery,
//     { loading: loadingL, data: dataL, error: errorL },
//   ] = useLazyQuery(getUserLikedProducts, {
//     variables: {
//       id,
//     },
//   });

//   useEffect(() => {
//     if (!accessories) {
//       getAllProductsNonCustomizableQuery();
//     }
//   }, [chosenMode, accessories, getAllProductsNonCustomizableQuery, location]);

//   useEffect(() => {
//     if (window.location.pathname === "/accessories" && !dataAcc) {
//       getAllAccessoriesQuery();
//     }
//   }, [dataAcc, getAllAccessoriesQuery, location]);

//   useEffect(() => {
//     if (dataNon && custom) {
//       shuffle(dataNon.getProducts).then((res) => {
//         setRandomProd(res);
//       });
//     }
//   }, [dataNon, custom]);

//   useEffect(() => {
//     if (dataAcc && accessories && !randomAcc) {
//       shuffle_acc(dataAcc.getAccessories).then((res) => {
//         setRandomAcc(res);
//       });
//     }
//   }, [dataAcc, accessories, randomAcc]);

//   const [isMounted, setIsMounted] = useState<boolean>(false);

//   useEffect(() => {
//     if (aContext.isLoggedIn && !isMounted && id) {
//       setIsMounted(true);
//       getUserLikedProductsQuery();
//     }
//   }, [id, getUserLikedProductsQuery, isMounted, location, aContext.isLoggedIn]);

//   const ref360 = useRef<HTMLDivElement>(null);

//   const [hasClicked, setHasClicked] = useState<boolean>(false);

//   const handleChangeProduct360 = (product: ProductType): void => {
//     if (randomProd) {
//       const current = Object.assign({}, randomProd[0]);
//       setRandomProd((prevState) =>
//         prevState?.map((inner_prod, i) =>
//           i === 0
//             ? product
//             : inner_prod.id === product.id
//             ? current
//             : inner_prod
//         )
//       );
//       setHasClicked(true);
//     }
//   };

//   useEffect(() => {
//     // if (ref360.current && hasClicked) {
//     //   setHasClicked(false);
//     //   ref360.current.scrollIntoView({ block: "end" });
//     // }
//     if (hasClicked) {
//       setHasClicked(false);
//       window.scrollTo({ top: 0 });
//     }
//   }, [hasClicked]);

//   // useEffect(() => {
//   //   //TODO: Handle errors
//   //   if (errorNon) {
//   //   }
//   //   if (error) {
//   //   }
//   //   if (errorL) {
//   //   }
//   //   if (errorAcc){
//   //
//   // }
//   // }, [errorNon, error, errorL]);

//   const handleScrolling = useCallback(() => {
//     if (lastProductRef.current) {
//       const top = lastProductRef.current.offsetTop;
//       const height = lastProductRef.current.offsetHeight;
//       const y = window.scrollY;
//       if (height + y >= top && !loadingNon) {
//         setLoadMoreProducts(true);
//       }
//     }
//   }, [loadingNon]);

//   useEffect(() => {
//     window.addEventListener("scroll", handleScrolling);
//     return () => window.removeEventListener("scroll", handleScrolling);
//   }, [handleScrolling, loadingNon]);

//   useEffect(() => {
//     if (loadMoreProducts) {
//       setLoadMoreProducts(false);
//       fetchMoreProducts({
//         variables: {
//           offset: offset + single_column_limit,
//         },
//       });
//       setOffset(offset + single_column_limit);
//     }
//   }, [fetchMoreProducts, loadMoreProducts, offset, location.pathname]);

//   return (
//     <div className="bodyInner">
//       {dataNon && !custom && !accessories
//         ? dataNon.getProducts.map((product: ProductType, i: number) => {
//             return (
//               <Product
//                 key={product.id + product.title}
//                 product={product}
//                 setClickedLogin={setClickedLogin}
//                 setClickedMenu={setClickedMenu}
//                 liked={
//                   dataL
//                     ? dataL.getUserInfo.likedProducts.filter(
//                         (productL: string) =>
//                           productL === product.id ? product : undefined
//                       ).length > 0
//                     : false
//                 }
//                 clickedMenu={clickedMenu}
//                 setClickedBasket={setClickedBasket}
//                 setClickedWishlist={setClickedWishlist}
//                 handleOpening={handleOpening}
//                 clickedBasket={clickedBasket}
//                 clickedWishlist={clickedWishlist}
//                 refProduct={
//                   i === dataNon.getProducts.length - 1
//                     ? lastProductRef
//                     : undefined
//                 }
//               />
//             );
//           })
//         : ""}
//       {randomProd &&
//       custom &&
//       (chosenMode === undefined || chosenMode === true) &&
//       !loadingNon ? (
//         <>
//           <Product360
//             ref360={ref360}
//             product={randomProd[0]}
//             clickedBasket={clickedBasket}
//             clickedMenu={clickedMenu}
//             setClickedBasket={setClickedBasket}
//             setClickedMenu={setClickedMenu}
//             handleOpening={handleOpening}
//           />
//           <div className="bodyInner-random">
//             {randomProd.map((product: ProductType, i: number) => {
//               if (i > 0) {
//                 return (
//                   <ProductCustom
//                     loading_img={i < 6 ? "eager" : "lazy"}
//                     product={product}
//                     key={i}
//                     handleChangeProduct360={handleChangeProduct360}
//                   />
//                 );
//               }
//             })}
//           </div>
//         </>
//       ) : (
//         ""
//       )}
//       {randomProd &&
//       custom &&
//       chosenMode === false &&
//       chosenMode !== undefined &&
//       !loadingNon ? (
//         <div className="bodyInner-random">
//           {randomProd.map((product: ProductType, i: number) => {
//             return (
//               <ProductCustom
//                 loading_img={i < 6 ? "eager" : "lazy"}
//                 product={product}
//                 key={i}
//                 dark={true}
//                 clickedMenu={clickedMenu}
//                 setClickedBasket={setClickedBasket}
//                 setClickedMenu={setClickedMenu}
//                 clickedBasket={clickedBasket}
//                 handleOpening={handleOpening}
//                 setClickedLogin={setClickedLogin}
//                 setClickedWishlist={setClickedWishlist}
//                 clickedWishlist={clickedWishlist}
//               />
//             );
//           })}
//         </div>
//       ) : (
//         ""
//       )}
//       {randomAcc && accessories && !loadingAcc ? (
//         <div className="bodyInner-random">
//           {randomAcc.map((accessory: AccessoryType, i: number) => {
//             return (
//               <Accessory
//                 loading_img={i < 6 ? "eager" : "lazy"}
//                 accessory={accessory}
//                 key={i}
//                 setClickedLogin={setClickedLogin}
//                 setClickedBasket={setClickedBasket}
//                 setClickedMenu={setClickedMenu}
//                 setClickedWishlist={setClickedWishlist}
//                 clickedBasket={clickedBasket}
//                 clickedMenu={clickedMenu}
//                 clickedWishlist={clickedWishlist}
//                 liked={true}
//                 handleOpening={handleOpening}
//               />
//             );
//           })}
//         </div>
//       ) : (
//         ""
//       )}
//     </div>
//   );
// }

// export default React.memo(BodyInner);

import { useLazyQuery } from "@apollo/client";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useLocation } from "react-router-dom";
import { getAccessories } from "../../Apollo/Accessory";
import { getAllProductsMain } from "../../Apollo/Products";
import Product from "../../Comp-Single/Product";
import ProductCustom from "../../Comp-Single/ProductCustom";
import { AccessoryType, AccessoryTypeBasket } from "../../types/Accessory";
import { ProductType, ProductTypeBasket } from "../../types/Product";
import "../../styles/components/Body/BodyInner.css";
import Product360 from "../../Comp-Single/Product360";
import { shuffle, shuffle_acc } from "../../Logic/randomize";
import { cloneDeep } from "lodash";
import { getUserLikedProducts } from "../../Apollo/User";
import { AuthContext } from "../../Context/Auth";
import Accessory from "../../Comp-Single/Accessory";
import LoadingProducts from "../../Comp-Single/LoadingProducts";
import FinishedProducts from "../../Comp-Single/FinishedProducts";

const BodyInner = ({
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
}) => {
  const location = useLocation();

  const [offset_main, setOffset_main] = useState<number>(0);
  const [offset_360, setOffset_360] = useState<number>(0);
  const [offset_dark, setOffset_dark] = useState<number>(0);
  const [offset_acc, setOffset_acc] = useState<number>(0);

  const limit_main = 3;
  const limit_three_cols = 9;
  const limit_360_initial = 4;

  const [products_main, setProducts_main] = useState<ProductType[]>([]);
  const [products_360, setProducts_360] = useState<ProductType[]>([]);
  const [clicked_360, set_clicked_360] = useState<ProductType>();
  const [products_dark, setProducts_dark] = useState<ProductType[]>([]);
  const [acc, setAcc] = useState<AccessoryType[]>([]);

  const lastProductRef_main = useRef<HTMLDivElement>(null);
  const lastProductRef_360 = useRef<HTMLDivElement>(null);
  const lastProductRef_dark = useRef<HTMLDivElement>(null);
  const lastAccessoryRef = useRef<HTMLDivElement>(null);
  const ref360 = useRef<HTMLDivElement>(null);

  const [loadMore_main, setLoadMore_main] = useState<boolean>(false);
  const [loadMore_dark, setLoadMore_dark] = useState<boolean>(false);
  const [loadMore_acc, setLoadMore_acc] = useState<boolean>(false);
  const [hasClicked, setHasClicked] = useState<boolean>(false);

  const [rendered_main, setRendered_main] = useState<JSX.Element[]>();
  const [rendered_360, setRendered_360] = useState<JSX.Element[]>();
  const [rendered_active_360, set_rendered_active_360] = useState<
    JSX.Element[]
  >([]);
  const [rendered_dark, setRendered_dark] = useState<JSX.Element[]>();
  const [rendered_acc, setRendered_acc] = useState<JSX.Element[]>();

  const [finished_main, setFinished_main] = useState<boolean>(false);
  const [finished_360, setFinished_360] = useState<boolean>(false);
  const [finished_dark, setFinished_dark] = useState<boolean>(false);
  const [finished_acc, setFinished_acc] = useState<boolean>(false);

  const [isSpinning, setIsSpinning] = useState<boolean>(false);

  const [
    getProducts_main,
    {
      error: errorMain,
      loading: loadingMain,
      data: dataMain,
      fetchMore: fetchMoreMain,
    },
  ] = useLazyQuery<
    { getProducts: ProductType[] },
    { offset: number; limit: number; dark: boolean }
  >(getAllProductsMain, {
    variables: {
      offset: offset_main,
      limit: limit_main,
      dark: false,
    },
  });

  const [
    getProducts_360,
    { error: error360, loading: loading360, data: data360 },
  ] = useLazyQuery<{ getProducts: ProductType[] }, { dark: boolean }>(
    getAllProductsMain,
    {
      variables: {
        dark: false,
      },
    }
  );

  const [
    getProducts_dark,
    {
      error: errorDark,
      loading: loadingDark,
      data: dataDark,
      fetchMore: fetchMoreDark,
    },
  ] = useLazyQuery<
    { getProducts: ProductType[] },
    { offset: number; limit: number; dark: boolean }
  >(getAllProductsMain, {
    variables: {
      offset: offset_dark,
      limit: limit_three_cols,
      dark: true,
    },
  });

  // TODO: Change acc with offset,limit
  const [
    getAcc,
    {
      error: errorAcc,
      loading: loadingAcc,
      data: dataAcc,
      fetchMore: fetchMoreAcc,
    },
  ] = useLazyQuery(getAccessories);

  useEffect(() => {
    switch (location.pathname) {
      case "/":
        if (products_main.length === 0) {
          getProducts_main();
        }
        break;
      case "/light":
        if (products_360.length === 0) {
          getProducts_360();
        }
        break;
      case "/dark":
        if (products_dark.length === 0) {
          getProducts_dark();
        }
        break;
      case "/accessories":
        if (acc.length === 0) {
          getAcc();
        }
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  useEffect(() => {
    if (dataMain) {
      setProducts_main([...products_main, ...dataMain.getProducts]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataMain]);

  useEffect(() => {
    if (data360) {
      setProducts_360([...products_360, ...data360.getProducts]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data360]);

  useEffect(() => {
    if (dataDark) {
      setProducts_dark([...products_dark, ...dataDark.getProducts]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataDark]);

  useEffect(() => {
    if (dataAcc) {
      setAcc([...acc, ...dataAcc.getAccessories]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataAcc]);

  const render_my_prods_main = useCallback(() => {
    setRendered_main(
      products_main.map((product, i) => {
        return (
          <Product
            key={product._id + product.title}
            product={product}
            setClickedLogin={setClickedLogin}
            setClickedMenu={setClickedMenu}
            clickedMenu={clickedMenu}
            setClickedBasket={setClickedBasket}
            setClickedWishlist={setClickedWishlist}
            handleOpening={handleOpening}
            clickedBasket={clickedBasket}
            clickedWishlist={clickedWishlist}
            refProduct={
              i === products_main.length - 1 ? lastProductRef_main : undefined
            }
          />
        );
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset_main, products_main]);

  const handle360Change = (product: ProductType): void => {
    set_clicked_360(product);
  };
  useEffect(() => {
    if (clicked_360 && rendered_active_360.length > 0 && !hasClicked) {
      const current = cloneDeep(rendered_active_360[0]);

      set_rendered_active_360((prevState) =>
        prevState.map((inner_prod, i) =>
          i === 0 ? (
            <Product360
              ref360={ref360}
              product={clicked_360}
              clickedBasket={clickedBasket}
              clickedMenu={clickedMenu}
              setClickedBasket={setClickedBasket}
              setClickedMenu={setClickedMenu}
              handleOpening={handleOpening}
            />
          ) : inner_prod.props.product._id === clicked_360._id ? (
            <ProductCustom
              product={current.props.product}
              key={current.props.product._id + current.props.product.title}
              refProduct={
                i === prevState.length - 1 ? lastProductRef_360 : undefined
              }
              handle360Change={handle360Change}
            />
          ) : (
            inner_prod
          )
        )
      );
      setHasClicked(true);
    }
  }, [clicked_360]);

  const render_my_prods_360 = useCallback(() => {
    if (data360) {
      shuffle(data360.getProducts).then((res) => {
        setRendered_360(
          res.map((product, i) => {
            return i === 0 ? (
              <Product360
                ref360={ref360}
                product={product}
                clickedBasket={clickedBasket}
                clickedMenu={clickedMenu}
                setClickedBasket={setClickedBasket}
                setClickedMenu={setClickedMenu}
                handleOpening={handleOpening}
              />
            ) : (
              <ProductCustom
                product={product}
                key={product._id + product.title}
                refProduct={
                  i === limit_360_initial - 1 ? lastProductRef_360 : undefined
                }
                handle360Change={handle360Change}
              />
            );
          })
        );
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data360]);

  useEffect(() => {
    if (rendered_360 && rendered_active_360.length === 0) {
      set_rendered_active_360(
        rendered_360.slice(offset_360, limit_360_initial)
      );
      setOffset_360(offset_360 + limit_360_initial);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rendered_360]);

  useEffect(() => {
    if (hasClicked) {
      setHasClicked(false);
      window.scrollTo({ top: 0 });
    }
  }, [hasClicked]);

  const render_my_prods_dark = useCallback(() => {
    setRendered_dark(
      products_dark.map((product, i) => {
        return (
          <ProductCustom
            product={product}
            key={product._id + product.title}
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
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset_dark, products_dark]);

  const render_my_acc = useCallback(() => {
    setRendered_acc(
      acc.map((accessory, i) => {
        return (
          <Accessory
            accessory={accessory}
            key={i}
            setClickedLogin={setClickedLogin}
            setClickedBasket={setClickedBasket}
            setClickedMenu={setClickedMenu}
            setClickedWishlist={setClickedWishlist}
            clickedBasket={clickedBasket}
            clickedMenu={clickedMenu}
            clickedWishlist={clickedWishlist}
            liked={true}
            handleOpening={handleOpening}
          />
        );
      })
    );
  }, [offset_acc, acc]);

  useEffect(() => {
    render_my_prods_main();
  }, [render_my_prods_main]);

  useEffect(() => {
    render_my_prods_360();
  }, [render_my_prods_360]);

  useEffect(() => {
    render_my_prods_dark();
  }, [render_my_prods_dark]);

  useEffect(() => {
    render_my_acc();
  }, [render_my_acc]);

  const load_more_360 = useCallback(() => {
    if (rendered_360 && !finished_360 && offset_360 > 0) {
      setIsSpinning(true);
      const timeout = setTimeout(() => {
        rendered_active_360.filter((prod, i) => {
          if (i === rendered_active_360.length - 1) {
            return (
              <ProductCustom
                product={prod.props.product}
                key={prod.props.product._id + prod.props.product.title}
                refProduct={undefined}
                handle360Change={handle360Change}
              />
            );
          }
          return prod;
        });
        var new_prod = cloneDeep(rendered_active_360);
        new_prod[new_prod.length - 1] = (
          <ProductCustom
            product={new_prod[new_prod.length - 1].props.product}
            key={new_prod[new_prod.length - 1].key}
            refProduct={undefined}
            handle360Change={handle360Change}
          />
        );
        var extra_prod = rendered_360.slice(
          offset_360,
          offset_360 + limit_three_cols
        );
        extra_prod[extra_prod.length - 1] = (
          <ProductCustom
            product={extra_prod[extra_prod.length - 1].props.product}
            key={extra_prod[extra_prod.length - 1].key}
            refProduct={lastProductRef_360}
            handle360Change={handle360Change}
          />
        );
        new_prod.push(...extra_prod);
        set_rendered_active_360(new_prod);
        setOffset_360(offset_360 + limit_three_cols);
        setIsSpinning(false);
        return () => clearTimeout(timeout);
      }, 500);
    }
  }, [finished_360, offset_360, rendered_360, rendered_active_360]);

  useEffect(() => {
    if (rendered_360 && rendered_active_360.length === rendered_360.length) {
      setFinished_360(true);
    }
  }, [rendered_360, rendered_active_360]);

  const handleScrolling = useCallback(() => {
    switch (location.pathname) {
      case "/":
        if (lastProductRef_main.current) {
          const top = lastProductRef_main.current.offsetTop;
          const height = lastProductRef_main.current.offsetHeight;
          const y = window.scrollY;
          if (height + y >= top && !loadingMain) {
            setLoadMore_main(true);
          }
        }
        break;
      case "/light":
        if (lastProductRef_360.current) {
          const top = lastProductRef_360.current.offsetTop;
          const height = lastProductRef_360.current.offsetHeight;
          const y = window.scrollY;
          if (height + y >= top && !loading360 && rendered_360) {
            load_more_360();
          }
        }
        break;
      case "/dark":
        if (lastProductRef_dark.current) {
          const top = lastProductRef_dark.current.offsetTop;
          const height = lastProductRef_dark.current.offsetHeight;
          const y = window.scrollY;
          if (height + y >= top && !loadingDark) {
            setLoadMore_dark(true);
          }
        }
        break;
      case "/accessories":
        if (lastAccessoryRef.current) {
          const top = lastAccessoryRef.current.offsetTop;
          const height = lastAccessoryRef.current.offsetHeight;
          const y = window.scrollY;
          if (height + y >= top && !loadingAcc) {
            setLoadMore_acc(true);
          }
        }
        break;
    }
  }, [
    load_more_360,
    loading360,
    loadingAcc,
    loadingDark,
    loadingMain,
    location.pathname,
    rendered_360,
  ]);

  useEffect(() => {
    window.addEventListener("scroll", handleScrolling);
    return () => window.removeEventListener("scroll", handleScrolling);
  }, [handleScrolling]);

  useEffect(() => {
    if (loadMore_main && !finished_main) {
      setLoadMore_main(false);
      setIsSpinning(true);
      const timeout = setTimeout(() => {
        fetchMoreMain({
          variables: {
            offset: offset_main + limit_main,
          },
        }).then(({ data }) => {
          if (data.getProducts.length < limit_main) {
            setFinished_main(true);
          }
          setIsSpinning(false);
        });
        setOffset_main(offset_main + limit_main);
        return () => clearTimeout(timeout);
      }, 500);
    }
  }, [fetchMoreMain, loadMore_main, offset_main]);

  useEffect(() => {
    if (loadMore_dark && !finished_dark) {
      setLoadMore_dark(false);
      setIsSpinning(true);
      const timeout = setTimeout(() => {
        fetchMoreDark({
          variables: {
            offset: offset_dark + limit_three_cols,
          },
        }).then(({ data }) => {
          if (data.getProducts.length < limit_three_cols) {
            setFinished_dark(true);
          }
          setIsSpinning(false);
        });
        setOffset_dark(offset_dark + limit_three_cols);
        return () => clearTimeout(timeout);
      }, 500);
    }
  }, [fetchMoreDark, loadMore_dark, offset_dark]);

  useEffect(() => {
    if (loadMore_acc && !finished_acc) {
      setLoadMore_acc(false);
      setIsSpinning(true);
      const timeout = setTimeout(() => {
        fetchMoreAcc({
          variables: {
            offset: offset_acc + limit_three_cols,
          },
        }).then(({ data }) => {
          if (data.getAccessories.length < limit_three_cols) {
            setFinished_acc(true);
          }
          setIsSpinning(false);
        });
        setOffset_acc(offset_acc + limit_three_cols);
        return () => clearTimeout(timeout);
      }, 500);
    }
  }, [fetchMoreAcc, loadMore_acc, offset_acc]);

  return (
    <div className="bodyInner">
      {location.pathname === "/" ? (
        rendered_main
      ) : location.pathname === "/light" ? (
        <>
          {rendered_active_360 ? rendered_active_360[0] : ""}
          <div className="bodyInner-random">{rendered_active_360.slice(1)}</div>
        </>
      ) : location.pathname === "/dark" ? (
        <div className="bodyInner-random">{rendered_dark}</div>
      ) : location.pathname === "/accessories" ? (
        <div className="bodyInner-random">{rendered_acc}</div>
      ) : (
        ""
      )}
      {(loadingMain && !finished_main) ||
      (loading360 && !finished_360) ||
      (loadingDark && !finished_dark) ||
      (loadingAcc && !finished_acc) ||
      isSpinning ? (
        <LoadingProducts />
      ) : (
        ""
      )}
      {(finished_main && location.pathname === "/") ||
      (finished_360 && location.pathname === "/light") ||
      (finished_acc && location.pathname === "/dark") ||
      (finished_acc && location.pathname === "/accessories") ? (
        <FinishedProducts />
      ) : (
        ""
      )}
    </div>
  );
};

export default BodyInner;
