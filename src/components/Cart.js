import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../contexts/CartContext";
import {
  getCartItems,
  getUserCart,
  getUserCartWithModification,
} from "../services/cart-services";
import style from "../css/Cart.module.css";
import "../css/App.css";

import { v4 as uid } from "uuid";
import { AuthContext } from "../contexts/AuthContext";

import OneCart from "./Cart/OneCart";
import OwnCart from "./Cart/OwnCart.js";

const Cart = () => {
  const { loggedIn } = useContext(AuthContext);

  //Items in CartContext:
  const { cart, setCart } = useContext(CartContext); //{}
  //CartContext Items with full item object+quantity:
  const [cartItems, setCartItems] = useState(null);

  //Items in UserCart in firebase:
  const [userCart, setUserCart] = useState(null); // {starter: null} --> [{…}, 3]

  const [userFirebaseCart, setUserFirebaseCart] = useState(null); // {starter: null

  const [trigger, setTrigger] = useState(true);

  useEffect(() => {
    if (Object.keys(cart).length != 0) {
      getCartItems(cart, setCartItems);
    }
  }, [cart]);

  useEffect(() => {
    getUserCartWithModification(
      loggedIn.authId,
      setUserCart,
      setUserFirebaseCart
    );
  }, [trigger]);

  return (
    <section className="main-container">
      <div className={style.table_width_title}>
        <h3 className={style.title}>Cart</h3>
      </div>

      {cartItems?.length > 0 ? (
        <>
          <h1>New Cart</h1>
          <OneCart
            cartItems={cartItems}
            setCart={setCart}
            cart={cart}
            text={"new"}
          />
        </>
      ) : (
        ""
      )}

      {userCart?.length > 0 ? (
        <>
          <hr />
          <h1>Saved Cart</h1>
          <OwnCart
            userCart={userCart}
            userFirebaseCart={userFirebaseCart}
            setTrigger={setTrigger}
          />
        </>
      ) : (
        ""
      )}
    </section>
  );
};

export default Cart;
