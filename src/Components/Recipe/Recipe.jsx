import "./Recipe.css";

export const Recipe = (imgUrl, title) => {
  return (
    <>
      <div className="recipe-container">
        <img className="recipe-image" src={imgUrl} alt="food" />
        <p class="recipe-title">{title}</p>
      </div>
    </>
  );
};
