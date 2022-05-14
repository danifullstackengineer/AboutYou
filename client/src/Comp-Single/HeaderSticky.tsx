import React, { useEffect, useState } from "react";
import { useWindowDimensions } from "../Hooks/Viewport";
import "../styles/Comp-Single/HeaderSticky.css";
import {useLocation} from 'react-router-dom';

function HeaderSticky({
  headerRef,
}: {
  headerRef: React.RefObject<HTMLDivElement>;
}) {

  const [height, setHeight] = useState<number>(0);
  const { width: wWidth, height: wHeight } = useWindowDimensions();
  const location = useLocation();

  useEffect(() => {
    if (headerRef.current) {
      setHeight(headerRef.current.offsetHeight);
    }
  }, [wWidth, wHeight, headerRef, location]);

  return (
    <div
      className={`headerSticky`}
      style={{ height }}
    ></div>
  );
}

export default React.memo(HeaderSticky);
