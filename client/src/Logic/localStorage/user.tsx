import React, { useCallback } from "react";

const getIdStorage = (): string | undefined => {
  try {
    const userData = localStorage.getItem("userData");
    if (userData) {
      return JSON.parse(userData).userId;
    }
  } catch (err) {
    console.log(err);
  }
};

const loginLogic = (
  uid: string,
  token: string,
  expirationDate: Date,
  setToken: React.Dispatch<React.SetStateAction<string | null | undefined>>,
  setUserId: React.Dispatch<React.SetStateAction<string | null | undefined>>,
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
): void => {
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
};

const logoutLogic = (
  setToken: React.Dispatch<React.SetStateAction<string | null | undefined>>,
  setUserId: React.Dispatch<React.SetStateAction<string | null | undefined>>,
  setTokenExpirationDate: React.Dispatch<
    React.SetStateAction<Date | null | undefined>
  >,
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setToken(null);
  setTokenExpirationDate(null);
  setUserId(null);
  setIsLoggedIn(false);
  localStorage.removeItem("userData");
};


export { getIdStorage, loginLogic,logoutLogic };
