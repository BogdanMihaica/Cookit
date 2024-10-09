import "./Recipe.css";

export const Recipe = ({ imgUrl, title, duration, description }) => {
  return (
    <>
      <div className="recipe-container">
        <div className="image-container">
          <img className="recipe-image" src={imgUrl} alt="food" />
        </div>
        <p class="recipe-title">{title}</p>
        <p class="description">{description}</p>
        <div class="rating"></div>
        <p class="duration">Duration: {duration}</p>
      </div>
    </>
  );
};
