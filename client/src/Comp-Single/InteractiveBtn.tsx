import React, { useEffect, useRef } from "react";
import "../styles/Comp-Single/InteractiveBtn.css";
import LoadingDots from "./LoadingDots";
import FacebookLogin from '@greatsumini/react-facebook-login';

function InteractiveBtn({
  text,
  width,
  height,
  icon,
  bgColor,
  color,
  border,
  setClickedLogin,
  margin,
  hoverBgColor,
  isLoading,
  onClick,
  type,
  facebook
}: {
  text: string;
  width: number;
  height: number;
  icon?: JSX.Element;
  bgColor?: string;
  color?: string;
  border?: string;
  setClickedLogin?: React.Dispatch<React.SetStateAction<boolean>>;
    margin?: number[];
    hoverBgColor?: string;
    isLoading?: boolean;
    onClick?: React.MouseEventHandler<HTMLDivElement> | undefined;
    type: "button" | "submit" | "reset" | undefined;
    facebook?:boolean
  }) {
  
  useEffect(() => {
    if (setClickedLogin) {
      setClickedLogin(true)
    }
  }, [setClickedLogin])
  
  const interactiveRef = useRef<HTMLButtonElement>(null);

  const handleMouseOver = ():void => {
    if (interactiveRef.current && hoverBgColor) {
      interactiveRef.current.style.backgroundColor = hoverBgColor;
    }
  }
  const handleMouseLeave = (): void => {
    if (interactiveRef.current && bgColor && hoverBgColor) {
      interactiveRef.current.style.backgroundColor = bgColor;
    }
  }

  return (
    <div
      style={{
        marginTop: margin ? margin[0] : undefined,
        marginRight: margin ? margin[1] : undefined,
        marginBottom: margin ? margin[2] : undefined,
        marginLeft: margin ? margin[3] : undefined,
      }}
      className="interactiveBtn"
      onClick={onClick}
    >
      {!facebook ? 
      <button
        type={type}
        className="interactiveBtn__btn"
        style={{
          width: width,
          height: height,
          backgroundColor: bgColor ? bgColor : "black",
          color: color ? color : "white",
          border: border ? border : "1px solid transparent",
        }}
        onMouseOver={hoverBgColor ? handleMouseOver : undefined}
        onMouseLeave={hoverBgColor ? handleMouseLeave : undefined}
        ref={interactiveRef}
      >
        <span className="interactiveBtn__btn-icon">{icon ? icon : ""}</span>
        {isLoading ? <LoadingDots/> : text}
      </button>
      : 
      <FacebookLogin
  appId="1088597931155576"
  style={{
    width: width,
    height: height,
    backgroundColor: bgColor ? bgColor : "black",
    color: color ? color : "white",
    border: border ? border : "1px solid transparent",
  }}
  initParams={{
    cookie:false,
    localStorage: false
  }}
  
  onSuccess={(response) => {
    console.log('Login Success!', response);
  }}
  onFail={(error) => {
    console.log('Login Failed!', error);
  }}
  onProfileSuccess={(response) => {
    console.log('Get Profile Success!', response);
  }}
/>
      }
    </div>
  );
}

export default InteractiveBtn;
