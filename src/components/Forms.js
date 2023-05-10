import React from "react";
import {
  getUserInfo,
  loginService,
  registerService,
  saveUserToFirebase,
} from "../services/user-services";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import style from "../css/Forms.module.css";

const Forms = ({ setLoginInputs, loginInputs, basicForm, func, title }) => {

  const navigate = useNavigate();
  const { loggedIn, setLoggedIn } = useContext(AuthContext);
  return (
    <div>
      <h4 className={style.title}>{title}</h4>
      <form onSubmit={(e) => submit(e, func)}>
        {func == "signUp" ? (
          <div>
            <label htmlFor="company">Company registration</label>
            <input
              type="checkbox"
              id="company"
              checked={loginInputs[func].company}
              onChange={inputChkbox}
            />
            <p>
              <label htmlFor="username">Username: </label>
            </p>
            <input
              type="text"
              placeholder="Username"
              id="username"
              value={loginInputs[func].userName}
              onChange={inputUsername}
            />
          </div>
        ) : (
          ""
        )}

        <p>
          <label htmlFor="email">Email: </label>
        </p>
        <input
          type="text"
          placeholder="Email"
          id="email"
          value={loginInputs[func].email}
          onChange={inputEmail}
        />
        <p>
          <label htmlFor="pwd">Password: </label>{" "}
        </p>
        <input
          type="password"
          placeholder="Password"
          id="pwd"
          value={loginInputs[func].pwd}
          onChange={inputPwd}
        />

        <p>
          <button>{title}</button>
        </p>
      </form>
    </div>
  );
  function inputChkbox() {
    setLoginInputs({
      signUp: { ...loginInputs.signUp, company: !loginInputs[func].company },
      logIn: { ...loginInputs.logIn },
    });
  }
  function inputEmail(e) {
    func == "signUp"
      ? setLoginInputs({
          signUp: { ...loginInputs.signUp, email: e.target.value },
          logIn: { ...loginInputs.logIn },
        })
      : setLoginInputs({
          signUp: { ...loginInputs.signUp },
          logIn: { ...loginInputs.logIn, email: e.target.value },
        });
  }
  function inputPwd(e) {
    func == "signUp"
      ? setLoginInputs({
          signUp: { ...loginInputs.signUp, pwd: e.target.value },
          logIn: { ...loginInputs.logIn },
        })
      : setLoginInputs({
          signUp: { ...loginInputs.signUp },
          logIn: { ...loginInputs.logIn, pwd: e.target.value },
        });
  }
  function inputUsername(e) {
    setLoginInputs({
      signUp: { ...loginInputs.signUp, userName: e.target.value },
      logIn: { ...loginInputs.logIn },
    });
  }

  function submit(e, func) {
    e.preventDefault();
    let role = loginInputs.signUp.company ? "company" : "user";

    func == "signUp"
      ? registerService(loginInputs.signUp).then((res) =>
          res.localId
            ? saveUserToFirebase(
                loginInputs.signUp.userName,
                res.localId,
                res.email,
                loginInputs.signUp.company,
                role
              )
                .then((res) => setLoggedIn(res))
                .then((res) => setLoginInputs(basicForm))
            : alert("Nem sikerult a mentes!")
        )
      : loginService(loginInputs.logIn.email, loginInputs.logIn.pwd)
          .then((res) => getUserInfo(res.localId))
          .then((res) => setLoggedIn(res))
          .then((res) => {
            return navigate("/account");
          });
  }
};

export default Forms;
