import React from "react";
import { cards } from "../../services/db";
import Card from "./Card.js";

const Cards = () => {
  let {
    cosmetics: [...cardsExp],
  } = cards;
  console.log(cardsExp);

  return (
    <>
      {cardsExp.map((cardObj) => (
        <Card key={cardObj.id} cardObj={cardObj} />
      ))}
    </>
  );
};

export default Cards;
