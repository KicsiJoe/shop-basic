import React, { useContext, useEffect, useState } from "react";
import style from "../../css/Cart.module.css";
import "../../css/App.css";
import { v4 as uid } from "uuid";
import { AuthContext } from "../../contexts/AuthContext.js";
import { updateUserOwnCart } from "../../services/cart-services.js";

const OwnCart = ({ userCart, userFirebaseCart, setTrigger }) => {
  const { loggedIn } = useContext(AuthContext);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(
      userCart?.reduce((acc, current) => {
        return acc + current[0]["price"] * current[1];
      }, 0)
    );
  }, [userCart]);

  return (
    <>
      <div>Payment Total: {total} EUR</div>
      <button onClick={checkout}>checkout</button>

      <div className={style.cards_container}>
        {userCart?.length > 0
          ? userCart.map((item) => {
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
        let cartCopy = { ...userFirebaseCart };
        delete cartCopy[item[0].productId];
        updateUserOwnCart(cartCopy, loggedIn.authId).then((res) =>
          setTrigger((prev) => !prev)
        );
      }
    } else {
      let itemNumberInCart = Number(userFirebaseCart[item[0].productId]) - 1;
      let cartCopy = {
        ...userFirebaseCart,
        [item[0]["productId"]]: itemNumberInCart,
      };
      updateUserOwnCart(cartCopy, loggedIn.authId).then((res) =>
        setTrigger((prev) => !prev)
      );
    }
  }

  function item_plus(item) {
    let itemNumberInCart = Number(userFirebaseCart[item[0].productId]) + 1;
    let cartCopy = {
      ...userFirebaseCart,
      [item[0]["productId"]]: itemNumberInCart,
    };
    updateUserOwnCart(cartCopy, loggedIn.authId).then((res) =>
      setTrigger((prev) => !prev)
    );
  }
  function checkout() {
    if (loggedIn.authId) {
      alert("rendeles van!");
    } else alert("be kell jelentkezni!");
  }

  function saveForLater(userCart) {
    // saveCart(cartItems )
  }
};

export default OwnCart;
