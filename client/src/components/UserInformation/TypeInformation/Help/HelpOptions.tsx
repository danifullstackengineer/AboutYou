import { VscQuestion } from "react-icons/vsc";
import { Link } from "react-router-dom";
import "../../../../styles/components/UserInformation/TypeInformation/Help/HelpOption.css";
import { useNavigate } from "react-router-dom";

function HelpOption({
  icon,
  title,
  links,
  buttonLink,
}: {
  icon: string;
  title: string;
  links: { info: string; link: string }[];
  buttonLink: string;
}) {
  const navigate = useNavigate();

  return (
    <div className="helpOption">
      <img
        src={icon}
        alt={icon}
        loading={"lazy"}
        onClick={() => navigate(buttonLink)}
      />
      <h3>{title}</h3>
      <div className="helpOption__option">
        {links.map((link, i) => {
          return (
            <div key={i}>
              <span>
                <VscQuestion />
              </span>
              <Link to={link.link}>{link.info}</Link>
            </div>
          );
        })}
        <Link to={buttonLink}>Other questions</Link>
      </div>
    </div>
  );
}

export default HelpOption;
