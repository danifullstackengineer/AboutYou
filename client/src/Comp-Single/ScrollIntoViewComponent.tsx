import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollIntoViewComponent = ({
  mainRef,
}: {
    mainRef: React.RefObject<HTMLDivElement>;
}) => {
  const location = useLocation();

  useEffect(() => {
      if (mainRef.current) {
          mainRef.current.scrollIntoView();
    }
  }, [location, mainRef]);

  return <div style={{ display: "none" }}></div>;
};
export default ScrollIntoViewComponent;
