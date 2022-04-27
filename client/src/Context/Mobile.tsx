import { createContext } from "react";

export type MobileContextType = {
    isMobile: boolean;
}

export const MobileContext = createContext({
    isMobile: false
})
