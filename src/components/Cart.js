import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../contexts/CartContext";
import { getCartItems } from "../services/cart-services";
import style from "../css/Admin.module.css"

const Cart = () => {
  const { cart } = useContext(CartContext);
  const [cartItems, setCartItems] = useState([]);
  console.log(cartItems);
  useEffect(() => {
    if (Object.keys(cart).length > 0) {
      getCartItems(cart).then((res) => setCartItems(res));
    }
  }, []);

  return (
    <section className="main-container">
      <div className={style.table_width_title}>
        <h3 className={style.title}>Cart</h3>
      </div>

        

    </section>
  );
};

export default Cart;
