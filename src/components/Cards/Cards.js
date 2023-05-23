import React, { useContext } from "react";
import Card from "./Card.js";
import { useEffect } from "react";
import { useState } from "react";
import { getProduct } from "../../services/user-services";
import { v4 as uuid } from "uuid";
import { CartContext } from "../../contexts/CartContext";
import { AuthContext } from "../../contexts/AuthContext";
import {getUserCart} from '../../services/cart-services'
import { ProductsContext } from "../../contexts/ProductsContext";
import { UserCartContext } from "../../contexts/UserCartContext";

const Cards = () => {
  const {cart, setCart} = useContext(CartContext)
  const { loggedIn } = useContext(AuthContext)
  const {productsList, setProductsList} = useContext(ProductsContext)
  const {userCart, setUserCart} = useContext(UserCartContext);

  return (
    <>
      {productsList?.length > 0
        ? productsList?.map((cardObj) => (
            <Card key={uuid()} cardObj={cardObj[1]} cart={cart} setCart={setCart} loggedIn={loggedIn?.authId ? true : false }/>
          ))
        : ""}
    </>
  );
};

export default Cards;
