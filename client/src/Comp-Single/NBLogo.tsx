import "../styles/Comp-Single/NBLogo.css";
import { useNavigate } from "react-router-dom";

function NBLogo({
  chosenMode,
  size,
}: {
  chosenMode: boolean | undefined;
  size?: number;
}) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("/")}
      className={`nbLogo ${
        chosenMode === undefined || chosenMode ? "nbLogo-light" : "nbLogo-dark"
      }`}
    >
      {chosenMode === undefined || chosenMode ? (
        <img
          style={{
            width: size ? size : undefined,
          }}
          loading={"eager"}
          src={"/assets/logo/lightmode.svg"}
          alt={"/assets/logo/lightmode.svg"}
        />
      ) : (
        <img
          style={{ width: size ? size : undefined }}
          loading={"eager"}
          src={"/assets/logo/darkmode.png"}
          alt={"/assets/logo/darkmode.png"}
        />
      )}
    </div>
  );
}

export default NBLogo;
