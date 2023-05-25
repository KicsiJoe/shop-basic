import React, { useContext, useEffect } from "react";
import Card from "./Card.js";
import { v4 as uuid } from "uuid";
import { CartContext } from "../../contexts/CartContext";
import { AuthContext } from "../../contexts/AuthContext";
import { ProductsContext } from "../../contexts/ProductsContext";

const Cards = () => {
  const { cart, setCart } = useContext(CartContext);
  const { loggedIn } = useContext(AuthContext);
  const { productsList, setProductsList, setTrigger } =
    useContext(ProductsContext);

  useEffect(() => {
    setTrigger((prev) => !prev);
  }, []);

  console.log(productsList);
  return (
    <>
      {productsList?.length > 0
        ? productsList?.map((cardObj) => {
          // console.log(cardObj);
            if (cardObj[1].productId != "deleted") {
              return (
                <Card
                  key={uuid()}
                  cardObj={cardObj[1]}
                  cart={cart}
                  setCart={setCart}
                  loggedIn={loggedIn?.authId ? true : false}
                />
              );
            } else {
              return "";
            }
          })
        : ""}
    </>
  );
};

export default Cards;
