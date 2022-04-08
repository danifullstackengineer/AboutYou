import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import "../../../../styles/components/UserInformation/TypeInformation/Help/HelpFAQ.css";

function HelpFAQ({ title, link }: { title: string; link: string }) {
  return (
    <div className="helpFaq">
      <Link to={link}>{title}</Link>
      <span>
        <IoIosArrowForward />
      </span>
    </div>
  );
}

export default HelpFAQ;
