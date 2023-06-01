import React, { useContext, useEffect, useState } from "react";
import styles from "../css/Header.module.css"; 
import {
  shop,
  heart_empty,
  heart_full,
  search,
  profile,
  cartIcon,
} from "../icon/icons";
import Navbar_ul from "../components/Navbar_ul";
import { NavLink } from "react-router-dom";
import Logout from "../components/Logout";

import { AuthContext } from "../contexts/AuthContext";
import { CartContext } from "../contexts/CartContext";
import { UserCartContext } from "../contexts/UserCartContext";

const Header = () => {
  const { userCart, setUserCart, setTrigger } = useContext(UserCartContext);

  const { loggedIn } = useContext(AuthContext);
  const { cart, setCart } = useContext(CartContext);
  
  const [numberOfCard, setNumberOfCard] = useState(0);

  useEffect(() => {
    //Itt jarunk => headerben a kosarban mi jelenjen meg szam, ha be van lépve, vagy sem...
    if (loggedIn.authId) {
      console.log("bejelentkezve");
      console.log(Object.keys(userCart).length);
      setNumberOfCard(Object.keys(userCart).length);
    } else {
      setNumberOfCard(Object.keys(cart).length);
    }
  }, [cart, userCart, setTrigger]);

  return (
    <div className={styles.header_box}>
      <nav className={styles.navigation_container}>
        <NavLink to="/" id="a_logo">
          <div className={styles.logo}>
            <div className={styles.logo_icon}>{shop} </div>
            <div>Logo</div>
          </div>
        </NavLink>
        <Navbar_ul />
        <div className={styles.icon_list}>
          {loggedIn?.userName ? (
            <div className={styles.icon_boxes}>
              <span className={styles.icon}>
                <Logout />
              </span>
            </div>
          ) : (
            ""
          )}
          <div className={styles.icon_boxes}>
            <span className={styles.icon}>
              <NavLink to="/favorites">{heart_empty}</NavLink>
            </span>
            <span className={styles.numb}>0</span>
          </div>

          <div className={styles.icon_boxes}>
            <span className={styles.icon}>
              <NavLink to="/cart">{cartIcon}</NavLink>
            </span>
            <span className={styles.numb}>{numberOfCard}</span>
          </div>

          <div className={styles.icon_boxes}>
            <span className={styles.icon}>
              <NavLink to="/account">{profile}</NavLink>
            </span>
          </div>
          <div className={styles.icon_boxes}>
            <span className={styles.icon}>
              <NavLink to="/search">{search}</NavLink>
            </span>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
