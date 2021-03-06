import {
  Suspense,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/index.css";
import Body from "./components/Body";
import Credential from "./components/Credentials/Credential";
import HeaderBody from "./components/Header/HeaderBody";
import FooterBody from "./components/Footer/FooterBody";
import Checkout from "./components/Checkout/Checkout";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Basket from "./components/Basket/Basket";
import UserInformation from "./components/UserInformation/UserInformation";
import Subscribe from "./Comp-Single/Subscribe";
import ScrollIntoViewComponent from "./Comp-Single/ScrollIntoViewComponent";
import { AuthContext } from "./Context/Auth";
import { BasketContext, BasketContextType } from "./Context/Basket";
import { WishlistContext, WishlistContextType } from "./Context/Wishlist";
import mobileCheck from "./Logic/mobilecheck";
import { MobileContext } from "./Context/Mobile";
import Menu from "./Comp-Single/Menu";
import {
  addToBasketStorageAndContext,
  decrementProductStorage,
  getTotalPriceBasket,
  isProductInBasket,
  removeFromBasketStorageAndContext,
} from "./Logic/localStorage/basket";
import { loginLogic, logoutLogic } from "./Logic/localStorage/user";
import {
  addToWishlistStorageAndContext,
  isProductInWishlist,
  removeFromWishlistStorageAndContext,
} from "./Logic/localStorage/wishlist";
import Admin from "./components/Admin/Admin";
import { AccessLevel, AdminContext } from "./Context/Admin";
import CustomerCare from "./components/CustomerCare/CustomerCare";
import LandscapeWarn from "./Comp-Single/LandscapeWarn";

var logoutTimer: NodeJS.Timeout;

const promise = loadStripe(
  "pk_test_51KXAUxDelfvIQhggA3tpu3fek1HqAwqYU7SAxvQJtBhcD2ULDWuzvd0KouPGX7HrgJ8xKZbqk49L1HTL5Vwh01nj00LQLjwQQf"
);

function App() {
  const [clickedLogin, setClickedLogin] = useState<boolean>(false);
  const [closedSubscribe, setClosedSubscribe] = useState<boolean>(true);
  const [amount, setAmount] = useState<string>("");

  /* Authentication */
  const [token, setToken] = useState<string | null>();
  const [tokenExpirationDate, setTokenExpirationDate] = useState<Date | null>();
  const [userId, setUserId] = useState<string | null>();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const login = useCallback(
    (uid: string, token: string, expirationDate: Date): void => {
      loginLogic(
        uid,
        token,
        expirationDate,
        setToken,
        setUserId,
        setIsLoggedIn
      );
    },
    []
  );

  const logout = useCallback(() => {
    logoutLogic(setToken, setUserId, setTokenExpirationDate, setIsLoggedIn);
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  useEffect(() => {
    const storedData = localStorage.getItem("userData");
    if (storedData) {
      const storedDataP = JSON.parse(storedData);
      if (
        storedDataP &&
        storedDataP.token &&
        new Date(storedDataP.expiration) > new Date()
      ) {
        login(
          storedDataP.userId,
          storedDataP.token,
          new Date(storedDataP.expiration)
        );
      }
    }
  }, [login]);

  /* Admin Authentication */
  const [isLoggedInAdmin, setIsLoggedInAdmin] = useState<boolean>(false);
  const [accessLevel, setAccessLevel] = useState<AccessLevel>();

  /* Basket */
  const [basket, setBasket] = useState<BasketContextType["product"]>([]);

  useEffect(() => {
    const basket_storage = localStorage.getItem("basket");
    if (basket_storage) {
      setBasket(JSON.parse(basket_storage));
    }
  }, []);

  const addToBasket: BasketContextType["addToBasket"] = useCallback(
    (item) => {
      addToBasketStorageAndContext(item, basket, setBasket);
    },
    [basket]
  );

  const removeFromBasket: BasketContextType["removeFromBasket"] = useCallback(
    (id) => {
      removeFromBasketStorageAndContext(id, basket, setBasket);
    },
    [basket]
  );

  const getTotalPrice: BasketContextType["getTotalPrice"] = useCallback(() => {
    return getTotalPriceBasket(basket);
  }, [basket]);

  const isInBasket: BasketContextType["isInBasket"] = useCallback(
    (id) => {
      return isProductInBasket(id, basket);
    },
    [basket]
  );

  const decrementProduct: BasketContextType["decrementProduct"] = useCallback(
    (id) => {
      decrementProductStorage(id, basket, setBasket);
    },
    [basket]
  );

  /* Wishlist */
  const [wishlist, setWishlist] = useState<WishlistContextType["product"]>([]);

  useEffect(() => {
    const wishlist_storage = localStorage.getItem("wishlist");
    if (wishlist_storage) {
      setWishlist(JSON.parse(wishlist_storage));
    }
  }, []);

  const addToWishlist: WishlistContextType["addToWishlist"] = useCallback(
    (item) => {
      addToWishlistStorageAndContext(item, wishlist, setWishlist);
    },
    [wishlist]
  );

  const removeFromWishlist = useCallback(
    (id: string): void => {
      removeFromWishlistStorageAndContext(id, wishlist, setWishlist);
    },
    [wishlist]
  );

  const isInWishlist: WishlistContextType["isInWishlist"] = useCallback(
    (id) => {
      return isProductInWishlist(id, wishlist);
    },
    [wishlist]
  );

  const mainRef = useRef<HTMLDivElement>(null);

  const [chosenMode, setChosenMode] = useState<boolean>();

  useEffect(() => {
    if (chosenMode === false) {
      document.documentElement.style.setProperty(
        "--scrollBarTrackColor",
        "rgb(255,174,23)"
      );
      document.documentElement.style.setProperty(
        "--scrollBarThumbColor",
        "rgb(100,200,200)"
      );
    } else {
      document.documentElement.style.setProperty(
        "--scrollBarTrackColor",
        "rgb(200,200,200)"
      );
      document.documentElement.style.setProperty(
        "--scrollBarThumbColor",
        "rgb(100,200,200)"
      );
    }
  }, [chosenMode]);

  useEffect(() => {
    if (window.location.pathname !== "/") {
      setClosedSubscribe(true);
    }
  }, []);
  useEffect(() => {
    const subscribe = localStorage.getItem("subscribe");
    if (subscribe && subscribe === "false") {
      setClosedSubscribe(true);
    } else {
      setClosedSubscribe(false);
    }
  }, []);

  const [disableClosing, setDisableClosing] = useState<boolean>(false);
  const [chosenAction, setChosenAction] = useState<boolean[]>([true, false]);

  const [clickedMenu, setClickedMenu] = useState<boolean>(false);

  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.history.scrollRestoration = "manual";
  }, []);

  /* Menu */
  const [clickedBasket, setClickedBasket] = useState<boolean>(false);
  const [clickedWishlist, setClickedWishlist] = useState<boolean>(false);
  const [clickedUser, setClickedUser] = useState<boolean>(false);
  const [clickedLanguage, setClickedLanguage] = useState<boolean>(false);
  const [clickedSearch, setClickedSearch] = useState<boolean>(false);

  const [searchValue, setSearchValue] = useState<string>("");

  const handleSearch = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	},
    [searchValue]
  );

  const handleOpening = useCallback(
    (type: "basket" | "user" | "wishlist" | "language" | "search"): void => {
      switch (type) {
        case "basket":
          if (clickedBasket) {
            setClickedBasket(!clickedBasket);
          } else {
            setClickedLanguage(false);
            setClickedUser(false);
            setClickedWishlist(false);
            setClickedSearch(false);
            if (
              clickedUser ||
              clickedLanguage ||
              clickedWishlist ||
              clickedSearch
            ) {
              setTimeout(() => {
                setClickedBasket(!clickedBasket);
              }, 250);
            } else {
              setClickedBasket(!clickedBasket);
            }
          }
          break;
        case "wishlist":
          if (clickedWishlist) {
            setClickedWishlist(!clickedWishlist);
          } else {
            setClickedLanguage(false);
            setClickedUser(false);
            setClickedBasket(false);
            setClickedSearch(false);
            if (
              clickedUser ||
              clickedLanguage ||
              clickedBasket ||
              clickedSearch
            ) {
              setTimeout(() => {
                setClickedWishlist(!clickedWishlist);
              }, 250);
            } else {
              setClickedWishlist(!clickedWishlist);
            }
          }
          break;
        case "user":
          if (clickedUser) {
            setClickedUser(!clickedUser);
          } else {
            setClickedLanguage(false);
            setClickedWishlist(false);
            setClickedBasket(false);
            setClickedSearch(false);
            if (
              clickedWishlist ||
              clickedLanguage ||
              clickedBasket ||
              clickedSearch
            ) {
              setTimeout(() => {
                setClickedUser(!clickedUser);
              }, 250);
            } else {
              setClickedUser(!clickedUser);
            }
          }
          break;
        case "language":
          if (clickedLanguage) {
            setClickedLanguage(!clickedLanguage);
          } else {
            setClickedUser(false);
            setClickedWishlist(false);
            setClickedBasket(false);
            setClickedSearch(false);
            if (
              clickedWishlist ||
              clickedUser ||
              clickedBasket ||
              clickedSearch
            ) {
              setTimeout(() => {
                setClickedLanguage(!clickedLanguage);
              }, 250);
            } else {
              setClickedLanguage(!clickedLanguage);
            }
          }
          break;
        case "search":
          if (clickedSearch) {
            setClickedSearch(!clickedSearch);
          } else {
            setClickedUser(false);
            setClickedWishlist(false);
            setClickedBasket(false);
            setClickedLanguage(false);
            if (
              clickedUser ||
              clickedWishlist ||
              clickedBasket ||
              clickedLanguage
            ) {
              setTimeout(() => {
                setClickedSearch(!clickedSearch);
              }, 250);
            } else {
              setClickedSearch(!clickedSearch);
            }
          }
      }
    },
    [
      clickedBasket,
      clickedLanguage,
      clickedUser,
      clickedWishlist,
      clickedSearch,
    ]
  );

  const [isMobile, setIsMobile] = useState<boolean>(false);

  const [isLandscape, setIsLandScape] = useState<boolean>(false);

  useEffect(() => {
    setIsMobile(mobileCheck());
  }, []);

  useEffect(() => {
    if (isMobile) {
      const landscape = window.matchMedia("(orientation:landscape)");
      const do_portrait_logic = (e?: MediaQueryListEvent) => {
        if (e) {
          setIsLandScape(e.matches);
        } else {
          setIsLandScape(landscape.matches);
        }
      };
      do_portrait_logic();
      landscape.addEventListener("change", (e) => do_portrait_logic(e));
      return () => landscape.removeEventListener("change", () => {});
    }
  }, [isMobile]);

  const [display, setDisplay] = useState<string>("");

  return (
    <div
      className="main"
      style={{
        backgroundColor:
          chosenMode === undefined || chosenMode ? "white" : "black",
      }}
      ref={mainRef}
    >
      {!isLandscape ? (
        <WishlistContext.Provider
          value={{
            product: wishlist,
            addToWishlist: addToWishlist,
            removeFromWishlist: removeFromWishlist,
            isInWishlist: isInWishlist,
          }}
        >
          <BasketContext.Provider
            value={{
              product: basket,
              addToBasket: addToBasket,
              removeFromBasket: removeFromBasket,
              getTotalPrice: getTotalPrice,
              isInBasket: isInBasket,
              decrementProduct: decrementProduct,
            }}
          >
            <AuthContext.Provider
              value={{
                isLoggedIn: isLoggedIn,
                token: token,
                userId: userId,
                login: login,
                logout: logout,
              }}
            >
              <MobileContext.Provider value={{ isMobile: isMobile }}>
                <Router>
                  <Menu
                    clickedMenu={clickedMenu}
                    chosenMode={chosenMode}
                    setClickedLogin={setClickedLogin}
                    setChosenAction={setChosenAction}
                    setClickedBasket={setClickedBasket}
                    setClickedWishlist={setClickedWishlist}
                    setClickedUser={setClickedUser}
                    setClickedLanguage={setClickedLanguage}
                    clickedBasket={clickedBasket}
                    clickedWishlist={clickedWishlist}
                    clickedUser={clickedUser}
                    clickedLanguage={clickedLanguage}
                    clickedSearch={clickedSearch}
                    setClickedSearch={setClickedSearch}
                    handleOpening={handleOpening}
                    display={display}
                    headerRef={headerRef}
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                    handleSearch={handleSearch}
                  />
                  <Credential
                    chosenAction={chosenAction}
                    setChosenAction={setChosenAction}
                    clickedLogin={clickedLogin}
                    setClickedLogin={setClickedLogin}
                    disableClosing={disableClosing}
                  />
                  {!closedSubscribe ? (
                    <Subscribe setClosedSubscribe={setClosedSubscribe} />
                  ) : (
                    ""
                  )}
                  <ScrollIntoViewComponent mainRef={mainRef} />
                  <Routes>
                    <Route
                      path="/*"
                      element={
                        <>
                          <HeaderBody
                            headerRef={headerRef}
                            setClickedMenu={setClickedMenu}
                            clickedMenu={clickedMenu}
                            setClickedLogin={setClickedLogin}
                            chosenMode={chosenMode}
                            setChosenMode={setChosenMode}
                          />
                          <Body
                            setClickedLogin={setClickedLogin}
                            chosenMode={chosenMode}
                            setClickedMenu={setClickedMenu}
                            clickedMenu={clickedMenu}
                            setClickedBasket={setClickedBasket}
                            setClickedWishlist={setClickedWishlist}
                            handleOpening={handleOpening}
                            clickedWishlist={clickedWishlist}
                            clickedBasket={clickedBasket}
                          />
                          <FooterBody chosenMode={chosenMode} />
                        </>
                      }
                    />
                    <Route
                      path="/light"
                      element={
                        <>
                          <HeaderBody
                            headerRef={headerRef}
                            setClickedMenu={setClickedMenu}
                            clickedMenu={clickedMenu}
                            setClickedLogin={setClickedLogin}
                            chosenMode={chosenMode}
                            setChosenMode={setChosenMode}
                            custom={true}
                          />
                          <Body
                            setClickedLogin={setClickedLogin}
                            chosenMode={chosenMode}
                            setClickedMenu={setClickedMenu}
                            clickedMenu={clickedMenu}
                            setClickedBasket={setClickedBasket}
                            setClickedWishlist={setClickedWishlist}
                            handleOpening={handleOpening}
                            clickedWishlist={clickedWishlist}
                            clickedBasket={clickedBasket}
                            custom={true}
                          />
                          <FooterBody chosenMode={chosenMode} />
                        </>
                      }
                    />
                    <Route
                      path="/dark"
                      element={
                        <>
                          <HeaderBody
                            headerRef={headerRef}
                            setClickedMenu={setClickedMenu}
                            clickedMenu={clickedMenu}
                            setClickedLogin={setClickedLogin}
                            chosenMode={chosenMode}
                            setChosenMode={setChosenMode}
                            custom={true}
                          />
                          <Body
                            setClickedLogin={setClickedLogin}
                            chosenMode={chosenMode}
                            setClickedMenu={setClickedMenu}
                            clickedMenu={clickedMenu}
                            setClickedBasket={setClickedBasket}
                            setClickedWishlist={setClickedWishlist}
                            handleOpening={handleOpening}
                            clickedWishlist={clickedWishlist}
                            clickedBasket={clickedBasket}
                            custom={true}
                          />
                          <FooterBody chosenMode={chosenMode} />
                        </>
                      }
                    />
                    <Route
                      path="/accessories"
                      element={
                        <>
                          <HeaderBody
                            headerRef={headerRef}
                            setClickedMenu={setClickedMenu}
                            clickedMenu={clickedMenu}
                            setClickedLogin={setClickedLogin}
                            chosenMode={chosenMode}
                            setChosenMode={setChosenMode}
                            accessories={true}
                          />
                          <Body
                            setClickedLogin={setClickedLogin}
                            chosenMode={chosenMode}
                            setClickedMenu={setClickedMenu}
                            clickedMenu={clickedMenu}
                            setClickedBasket={setClickedBasket}
                            setClickedWishlist={setClickedWishlist}
                            handleOpening={handleOpening}
                            clickedWishlist={clickedWishlist}
                            clickedBasket={clickedBasket}
                            accessories={true}
                          />
                          <FooterBody chosenMode={chosenMode} />
                        </>
                      }
                    />

                    <Route
                      path="/checkout"
                      element={
                        <Checkout
                          setAmount={setAmount}
                          checkout={true}
                          setClickedLogin={setClickedLogin}
                          setDisableClosing={setDisableClosing}
                          setDisplay={setDisplay}
                          setChosenAction={setChosenAction}
						  setBasket={setBasket}
                        />
                      }
                    />
                    <Route
                      path="/payment"
                      element={
                        <Checkout
                          amount={amount}
                          payment={true}
                          setClickedLogin={setClickedLogin}
                          setDisableClosing={setDisableClosing}
                          setDisplay={setDisplay}
                          setChosenAction={setChosenAction}
                        />
                      }
                    />
                    <Route
                      path="/basket"
                      element={
                        <>
                          <HeaderBody
                            headerRef={headerRef}
                            setClickedMenu={setClickedMenu}
                            clickedMenu={clickedMenu}
                            setClickedLogin={setClickedLogin}
                            chosenMode={chosenMode}
                            setChosenMode={setChosenMode}
                          />{" "}
                          <Basket />
                          <FooterBody />
                        </>
                      }
                    />
                    <Route
                      path="/payment/success"
                      element={
                        <>
                          <Checkout
                            amount={amount}
                            paid={true}
                            setClickedLogin={setClickedLogin}
                            setDisableClosing={setDisableClosing}
                            setDisplay={setDisplay}
                            setChosenAction={setChosenAction}
                          />
                        </>
                      }
                    />
                    <Route
                      path="/payment/failure"
                      element={
                        <>
                          <Checkout
                            amount={amount}
                            paid={true}
                            setClickedLogin={setClickedLogin}
                            setDisableClosing={setDisableClosing}
                            setDisplay={setDisplay}
                            setChosenAction={setChosenAction}
                          />
                        </>
                      }
                    />
                    <Route
                      path="/orders"
                      element={
                        <>
                          <HeaderBody
                            headerRef={headerRef}
                            setClickedMenu={setClickedMenu}
                            clickedMenu={clickedMenu}
                            chosenMode={chosenMode}
                            setChosenMode={setChosenMode}
                            setClickedLogin={setClickedLogin}
                          />
                          <UserInformation
                            type={0}
                            setClickedLogin={setClickedLogin}
                            setDisableClosing={setDisableClosing}
                          />
                          <FooterBody />
                        </>
                      }
                    />
                    <Route
                      path="/profile"
                      element={
                        <>
                          <HeaderBody
                            headerRef={headerRef}
                            setClickedMenu={setClickedMenu}
                            chosenMode={chosenMode}
                            clickedMenu={clickedMenu}
                            setChosenMode={setChosenMode}
                            setClickedLogin={setClickedLogin}
                          />
                          <UserInformation
                            type={1}
                            setClickedLogin={setClickedLogin}
                            setDisableClosing={setDisableClosing}
                          />
                          <FooterBody />
                        </>
                      }
                    />
                    <Route
                      path="/help"
                      element={
                        <>
                          <HeaderBody
                            headerRef={headerRef}
                            setClickedMenu={setClickedMenu}
                            chosenMode={chosenMode}
                            clickedMenu={clickedMenu}
                            setChosenMode={setChosenMode}
                            setClickedLogin={setClickedLogin}
                          />
                          <UserInformation
                            type={2}
                            setClickedLogin={setClickedLogin}
                            setDisableClosing={setDisableClosing}
                          />{" "}
                          <FooterBody />
                        </>
                      }
                    />
                    <Route
                      path="/admin"
                      element={
                        <AdminContext.Provider
                          value={{
                            isLoggedIn: isLoggedInAdmin,
                            accessLevel: accessLevel,
                          }}
                        >
                          <Admin />
                        </AdminContext.Provider>
                      }
                    />
                    <Route
                      path="/customer-care/:type"
                      element={
                        <>
                          <HeaderBody
                            headerRef={headerRef}
                            setClickedLogin={setClickedLogin}
                            chosenMode={chosenMode}
                            setChosenMode={setChosenMode}
                            setClickedMenu={setClickedMenu}
                            clickedMenu={clickedMenu}
                          />
                          <CustomerCare />
                          <FooterBody />
                        </>
                      }
                    />
                  </Routes>
                </Router>
              </MobileContext.Provider>
            </AuthContext.Provider>
          </BasketContext.Provider>
        </WishlistContext.Provider>
      ) : (
        <LandscapeWarn />
      )}
    </div>
  );
}

export default App;
