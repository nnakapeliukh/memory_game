import { useEffect } from "react";
import { useState } from "react/cjs/react.development";

const HighScoreBoard = (props) => {
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    if (props.score > highScore) {
      setHighScore(props.score);
    }
    props.win();
  }, [props.score]);

  return (
    <div>
      High Score: {highScore} Score:{props.score}{" "}
    </div>
  );
};

export default HighScoreBoard;
