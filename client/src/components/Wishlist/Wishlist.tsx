import  {useState } from "react";
import LeftSelection from "../../Comp-Single/LeftSelection";
import WishlistBody from "./WishlistBody";
import "../../styles/components/Wishlist/Wishlist.css";
import { useRef } from "react";

function Wishlist() {
  const wishlistRef = useRef<HTMLDivElement>(null);

  const [selected, setSelected] = useState<string[]>(['Women']);


  return (
    <div className="wishlist" ref={wishlistRef}>
      <LeftSelection setSelected={setSelected} selected={selected}/>
      <WishlistBody selected={selected} setSelected={setSelected}/>
    </div>
  );
}

export default Wishlist;
