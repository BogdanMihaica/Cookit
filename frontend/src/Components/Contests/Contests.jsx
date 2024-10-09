import { Contest } from "../Contest/Contest";
import { Navbar } from "../Navbar/Navbar";
import "./Contests.css";

export const Contests = () => {
  return (
    <div className="contests-full">
      <Navbar />
      <div className="contests-container">
        <h1 className="contests-title">Contests</h1>
        <p className="contests-description">
          This is where you can share your cooking passion with the community by
          participating in unique contests. If you place among the top 3
          contestants, you will be awarded a Cookit trophy! Wishing you all the
          best—have fun cooking!
        </p>
        <div className="contests-list">
          <Contest
            name="Best french dish"
            image="https://t3.ftcdn.net/jpg/03/43/43/72/360_F_343437244_HrxIVZWbfh29tgxuRlxbPXEpHMSmfkAn.jpg"
          />
          <Contest
            name="Best italian dish"
            image="https://t3.ftcdn.net/jpg/03/43/43/72/360_F_343437244_HrxIVZWbfh29tgxuRlxbPXEpHMSmfkAn.jpg"
          />
          <Contest
            name="Best desert"
            image="https://t3.ftcdn.net/jpg/03/43/43/72/360_F_343437244_HrxIVZWbfh29tgxuRlxbPXEpHMSmfkAn.jpg"
          />
          <Contest
            name="Best chinese recipe"
            image="https://t3.ftcdn.net/jpg/03/43/43/72/360_F_343437244_HrxIVZWbfh29tgxuRlxbPXEpHMSmfkAn.jpg"
          />
        </div>
      </div>
    </div>
  );
};
