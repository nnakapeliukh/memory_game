import "../styles/HighScoreBoard.css";

const HighScoreBoard = (props) => {
  return (
    <div className="highscore-div">
      <div className="highscore-inner">
        <p>
          High Score: {props.highScore} Score:{props.score} Difficulty:
          {props.difficulty}
        </p>
      </div>
    </div>
  );
};

export default HighScoreBoard;
