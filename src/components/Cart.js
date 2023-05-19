import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../contexts/CartContext";
import { getCartItems } from "../services/cart-services";
import style from "../css/Cart.module.css";
import "../css/App.css";

import { v4 as uid } from "uuid";
import { AuthContext } from "../contexts/AuthContext";

const Cart = () => {
  const { cart, setCart } = useContext(CartContext);
  const { loggedIn, setLoggedIn } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  console.log(cartItems);
  console.log(cart);
  useEffect(() => {
    if (Object.keys(cart).length > 0) {
      getCartItems(cart)
        .then((itemArr) => {
          setCartItems(itemArr);
          return itemArr;
        })
        .then((itemArr) => {
          return itemArr.reduce((acc, current) => {
            return acc + current[0]["price"] * current[1];
          }, 0);
        })
        .then((res) => setTotal(res));
    }
  }, [cart]);

  return (
    <section className="main-container">
      <div className={style.table_width_title}>
        <h3 className={style.title}>Cart</h3>
      </div>
      <div>Payment Total: {total} EUR</div>
      <button onClick={checkout}>checkout</button>
      <div className={style.cards_container}>
        {cartItems.length > 0
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
    </section>
  );

  function checkout() {
    if (loggedIn.authId) {
      console.log("rendeles van!");
    } else console.log("be kell jelentkezni!");
  }

  function item_minus(item) {
    const [product, quantity] = item;
    console.log(item, "-");

    if (quantity == 1) {
      if (window.confirm("Do you want to remove the item from the cart?")) {
        console.log("eltavolitas");
        let cartCopy = { ...cart };
        delete cartCopy[item[0].productId];
        setCart(cartCopy);
      }
    } else {
      let itemNumberInCart = Number(cart[item[0].productId]) - 1;
      setCart({ ...cart, [item[0]["productId"]]: itemNumberInCart });
    }
  }

  function item_plus(item) {
    console.log(item, "+");
    let itemNumberInCart = Number(cart[item[0].productId]) + 1;
    setCart({ ...cart, [item[0]["productId"]]: itemNumberInCart });
  }
};

export default Cart;
