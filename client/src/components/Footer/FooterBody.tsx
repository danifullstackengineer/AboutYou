import "../../styles/components/Footer/FooterBody.css";
import FifthFooter from "./FifthFooter";
import FirstFooter from "./FirstFooter";
import FourthFooter from "./FourthFooter";
import SecondFooter from "./SecondFooter";
import SixthFooter from "./SixthFooter";
import ThirdFooter from "./ThirdFooter";

function FooterBody() {
  return (
    <div className="footerBody">
      <FirstFooter />
      <SecondFooter />
      <ThirdFooter />
      <FourthFooter />
      <FifthFooter />
      <SixthFooter />
    </div>
  );
}

export default FooterBody;
