import { useEffect, useState } from "react";
import Card from "./Card.js";
import { GetNewImages, CheckIsUnique } from "./GetNewImages.js";
import HighScoreBoard from "./HighScoreBoard.js";

const CardDeck = (props) => {
  const [deckImageUrls, setDeckImageUrls] = useState([]);
  const [alreadyClicked, setAlreadyClicked] = useState([]);
  const [isGetImage, setIsGetImage] = useState(true);
  const [isShuffleImage, setIsShuffleImage] = useState(false);
  const [difficulty, setDifficulty] = useState(2);

  useEffect(() => {
    if (isGetImage === true) {
      setDeckImageUrls([null]);
      GetNewImages(difficulty).then((urls) => {
        setDeckImageUrls(urls);
      });

      setIsGetImage(false);
    }
  }, [isGetImage]);

  const shuffleDeck = () => {
    let tempDeckImageUrls = deckImageUrls.sort((a, b) => {
      return 0.5 - Math.random();
    });
    tempDeckImageUrls = deckImageUrls.sort((a, b) => {
      return 0.5 - Math.random();
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

  const handleClick = (id) => {
    if (CheckIsUnique(alreadyClicked, id)) {
      setAlreadyClicked([...alreadyClicked, id]);
      setIsShuffleImage(true);
    } else {
      setIsGetImage(true);
      setAlreadyClicked([]);
    }
  };

  const checkWin = () => {
    if (alreadyClicked.length === difficulty) {
      setDifficulty(difficulty + 1);
      setIsGetImage(true);
    }
  };

  return (
    <div>
      <HighScoreBoard score={alreadyClicked.length} win={checkWin} />
      {deckImageUrls.map((cardUrl, index) => {
        return (
          <Card
            imageUrl={cardUrl}
            key={index}
            id={index}
            handleClick={handleClick}
          />
        );
      })}
    </div>
  );
};

export default CardDeck;
