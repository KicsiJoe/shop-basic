import React, { useState, useContext } from "react";
import styles from "../css/Forms.module.css"
import Logout from "./Logout";
import Forms from "./Forms";
import { AuthContext } from "../contexts/AuthContext";
import Profile from "./Profile";


const Account = () => {
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
