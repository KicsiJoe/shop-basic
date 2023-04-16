import React from "react";
import styles from "../../css/Header.module.css"
import {arrow_down} from "../../img-icon/icons"

const Navbar_ul = () => {
  return (
    <ul className={styles.nav_list}>
      <li>HOME</li>
      <li className={styles.shop_li} >SHOP <span className={styles.icon_arrow_down}>{arrow_down}</span></li>
      <li>ABOUT US</li>
    </ul>
  );
};

export default Navbar_ul;
