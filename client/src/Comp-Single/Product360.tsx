import {useQuery } from "@apollo/client";
import React, { useEffect, useRef, useState } from "react";
import { getAccessoriesBasedOnParent } from "../Apollo/Accessory";
import "../styles/Comp-Single/Product360.css";
import { AccessoryType } from "../types/Accessory";
import { ProductType } from "../types/Product";
import useMousePosition from "../Hooks/MousePosition";
import useOutsideAlerter from "../Hooks/OutsideAlerter";
import { useWindowDimensions } from "../Hooks/Viewport";

function Product360({
  product
}: {
 product: ProductType
    }) {
    

      const {loading, error, data} = useQuery(getAccessoriesBasedOnParent, {
        variables: {
          parentId: product.id
        }
      })

      const [addedAccessory, setAddedAccessory] = useState<boolean[]>();
      const [selectedSize, setSelectedSize] = useState<boolean[]>(product.sizes.map(() => false));
      const [selectedColor, setSelectedColor] = useState<boolean[]>(product.colors.map(() => false));
      const [accIndex, setAccIndex] = useState<number>();

      const mainRef = useRef<HTMLDivElement>(null);

      //todo: handle error
    useEffect(()=>{

    }, [error])

    useEffect(()=>{
      if(data){
        var arrAcc:boolean[] =[]
        data.getAccessoriesBasedOnParent.map((accessory:AccessoryType, i:number)=>{
          arrAcc.push(false);
        })
        setAddedAccessory(arrAcc);
      }
    }, [data])

    const handleAddAccessory = (index:number) => {
      setAddedAccessory(prevState => prevState?.map((truth, i) =>{
        if(i=== index){
          if(truth){
            setAccIndex(undefined);
          }else{
            setAccIndex(i)
          }
          return !truth;
        }else{
          return false;
        }
      }));
      setAccIndex(index);
    }

    const handleAddSize = (index: number) => {
      setSelectedSize(prevState => prevState.map((color, i) => i === index ? !color : false));
    }
    const handleAddColor = (index: number) => {
      setSelectedColor(prevState => prevState.map((size, i) => i=== index ? !size : false));
    }

    const getTotalAfterAccessory = ():number => {
      if(addedAccessory && accIndex !== undefined && data){
        console.log("in here.")
        return (data.getAccessoriesBasedOnParent[accIndex].price + product.price).toFixed(2);
      }
      else return product.price;
    }

    const [total, setTotal] = useState<number>(0);

    useEffect(()=>{
      setTotal(getTotalAfterAccessory());
    }, [accIndex])


    const [file, setFile] = useState<any>();

    const handleFileChange = (e:React.ChangeEvent<HTMLInputElement>) => {
      const warn = "Please use a valid image file."
      if(!e.target.files || e.target.files.length === 0){
        alert(warn);
      }else{
        if(e.target.files.length > 1){
          alert("Please only upload one file.")
        }
        else{
          const regex = /image\/([a-zA-Z\d\-\.]{1,})/i
        if(!regex.test(e.target.files[0].type)){
          alert(warn);
        }else{
          setFile(e.target.files[0]);
        }
      }
      }
    }

    const [clicked, setClicked] = useState<boolean>(false);

    const [perc, setPerc] = useState<number>(0);

    const [activeIndex, setActiveIndex] = useState<number>(0);

    const [mouseX, setMouseX] = useState<number>();
    const {x, setToggleRemove, toggleRemove} = useMousePosition();

    useEffect(()=>{
      setToggleRemove(!clicked);
    }, [clicked])

    
    const [width, setWidth] = useState<number>();
    const [refX, setRefX] = useState<number>();

    useEffect(()=>{
      if(mainRef.current && refX && width){
        if(x - refX <= 0 || (x-refX) >= width){
          setMouseX(0);
        }else{
          setMouseX(x-refX);
        }
      }
    } ,[x, mainRef])

    const {width:widthScreen} = useWindowDimensions();

    useEffect(()=>{
      if(mainRef.current){
        const {x: refX, width} = mainRef.current.getBoundingClientRect();
        setWidth(width);
        setRefX(refX);
      }
    }, [mainRef, widthScreen])

    useEffect(()=>{
      if(mouseX && width){
        const idx = Math.ceil((((mouseX / width) * 100 | 0) + 1)/2);
        if(activeIndex !== idx){
        if(idx < 0){
          setActiveIndex(0);
        }else if(idx > 50){
          setActiveIndex(50);
        }
        else{
          setActiveIndex(idx);
        }
      }
      }
    }, [mouseX, width])


  return (
    <div className="product360" ref={mainRef}>
      <div className={`product360__left ${clicked ? "product360__left-360" : "product360__left-360-inactive"}`} onClick={()=>setClicked(!clicked)}>
      {!clicked ? <><img src={product.backgroundImg + "1.jpg"} alt={""} loading={"eager"}/>
      <img src={product.foregroundImg + "10.jpg"} alt={""} loading={"eager"}/></> : 
   Array.from(Array(51).keys()).map((i) => {
    return (
      <img src={product.backgroundImg + `${i+1}.jpg`} alt={""} key={i + 1} className={activeIndex === i ? "product__left-360-img-active" : "product__left-360-img-inactive"} loading={activeIndex === i ? "eager" : "lazy"}/>
    )
   })}
      {clicked ? <div className="product360__left-spinner">
        <span>{perc}</span>
      </div> : "" }
      </div>
      {!clicked ? <div className="product360__right">
        <div className="product360__right-top">
          <div className="product360__right-sizes">
            <span>Available Sizes</span>
            <ul>
            {product.sizes.map((size, i) => {
              return (
                <li key={i} onClick={() => handleAddSize(i)} className={selectedSize[i] ? "product360__right-sizes-selected" : ""}>{size}</li>
              )
            })}
            </ul>
          </div>
          <div className="product360__right-colors">
            <span>Available Colors</span>
            <ul>
            {product.colors.map((color, i) => {
              return (
                <li key={i} className={selectedColor[i] ? "product360__right-colors-selected" : ""} onClick={() => handleAddColor(i)}>{color}</li>
              )
            })}
            </ul>
          </div>
          <div className="product360__right-custom">
            {data ? 
            <>
            <span>Add extra Accessories</span>
              <ul>
                {data.getAccessoriesBasedOnParent.map((accessory:AccessoryType, i:number)=> {
                  return (
                    <li key={i} onClick={() => handleAddAccessory(i)} className={addedAccessory ? addedAccessory[i] ? "product360__right-custom-active" : "" : ""}>
                      <img src={accessory.image} alt={""} loading={"lazy"}/>
                      <div className="product360__right-custom-info">
                      <span>{accessory.title}</span>
                      <span>${accessory.price}</span>
                      </div>
                      <div className={`product360__right-custom-checker ${addedAccessory ? addedAccessory[i] ? "product360__right-custom-checker-active" : "" : ""}`}></div>
                    </li>
                  )
                })}
              </ul>
              </>
              : ""}
          </div>
          <div className="product360__right-price">
            <span>Total:</span> <span>${total}</span>
          </div>
        </div>
        <div className={`product360__right-bottom ${accIndex!==undefined ? "product360__right-bottom-disabled" : ""}`}>
          <span>Your custom style</span>
          <div className="product360__right-bottom-info">
          {file && accIndex === undefined ? <img src={URL.createObjectURL(file)} alt={"Retry"} loading="eager"/> : ""}
          <div className={`product360__right-bottom-upload ${file && accIndex === undefined ? "product360__right-bottom-upload-uploaded" : ""}`}>
          <label htmlFor="upload-photo">{accIndex !== undefined ? "Not available." : "Upload"}</label>
          <input type="file" name="photo" multiple={false} accept="image/*" id="upload-photo" onChange={(e) => handleFileChange(e)} disabled={accIndex !== undefined ? true : false}/>
          {file && accIndex === undefined ? <button type="button" onClick={()=> setFile(undefined)}>Remove</button> : ""}
          </div>
          </div>
        </div>
      </div>
      :""}
      {!clicked ? <img src={"/assets/cursor/360-icon.svg"} alt={""} loading={"lazy"}/> : ""}
    </div>
  );
}

export default Product360;
