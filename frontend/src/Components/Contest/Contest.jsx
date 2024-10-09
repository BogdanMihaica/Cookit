import "./Contest.css";

export const Contest = ({ name, image }) => {
  return (
    <div className="contest-container">
      <div className="contest-name">
        <p>{name}</p>
      </div>
      <div
        className="contest-photo"
        style={{ background: `url(${image})`, backgroundSize: "cover" }}
      ></div>
      <div className="see-details">
        <p>See details {" >"}</p>
      </div>
    </div>
  );
};
