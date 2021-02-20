import { useEffect, useState } from "react";
import "../styles/Card.css";
const Card = (props) => {
  const generateEmptyCards = () => {
    const deckOfEmpty = [];
    for (let i = 0; i < props.numOfCards; i++) {
      deckOfEmpty.push(<div className="card-placeholder">Rendering</div>);
    }
    return deckOfEmpty;
  };

  const [isLoaded, setIsLoaded] = useState(0);

  // useEffect(() => {
  //   console.log("image hook");
  //   // cacheImage();
  //   if (props.imageUrl) {
  //     let tempImage = new Image();
  //     tempImage.src = props.imageUrl;
  //     tempImage.onload = { handleImageLoaded };
  //   }
  // }, [props.imageUrl]);
  useEffect(() => {
    cacheImage();
  }, [props.imageUrl]);

  const cacheImage = async () => {
    console.log("cache image fnc");
    if (props.imageUrl) {
      const promise = await new Promise((resolve, reject) => {
        let tempImage = new Image();
        tempImage.src = props.imageUrl;
        tempImage.onload = resolve();
      });
      await promise;

      setIsLoaded(1);
    }
  };

  const handleImageLoaded = () => {
    setIsLoaded(1);
    console.log("loaded");
  };

  return (
    <div className="card">
      {isLoaded ? (
        <div
          className="card"
          onClick={() => {
            props.handleClick(props.imageUrl);
          }}
        >
          {<img src={props.imageUrl} width="223px" alt="fetching..." />}
        </div>
      ) : (
        <div className="card-placeholder">Rendering</div>
      )}
    </div>
  );

  // if (props.imageUrl) {
  //   return (
  //     <div
  //       className="card"
  //       onClick={() => {
  //         props.handleClick(props.imageUrl);
  //       }}
  //     >
  //       image loaded: {isLoaded}
  //       {
  //         <img
  //           src={props.imageUrl}
  //           onLoad={handleImageLoaded}
  //           width="223px"
  //           alt="fetching..."
  //         />
  //       }
  //     </div>
  //   );
  // } else {
  //   return (
  //     // <div className="card-deck-placeholder"> {generateEmptyCards()} </div>
  //     <div className="card-placeholder">Rendering</div>
  //   );
  // }
};

export default Card;
