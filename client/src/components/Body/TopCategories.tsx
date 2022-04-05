import "../../styles/components/Body/TopCategories.css";

function TopCategories() {
  return (
    <div className="topCategories">
      <span>Your top categories</span>
      <div className="topCategories__category">
        <button>Jackets</button>
        <button>Dresses</button>
        <button>Classic tops</button>
        <button>Jeans</button>
        <button>Sneakers</button>
        <button>Bags</button>
      </div>
    </div>
  );
}

export default TopCategories;
