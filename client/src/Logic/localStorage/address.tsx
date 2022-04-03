import IAddress from "../../types/address";

const setFirstAddress = (address: IAddress): void => {
  localStorage.setItem("addressOne", JSON.stringify(address));
  window.dispatchEvent(new Event("addressOne"));
};
const setSecondAddress = (address: IAddress): void => {
  localStorage.setItem("addressTwo", JSON.stringify(address));
  window.dispatchEvent(new Event("addressTwo"));
};
const getFirstAddress = (): IAddress | false => {
  const address = localStorage.getItem("addressOne");
  if (address) {
    return JSON.parse(address);
  } else {
    return false;
  }
};
const getSecondAddress = (): IAddress | false => {
  const address = localStorage.getItem("addressTwo");
  if (address) {
    return JSON.parse(address);
  } else {
    return false;
  }
};


export { setFirstAddress, setSecondAddress, getFirstAddress, getSecondAddress };