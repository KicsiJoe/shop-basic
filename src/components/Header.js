import React from "react";
import styles from "../css/Header.module.css";
import {
  shop,
  heart_empty,
  heart_full,
  search,
  profile,
  cart,
} from "../img-icon/icons";
import Navbar_ul from "../components/Header/Navbar_ul";

const Header = () => {
  return (
    <div className={styles.header_box}>
      <nav className={styles.navigation_container}>
        <div className={styles.logo}>
          <div className={styles.logo_icon}>{shop} </div>
          <div>Logo</div>
        </div>
        <Navbar_ul />
        <div className={styles.icon_list}>
          <div className={styles.icon_boxes}>
            <span className={styles.icon}>{heart_empty}</span>
            <span className={styles.numb}>0</span>
          </div>

          <div className={styles.icon_boxes}>
            <span className={styles.icon}>{cart}</span>
            <span className={styles.numb}>0</span>
          </div>

          <div className={styles.icon_boxes}>
            <span className={styles.icon}>{profile}</span>
          </div>
          <div className={styles.icon_boxes}>
            <span className={styles.icon}>{search}</span>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
