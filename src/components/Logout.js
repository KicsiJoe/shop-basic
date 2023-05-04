import React from "react";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext.js";
import { logout } from "../icon/icons";
import { Link, useNavigate } from "react-router-dom";
import style from "../css/Header.module.css";

const Logout = () => {
  const navigate = useNavigate();
  const { loggedIn, setLoggedIn } = useContext(AuthContext);

  return (
    <div className={style.text_logout}>
      <span className={style.loggedIn_name}>{loggedIn?.userName}</span>
      <span onClick={logoutFunc}>{logout}</span>
    </div>
  );
  function logoutFunc() {
    setLoggedIn({});
    navigate("/");
  }
};

export default Logout;
