import { useEffect, useState } from "react";
import Card from "./Card.js";
import { GetNewImages, CheckIsUnique } from "./GetNewImages.js";
import HighScoreBoard from "./HighScoreBoard.js";

const CardDeck = (props) => {
  const [deckImageUrls, setDeckImageUrls] = useState([]);
  const [alreadyClicked, setAlreadyClicked] = useState([]);
  const [isGetImage, setIsGetImage] = useState(true);
  const [isShuffleImage, setIsShuffleImage] = useState(false);
  const minDifficulty = 2;
  const [difficulty, setDifficulty] = useState(13); //(minDifficulty);

  useEffect(() => {
    if (isGetImage === true) {
      setDeckImageUrls(new Array(difficulty).fill(false));
      GetNewImages(difficulty).then((urls) => {
        setDeckImageUrls(urls);
      });

      setIsGetImage(false);
    }
  }, [isGetImage]);

  const shuffleDeck = () => {
    let tempDeckImageUrls = deckImageUrls.sort((a, b) => {
      return 0.4 - Math.random();
    });
    tempDeckImageUrls = deckImageUrls.sort((a, b) => {
      return 0.6 - Math.random();
    });
    setDeckImageUrls(tempDeckImageUrls);
  };

  useEffect(() => {
    // console.log("trigered hook 1");
    if (isShuffleImage) {
      shuffleDeck();
      setIsShuffleImage(false);
    }
  }, [isShuffleImage]);

  const handleClick = (imageId) => {
    //clicked unique
    if (CheckIsUnique(alreadyClicked, imageId)) {
      setAlreadyClicked([...alreadyClicked, imageId]);
      setIsShuffleImage(true);

      setScore(score + 1);
      setRoundScore(roundScore + 1);

      //lost game
    } else {
      setScore(0);
      setIsGetImage(true);
      setAlreadyClicked([]);
      setRoundScore(0);
      setDifficulty(minDifficulty);
      console.log("round lost");
    }
  };

  const [score, setScore] = useState(0);
  const [roundScore, setRoundScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
    }
    //won round
    if (roundScore === difficulty) {
      setDifficulty(difficulty + 1);
      setIsGetImage(true);
      setRoundScore(0);

      setAlreadyClicked([]);
      console.log("round won");
    }
  }, [score]);

  return (
    <div>
      <HighScoreBoard
        score={score}
        highScore={highScore}
        difficulty={difficulty}
      />
      <div className="card-deck">
        {deckImageUrls.map((cardUrl, index) => {
          return (
            <Card
              imageUrl={cardUrl}
              key={index}
              id={index}
              handleClick={handleClick}
              numOfCards={difficulty}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CardDeck;
