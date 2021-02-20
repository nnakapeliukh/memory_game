import { useEffect, useState } from "react";
import "../styles/Card.css";
const Card = (props) => {
  const [isLoaded, setIsLoaded] = useState(0);

  useEffect(() => {
    if (props.imageUrl === undefined) {
      setIsLoaded(0);
    }
    if (!isLoaded) {
      cacheImage();
    }
  }, [props.imageUrl]);

  const cacheImage = async () => {
    if (props.imageUrl) {
      const promise = await new Promise((resolve, reject) => {
        const tempImage = new Image();
        tempImage.src = props.imageUrl;
        tempImage.onload = resolve;
      });
      await promise;
      setIsLoaded(1);
    }
  };

  return (
    <div className="card-wrapper">
      {props.imageUrl !== undefined && isLoaded ? (
        <div
          className="card"
          onClick={() => {
            props.handleClick(props.imageUrl);
          }}
        >
          {
            <img
              className="card"
              src={props.imageUrl}
              width="223px"
              alt="fetching..."
            />
          }
        </div>
      ) : (
        <div className="card-placeholder">
          <div className="animated-preload-1"></div>
          <div className="animated-preload-2"></div>
        </div>
      )}
    </div>
  );
};

export default Card;
