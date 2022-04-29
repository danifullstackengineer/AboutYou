import React, { useEffect, useState } from "react";

const useMousePosition = ():{x: number,y:number, toggleRemove: boolean, setToggleRemove: React.Dispatch<React.SetStateAction<boolean>>} => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

    const [toggleRemove, setToggleRemove] = useState<boolean>(false);

  useEffect(() => {
    const setFromEvent = (e:any) => setPosition({ x: e.clientX, y: e.clientY });
    if(!toggleRemove){
    window.addEventListener("mousemove", setFromEvent);
    }else{
        window.removeEventListener("mousemove", () => {})
    }
    return () => {
      window.removeEventListener("mousemove", setFromEvent);
    };
  }, [toggleRemove]);

  return {x: position.x, y: position.y, toggleRemove: toggleRemove, setToggleRemove: setToggleRemove};
};

export default useMousePosition;