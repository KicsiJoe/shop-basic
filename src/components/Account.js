import React, { useState, useContext } from "react";
import styles from "../css/Forms.module.css"
import Logout from "./Logout";
import Forms from "./Forms";
import { AuthContext } from "../contexts/AuthContext";
import Profile from "./Profile";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


const Account = () => {

  const navigate = useNavigate()

  let basicForm = {
    signUp: {
      userName: "",
      email: "",
      pwd: "",
    },
    logIn: {
      email: "",
      pwd: "",
    },
  };
  const { loggedIn, setLoggedIn } = useContext(AuthContext);
  const [loginInputs, setLoginInputs] = useState(basicForm);
  useEffect(()=>{
    console.log(loggedIn);
    if(loggedIn?.role == "admin") {
      return navigate("/admin")
    }

  },[loggedIn])
  return (
    <section className="main-container">
      
    {loggedIn?.userName ? <Profile /> : <> <div className={styles.account}>
        <Forms
          title={"Sign Up"}
          func={"signUp"}
          setLoginInputs={setLoginInputs}
          loginInputs={loginInputs}
          basicForm={basicForm}
        />
        <Forms
          title={"Login"}
          func={"logIn"}
          setLoginInputs={setLoginInputs}
          loginInputs={loginInputs}
          basicForm={basicForm}
        />
      </div></> }
      
      
    </section>
  );

  // ;
};

export default Account;
