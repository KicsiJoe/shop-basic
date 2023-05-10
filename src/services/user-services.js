
import { getUserInfoFirebase, loginUserFirebase, registerUserToFirebase } from "../repositories/authentication";
import { getProducts } from "../repositories/getProduct";
import { saveNewUserToFirebase } from "../repositories/registration";

export const saveUserToFirebase = (userName, localId, email,company, role) => {
  return saveNewUserToFirebase(userName, localId, email,company, role);
};

export const registerService = (loginInputs) => {
  return registerUserToFirebase(loginInputs);
};
export const loginService = (email, pwd) => {
  return loginUserFirebase(email, pwd);
};

export const getUserInfo=(localId)=>{
 return getUserInfoFirebase(localId)
}

export const getProduct=(text)=>{
  //ha itt text = "all", akkor az osszes prroductot lekeri, ha "id", akkor csak egyet
  return getProducts(text)
}



