import React, { useEffect, useRef, useState } from "react";
import { useWindowDimensions } from "../Hooks/Viewport";
import "../styles/Comp-Single/HeaderSticky.css";
import {useLocation} from 'react-router-dom';

function HeaderSticky({
  headerRef,
}: {
  headerRef: React.RefObject<HTMLDivElement>;
}) {

	const stickyRef = useRef<HTMLDivElement>(null);
  const { width: wWidth, height: wHeight } = useWindowDimensions();
  const location = useLocation();

  useEffect(() => {
    if (headerRef.current && stickyRef.current) {
	  stickyRef.current.style.height = headerRef.current.offsetHeight + "px";
    }
  }, [wWidth, wHeight, headerRef, location, headerRef.current?.offsetHeight, stickyRef]);

  return (
    <div
      className={`headerSticky`}
	  ref={stickyRef}
    ></div>
  );
}

export default React.memo(HeaderSticky);
