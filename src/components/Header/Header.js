import React from "react";
import styles from "../../css/Header.module.css";
import {
  shop,
  heart_empty,
  heart_full,
  search,
  profile,
  cart,
} from "../../icon/icons";
import Navbar_ul from "./Navbar_ul";
import { NavLink } from "react-router-dom";
import Logout from "../Logout";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";


const Header = () => {

  const {loggedIn } = useContext(AuthContext)

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
              <NavLink to="/cart">{cart}</NavLink>
            </span>
            <span className={styles.numb}>0</span>
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
