import "../../styles/components/Body/TitleInner.css";

function TitleInner({ title }: { title: { title1: string; title2: string } }) {
  return (
    <div className="titleInner">
      <span>{title.title1}</span>
      <span>{title.title2}</span>
    </div>
  );
}

export default TitleInner;
