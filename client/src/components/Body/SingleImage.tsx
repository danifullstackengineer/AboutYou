import "../../styles/components/Body/SingleImage.css";

function SingleImage({
  info,
  image,
  button
}: {
  info: { title1: string; title2: string; bgColor: string };
    image: string;
    button: string;
}) {
  return (
    <div className="singleImage">
      <div
        className="singleImage__left"
        style={{ backgroundColor: info.bgColor }}
      >
        <div className="singleImage__left-container">
          <div className="singleImage__left-text1">{info.title1}</div>
          <div className="singleImage__left-text2">{info.title2}</div>
          <button>{button}</button>
        </div>
      </div>
      <div className="singleImage__right">
        <img src={image} alt="" />
      </div>
    </div>
  );
}

export default SingleImage;
