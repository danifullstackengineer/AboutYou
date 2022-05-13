import { createContext } from "react";

export type AdminContextType = {
  isLoggedIn: boolean;
  accessLevel: AccessLevel | undefined;
};

export enum AccessLevel {
  READ_ONLY,
  READ_UPDATE_ONLY,
  READ_UPDATE_DELETE_ONLY
}

export const AdminContext = createContext<AdminContextType>({
  isLoggedIn: false,
  accessLevel: undefined,
});
