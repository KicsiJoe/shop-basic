import React from "react";
import Card from "./Card.js";
import { useEffect } from "react";
import { useState } from "react";
import { getProduct } from "../../services/user-services";
import { v4 as uuid } from "uuid";

const Cards = () => {
  const [productsList, setProductsList] = useState([]);

  useEffect(() => {
    getProduct("all").then((res) => {
      if (res != null) {
        setProductsList(Object.entries(res));
      } else {
        setProductsList([]);
      }
    });
  }, []);

  return (
    <>
      {productsList?.length > 0
        ? productsList?.map((cardObj) => (
            <Card key={uuid()} cardObj={cardObj[1]} />
          ))
        : ""}
    </>
  );
};

export default Cards;
