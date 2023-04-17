import React from "react";
import styles from "../../css/Header.module.css"
import {arrow_down} from "../../icon/icons";
import {Link, NavLink} from "react-router-dom";

const Navbar_ul = () => {
  return (
    <ul className={styles.nav_list}>
      <li><NavLink className={({isActive}) => isActive ? styles.my_active : ''} to="/">HOME</NavLink></li>
      <li className={styles.shop_li} ><NavLink to="/products" className={({isActive}) => isActive ? styles.my_active : ""} >SHOP</NavLink><span className={styles.icon_arrow_down }>{arrow_down}</span>
      </li>
      <li><NavLink className={({isActive}) => isActive ? styles.my_active : ''} to="/account">ABOUT US</NavLink></li>
    </ul>
  );
};

export default Navbar_ul;
