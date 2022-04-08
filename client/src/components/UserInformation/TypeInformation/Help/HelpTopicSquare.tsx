import "../../../../styles/components/UserInformation/TypeInformation/Help/HelpTopicSquare.css";
import { IoIosArrowForward } from "react-icons/io";

function HelpTopicSquare({ text }: { text: string }) {
  return (
    <div className="helpTopicSquare">
      <span>{text}</span>
      <span>
        <IoIosArrowForward />
      </span>
    </div>
  );
}

export default HelpTopicSquare;
