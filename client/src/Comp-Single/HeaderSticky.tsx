import React, { useEffect, useState } from "react";

function HeaderSticky({
  hideMode,
  setHeight,
}: {
  hideMode: boolean;
  setHeight: React.Dispatch<React.SetStateAction<number | undefined>>;
  }) {
  
  useEffect(() => {
    if (hideMode) {
      setHeight(150);
    } else {
      setHeight(250);
    }
  }, [hideMode])
  
  return (
    <div
      style={{
        zIndex: 1,
        height: hideMode ? "150px" : "250px",
        width: "100%",
      }}
    ></div>
  );
}

export default React.memo(HeaderSticky);
