import React from "react";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { logout } from "../icon/icons";
import {  useNavigate } from "react-router-dom";
import style from "../css/Header.module.css";
import { CartContext } from "../contexts/CartContext";
import { UserCartContext } from "../contexts/UserCartContext.js";


const Logout = () => {
  const navigate = useNavigate();
  const { loggedIn, setLoggedIn } = useContext(AuthContext);
  const { setCart } = useContext(CartContext); 
  const { setUserCart } = useContext(UserCartContext); 


  return (
    <div className={style.text_logout}>
      <span className={style.loggedIn_name}>{loggedIn?.userName}</span>
      <span onClick={logoutFunc}>{logout}</span>
    </div>
  );
  function logoutFunc() {
    Promise.all([setCart({}),
    setLoggedIn({}),
    setUserCart(null)]).then(res=>  navigate("/"))
 
  }
};

export default Logout;
