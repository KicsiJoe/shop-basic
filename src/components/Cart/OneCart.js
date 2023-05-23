import React, { useContext, useEffect, useState } from "react";
import style from "../../css/Cart.module.css";
import "../../css/App.css";
import { v4 as uid } from "uuid";
import { AuthContext } from "../../contexts/AuthContext.js";

const OneCart = ({ cartItems, setCart, cart }) => {
  const { loggedIn } = useContext(AuthContext);

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

    if (quantity == 1) {
      if (window.confirm("Do you want to remove the item from the cart?")) {
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
    let itemNumberInCart = Number(cart[item[0].productId]) + 1;
    setCart({ ...cart, [item[0]["productId"]]: itemNumberInCart });
  }
  function checkout() {
    if (loggedIn.authId) {
      alert("rendeles van!");
    } else alert("be kell jelentkezni!");
  }

  function saveForLater(cartItems) {
    // saveCart(cartItems )
  }
};

export default OneCart;
