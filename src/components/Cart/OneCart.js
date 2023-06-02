import React, { useContext, useEffect, useState } from "react";
import style from "../../css/Cart.module.css";
import "../../css/App.css";
import { v4 as uid } from "uuid";
import { AuthContext } from "../../contexts/AuthContext";
import { UserCartContext } from "../../contexts/UserCartContext";

import { updateUserOwnCart } from "../../services/cart-services";
// import {  useNavigate } from "react-router-dom";

const OneCart = ({ cartItems, setCart, cart, setTrigger, setCartItems }) => {
  const { loggedIn } = useContext(AuthContext);
  const { userCart, setUserCart } = useContext(UserCartContext);

  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(
      cartItems?.reduce((acc, current) => {
        return acc + current[0]["price"] * current[1];
      }, 0)
    );
  }, [cartItems]);

  return (
    <>
      <div>Payment Total: {total} EUR</div>
      <button onClick={checkout}>checkout</button>
      {loggedIn.authId ? (
        <button onClick={() => saveForLater(cartItems)}>OR save</button>
      ) : (
        ""
      )}
      <div className={style.cards_container}>
        {cartItems?.length > 0
          ? cartItems.map((item) => {
              return (
                <div key={uid()} className={style.cart_box}>
                  <img
                    className={style.card_img}
                    src={item[0].pic.picUrl}
                    alt="picture"
                  />
                  <div>{item[0].title}</div>
                  <div>{item[0].price} EUR</div>
                  <div>Subtotal: {item[1] * item[0].price} EUR</div>
                  <div className={style.btns_box}>
                    <span
                      className={style.item_minus}
                      onClick={() => item_minus(item)}
                    >
                      -
                    </span>
                    <span>{item[1]}</span>
                    <span
                      className={style.item_plus}
                      onClick={() => item_plus(item)}
                    >
                      +
                    </span>
                  </div>
                </div>
              );
            })
          : ""}
      </div>
    </>
  );

  function item_minus(item) {
    const [product, quantity] = item;
    if (quantity == "1") {
      if (window.confirm("Do you want to remove the item from the cart?")) {
        let cartCopy = { ...cart };
        delete cartCopy[product.productId];
        setCart(cartCopy);
        setCartItems({});
      }
    } else {
      let itemNumberInCart = Number(cart[item[0].productId]) - 1;
      setCart({ ...cart, [item[0]["productId"]]: itemNumberInCart });
    }
  }

  function item_plus(item) {
    let itemNumberInCart = Number(cart[item[0].productId]) + 1;
    setCart({ ...cart, [item[0]["productId"]]: itemNumberInCart });
  }
  function checkout() {
    if (loggedIn.authId) {
      alert("rendeles van!");
    } else alert("be kell jelentkezni!");
  }

  function saveForLater(cartItems) {
    // console.log(cart);
    // console.log(cartItems);
    // console.log(userCart);
    let userCartCopy = { ...userCart };
    let userCartObj = Object.keys(userCart);

    cartItems.forEach((item) => {
      userCartObj.includes(item[0].productId)
        ? (userCartCopy = {
            ...userCartCopy,
            [item[0].productId]:
              Number(userCart[item[0].productId]) + Number(item[1]),
          })
        : (userCartCopy = { ...userCartCopy, [item[0].productId]: item[1] });
    });
    Promise.all([
      updateUserOwnCart(userCartCopy, loggedIn.authId),
      setCart({}),
      setCartItems(null),
    ]).then((res) => setTrigger((prev) => !prev));
  }
};

export default OneCart;
