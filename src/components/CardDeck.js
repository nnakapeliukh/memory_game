import { useEffect, useState } from "react";
import Card from "./Card.js";
import { GetNewImages, CheckIsUnique } from "./GetNewImages.js";
import HighScoreBoard from "./HighScoreBoard.js";
import Header from "./Header.js";

const CardDeck = (props) => {
  const [deckImageUrls, setDeckImageUrls] = useState([]);
  const [alreadyClicked, setAlreadyClicked] = useState([]);
  const [isGetImage, setIsGetImage] = useState(true);
  const [isShuffleImage, setIsShuffleImage] = useState(false);
  const minDifficulty = 3;
  const [difficulty, setDifficulty] = useState(minDifficulty); //(minDifficulty);

  useEffect(() => {
    if (isGetImage === true) {
      setDeckImageUrls(new Array(difficulty).fill(undefined));
      GetNewImages(difficulty).then((urls) => {
        setDeckImageUrls(urls);
      });

      setIsGetImage(false);
    }
  }, [isGetImage]);

  const shuffleDeck = () => {
    function shuffle(items) {
      for (var i = items.length; i-- > 1; ) {
        var j = Math.floor(Math.random() * i);
        var tmp = items[i];
        items[i] = items[j];
        items[j] = tmp;
      }
      return items;
    }
    setDeckImageUrls(shuffle(deckImageUrls));
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
    <div className="game-div">
      <Header />
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
              handleClick={handleClick}
              loadingNew={isGetImage}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CardDeck;
