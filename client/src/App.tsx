import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/index.css";
import Body from "./components/Body";
import Credential from "./components/Credentials/Credential";
import HeaderBody from "./components/Header/HeaderBody";
import FooterBody from "./components/Footer/FooterBody";
import Wishlist from "./components/Wishlist/Wishlist";
import Checkout from "./components/Checkout/Checkout";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { authJWT } from "./API/Credential";
import Basket from "./components/Basket/Basket";
import UserInformation from "./components/UserInformation/UserInformation";
import Menu from "./Comp-Single/Menu";
import HeaderSticky from "./Comp-Single/HeaderSticky";
import ProductBody from "./components/Product/ProductBody";
import Subscribe from "./Comp-Single/Subscribe";
import ScrollIntoViewComponent from "./Comp-Single/ScrollIntoViewComponent";
import { AuthContext } from "./Context/Auth";
import { BasketContext, BasketContextType } from "./Context/Basket";
import { WishlistContext, WishlistContextType } from "./Context/Wishlist";

var logoutTimer: NodeJS.Timeout;

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
      setToken(token);
      setUserId(uid);
      const tokenExpirationDate = expirationDate
        ? new Date(expirationDate)
        : new Date(new Date().getTime() + 1000 * 60 * 60);
      localStorage.setItem(
        "userData",
        JSON.stringify({
          userId: uid,
          token: token,
          expiration: tokenExpirationDate.toISOString(),
        })
      );
      setIsLoggedIn(true);
    },
    []
  );

  const logout = useCallback(async () => {
    setToken(null);
    setTokenExpirationDate(null);
    setUserId(null);
    setIsLoggedIn(false);
    localStorage.removeItem("userData");
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

  /* Basket */
  const [basket, setBasket] = useState<BasketContextType["product"]>([]);

  const addToBasket: BasketContextType["addToBasket"] = useCallback(
    (item) => {
      const duplicate = (): boolean | undefined => {
        for (let i = 0; i < basket.length; i++) {
          if (basket[i].id == item.id) return true;
          else continue;
        }
      };
      if (duplicate()) {
        setBasket((basket) => [
          ...basket.map((product) => {
            if (product.id !== item.id) return product;
            else {
              product.quantity++;
              return product;
            }
          }),
        ]);
      } else {
        setBasket((basket) => [...basket, { ...item, quantity: 1 }]);
      }
    },
    [basket]
  );

  const removeFromBasket: BasketContextType["removeFromBasket"] = useCallback(
    (id) => {
      setBasket([...basket.filter((product) => product.id !== id)]);
    },
    [basket]
  );

  const getTotalPrice: BasketContextType["getTotalPrice"] = useCallback(() => {
    var total = 0;
    basket.forEach((product) => (total += product.quantity * product.price));
    return total;
  }, [basket]);

  const isInBasket: BasketContextType["isInBasket"] = useCallback(
    (id) => {
      for (let i = 0; i < basket.length; i++) {
        if (basket[i].id === id) {
          return true;
        }
      }
      return false;
    },
    [basket]
  );

  /* Wishlist */
  const [wishlist, setWishlist] = useState<WishlistContextType["product"]>([]);

  const addToWishlist: WishlistContextType["addToWishlist"] = useCallback(
    (item) => {
      const duplicate = (): boolean | undefined => {
        for (let i = 0; i < wishlist.length; i++) {
          if (wishlist[i].id == item.id) return true;
          else continue;
        }
      };
      if (duplicate() !== false) {
        setWishlist([...wishlist, { ...item, quantity: 1 }]);
      }
    },
    [wishlist]
  );

  const removeFromWishlist = useCallback(
    (id: string): void => {
      setWishlist([...wishlist.filter((product) => product.id !== id)]);
    },
    [wishlist]
  );

  const isInWishlist: WishlistContextType["isInWishlist"] = useCallback(
    (id) => {
      for (let i = 0; i < wishlist.length; i++) {
        if (wishlist[i].id === id) {
          return true;
        }
      }
      return false;
    },
    [wishlist]
  );

  const promise = loadStripe(
    "pk_test_51KXAUxDelfvIQhggA3tpu3fek1HqAwqYU7SAxvQJtBhcD2ULDWuzvd0KouPGX7HrgJ8xKZbqk49L1HTL5Vwh01nj00LQLjwQQf"
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

  const [currentOption, setCurrentOption] = useState<boolean[]>([
    true,
    false,
    false,
  ]);

  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollIntoView();
    }
  }, [currentOption, mainRef]);

  const [height, setHeight] = useState<number>();

  useEffect(() => {
    window.history.scrollRestoration = "manual";
  }, []);

  return (
    <div
      className="main"
      style={{
        backgroundColor:
          chosenMode === undefined || chosenMode ? "white" : "black",
      }}
      ref={mainRef}
    >
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
          }}
        >
          <AuthContext.Provider
            value={{
              isLoggedIn: !!token,
              token: token,
              userId: userId,
              login: login,
              logout: logout,
            }}
          >
            <Router>
              <Menu
                clickedMenu={clickedMenu}
                chosenMode={chosenMode}
                setClickedLogin={setClickedLogin}
                setChosenAction={setChosenAction}
                height={height}
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
                      <HeaderSticky hideMode={false} setHeight={setHeight} />
                      <HeaderBody
                        headerRef={headerRef}
                        currentOption={currentOption}
                        setCurrentOption={setCurrentOption}
                        setClickedMenu={setClickedMenu}
                        clickedMenu={clickedMenu}
                        setClickedLogin={setClickedLogin}
                        chosenMode={chosenMode}
                        setChosenMode={setChosenMode}
                      />
                      <Body
                        setHeight={setHeight}
                        setClickedLogin={setClickedLogin}
                        chosenMode={chosenMode}
                        currentOption={currentOption}
                      />
                      <FooterBody chosenMode={chosenMode} />
                    </>
                  }
                />
                <Route
                  path="/wishlist"
                  element={
                    <>
                      <HeaderSticky hideMode={true} setHeight={setHeight} />
                      <HeaderBody
                        headerRef={headerRef}
                        currentOption={currentOption}
                        setCurrentOption={setCurrentOption}
                        setClickedMenu={setClickedMenu}
                        clickedMenu={clickedMenu}
                        setClickedLogin={setClickedLogin}
                        chosenMode={chosenMode}
                        setChosenMode={setChosenMode}
                        hideMode={true}
                      />
                      <Wishlist />
                      <FooterBody />
                    </>
                  }
                />
                <Route
                  path="/checkout"
                  element={
                    <Elements stripe={promise}>
                      {" "}
                      <Checkout
                        setAmount={setAmount}
                        checkout={true}
                        setClickedLogin={setClickedLogin}
                        setDisableClosing={setDisableClosing}
                      />
                    </Elements>
                  }
                />
                <Route
                  path="/payment"
                  element={
                    <Elements stripe={promise}>
                      {" "}
                      <Checkout
                        amount={amount}
                        payment={true}
                        setClickedLogin={setClickedLogin}
                        setDisableClosing={setDisableClosing}
                      />
                    </Elements>
                  }
                />
                <Route
                  path="/basket"
                  element={
                    <>
                      <HeaderSticky hideMode={true} setHeight={setHeight} />
                      <HeaderBody
                        headerRef={headerRef}
                        currentOption={currentOption}
                        setCurrentOption={setCurrentOption}
                        setClickedMenu={setClickedMenu}
                        clickedMenu={clickedMenu}
                        setClickedLogin={setClickedLogin}
                        chosenMode={chosenMode}
                        setChosenMode={setChosenMode}
                        hideMode={true}
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
                      <Elements stripe={promise}>
                        <Checkout
                          amount={amount}
                          paid={true}
                          setClickedLogin={setClickedLogin}
                          setDisableClosing={setDisableClosing}
                        />
                      </Elements>
                    </>
                  }
                />
                <Route
                  path="/payment/failure"
                  element={
                    <>
                      <Elements stripe={promise}>
                        <Checkout
                          amount={amount}
                          paid={true}
                          setClickedLogin={setClickedLogin}
                          setDisableClosing={setDisableClosing}
                        />
                      </Elements>
                    </>
                  }
                />
                <Route
                  path="/orders"
                  element={
                    <>
                      <HeaderSticky hideMode={true} setHeight={setHeight} />
                      <HeaderBody
                        headerRef={headerRef}
                        currentOption={currentOption}
                        setCurrentOption={setCurrentOption}
                        setClickedMenu={setClickedMenu}
                        clickedMenu={clickedMenu}
                        chosenMode={chosenMode}
                        setChosenMode={setChosenMode}
                        setClickedLogin={setClickedLogin}
                        hideMode={true}
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
                      <HeaderSticky hideMode={true} setHeight={setHeight} />
                      <HeaderBody
                        headerRef={headerRef}
                        currentOption={currentOption}
                        setCurrentOption={setCurrentOption}
                        setClickedMenu={setClickedMenu}
                        chosenMode={chosenMode}
                        clickedMenu={clickedMenu}
                        setChosenMode={setChosenMode}
                        setClickedLogin={setClickedLogin}
                        hideMode={true}
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
                      <HeaderSticky hideMode={true} setHeight={setHeight} />
                      <HeaderBody
                        headerRef={headerRef}
                        currentOption={currentOption}
                        setCurrentOption={setCurrentOption}
                        setClickedMenu={setClickedMenu}
                        chosenMode={chosenMode}
                        clickedMenu={clickedMenu}
                        setChosenMode={setChosenMode}
                        setClickedLogin={setClickedLogin}
                        hideMode={true}
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
                  path="/product/:id"
                  element={
                    <>
                      <HeaderSticky hideMode={true} setHeight={setHeight} />
                      <HeaderBody
                        hideMode={true}
                        headerRef={headerRef}
                        setClickedLogin={setClickedLogin}
                        chosenMode={chosenMode}
                        setChosenMode={setChosenMode}
                        setClickedMenu={setClickedMenu}
                        currentOption={currentOption}
                        setCurrentOption={setCurrentOption}
                        clickedMenu={clickedMenu}
                      />
                      <ProductBody />
                      <FooterBody />
                    </>
                  }
                />
              </Routes>
            </Router>
          </AuthContext.Provider>
        </BasketContext.Provider>
      </WishlistContext.Provider>
    </div>
  );
}

export default App;
