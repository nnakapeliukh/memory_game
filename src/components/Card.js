import { useEffect, useState } from "react";
import "../styles/Card.css";
const Card = (props) => {
  if (props.imageUrl) {
    return (
      <div
        className="card"
        onClick={() => {
          props.handleClick(props.imageUrl);
        }}
      >
        {<img src={props.imageUrl} width="223px" alt="fetching..." />}
      </div>
    );
  } else {
    return <div>Rendering</div>;
  }
};

export default Card;
