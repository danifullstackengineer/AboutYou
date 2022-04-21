import { createContext } from "react";

export type AuthContextType = {
  isLoggedIn: boolean;
  token: string | null | undefined;
  userId: string | null | undefined;
  login: ((uid: string, token: string, expirationDate: Date) => void);
  logout: () => void;
};
export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  token: "",
  userId: "",
  login: () => {},
  logout: () => {},
});