import "./Recipe.css";
import { useNavigate } from "react-router-dom";

export const Recipe = ({ imgUrl, title, duration, description, id }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    const formattedTitle = title.toLowerCase().replace(/\s+/g, "-");
    navigate(`/recipes/${formattedTitle}-${id}`);
  };

  return (
    <div className="recipe-container" onClick={handleClick}>
      <div className="image-container">
        <img className="recipe-image" src={imgUrl} alt="food" />
      </div>
      <p className="recipe-title">{title}</p>
      <p className="description">{description}</p>
      <div className="rating"></div>
      <p className="duration">Duration: {duration}</p>
    </div>
  );
};
