import React, { useContext } from "react";
import style from "../../css/Card.module.css";
import { addToCart, heart_empty } from "../../icon/icons";
import { UserCartContext } from "../../contexts/UserCartContext";
import { updateUserOwnCart } from "../../services/cart-services";
import { AuthContext } from "../../contexts/AuthContext";
import { NavLink } from "react-router-dom";

const Card = ({ cardObj, setCart, cart, loggedInTrueOrFalse }) => {
  const { loggedIn } = useContext(AuthContext);
  const { userCart, setUserCart, setTrigger } = useContext(UserCartContext);
  // console.log(Object.keys(userCart).length);
  return (
    <div className={style.card_box}>
      <img src={cardObj.pic.picUrl} alt="picture" />
      <p>{cardObj.title}</p>
      <p>{cardObj.id}</p>
      <p>{cardObj.price} EUR</p>
      <div className={style.icon_box}>
      {loggedIn?.userName ? (
          <>
            <span className={style.icon}>
              <NavLink to="/favorites">{heart_empty}</NavLink>
            </span>
          </>
        ) : (
          ""
        )}
        <p className={style.addToCart} onClick={() => addToCartfunc(cardObj)}>
          {addToCart}
        </p>{" "}
     
      </div>
    </div>
  );
  function addToCartfunc(cardObj) {
    if (!loggedInTrueOrFalse) {
      if (!Object.keys(cart).includes(cardObj.productId)) {
        setCart({ ...cart, [cardObj["productId"]]: 1 });
      } else {
        let itemNumberInCart = Number(cart[cardObj.productId]) + 1;
        setCart({ ...cart, [cardObj["productId"]]: itemNumberInCart });
      }
    } else {
      if (Object.keys(userCart).length == 0) {
        updateUserOwnCart({ [cardObj.productId]: 1 }, loggedIn.authId).then(
          (res) => setTrigger((prev) => !prev)
        );
      } else {
        let copyUserCart = { ...userCart };
        Object.keys(userCart).includes(cardObj.productId)
          ? (copyUserCart = {
              ...copyUserCart,
              [cardObj.productId]: userCart[cardObj.productId] + 1,
            })
          : (copyUserCart = { ...copyUserCart, [cardObj.productId]: 1 });
        updateUserOwnCart(copyUserCart, loggedIn.authId).then((res) =>
          setTrigger((prev) => !prev)
        );
      }
    }
  }
};

export default Card;
