import { useState, useEffect } from "react";

const getWindowDimension = (): { width: number; height: number } => {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
};
export const useWindowDimensions = (): { width: number; height: number } => {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimension()
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions(getWindowDimension());
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
};
