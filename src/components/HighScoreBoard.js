const HighScoreBoard = (props) => {
  return (
    <div>
      High Score: {props.highScore} Score:{props.score} Difficulty:
      {props.difficulty}
    </div>
  );
};

export default HighScoreBoard;
