import { getUserInfoFirebase, loginUserFirebase, registerUserToFirebase } from "../repositories/authentication";
import { saveNewUserToFirebase } from "../repositories/registration";

export const saveUserToFirebase = (userName, localId, email) => {
  return saveNewUserToFirebase(userName, localId, email);
};

export const registerUser = (loginInputs) => {
  return registerUserToFirebase(loginInputs);
};
export const loginUserService = (email, pwd) => {
  return loginUserFirebase(email, pwd);
};

export const getUserInfo=(localId)=>{
 return getUserInfoFirebase(localId)
}



