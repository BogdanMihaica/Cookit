import "./Recipe.css";

export const Recipe = ({ imgUrl, title, duration, description }) => {
  return (
    <>
      <div className="recipe-container">
        <div className="image-container">
          <img className="recipe-image" src={imgUrl} alt="food" />
        </div>
        <p className="recipe-title">{title}</p>
        <p className="description">{description}</p>
        <div className="rating"></div>
        <p className="duration">Duration: {duration}</p>
      </div>
    </>
  );
};
