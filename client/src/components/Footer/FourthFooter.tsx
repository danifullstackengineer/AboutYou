import  { useState } from "react";
import "../../styles/components/Footer/FourthFooter.css";

function FourthFooter() {
  const [list1] = useState<string[]>([
    "Women's fashion",
    "White sneakers",
    "Oversized tops",
    "Outdoor fashion",
    "Bootcut jeans",
  ]);
  const [list2] = useState<string[]>([
    "Maternity wear",
    "Skinny jeans",
    "Lingerie",
    "Bikinis",
    "Jeans skirts",
  ]);
  const [list3] = useState<string[]>([
    "Adidas sneakers",
    "Coccinelle bags",
    "Jeans jackets",
    "Puma sportswear",
    "Boots",
  ]);
  const [list4] = useState<string[]>([
    "Puma sneakers",
    "Plus Size Fashion",
    "Coctail dresses",
    "High-heels",
    "Sportswear",
  ]);

  const [list5] = useState<string[]>([
    "ONLY",
    "Calvin Klein Underwear",
    "Hunkemöller",
    "AMERICAN VINTAGE",
    "TRIUMPH",
  ]);
  const [list6] = useState<string[]>([
    "NA-KD",
    "PIECES",
    "MARCO TOZZI",
    "UNDER ARMOUR",
    "Mavi",
  ]);
  const [list7] = useState<string[]>([
    "TAMARIS",
    "HUGO",
    "Calvin Klein",
    "TOMS",
    "ADIDAS ORIGINALS",
  ]);
  const [list8] = useState<string[]>([
    "Coccinelle",
    "Public Desire",
    "PUMA",
    "MORE & MORE",
    "BOSS",
  ]);

  return (
    <div className="fourthFooter">
      <footer>
        <section>
          <h4 className="fourthFooter__h4-no-margin">CATEGORIES FOR WOMEN</h4>
          <div className="fourthFooter__items">
            <ul>
              {list1.map((item, i) => {
                return <li key={i}>{item}</li>;
              })}
            </ul>
            <ul>
              {list2.map((item, i) => {
                return <li key={i}>{item}</li>;
              })}
            </ul>
            <ul>
              {list3.map((item, i) => {
                return <li key={i}>{item}</li>;
              })}
            </ul>
            <ul>
              {list4.map((item, i) => {
                return <li key={i}>{item}</li>;
              })}
            </ul>
          </div>
        </section>
        <section>
          <h4>BRANDS FOR WOMEN</h4>
          <div className="fourthFooter__items">
            <ul>
              {list5.map((item, i) => {
                return <li key={i}>{item}</li>;
              })}
            </ul>
            <ul>
              {list6.map((item, i) => {
                return <li key={i}>{item}</li>;
              })}
            </ul>
            <ul>
              {list7.map((item, i) => {
                return <li key={i}>{item}</li>;
              })}
            </ul>
            <ul>
              {list8.map((item, i) => {
                return <li key={i}>{item}</li>;
              })}
            </ul>
          </div>
        </section>
      </footer>
    </div>
  );
}

export default FourthFooter;
