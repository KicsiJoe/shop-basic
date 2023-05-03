import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext.js";
import { Navigate } from "react-router-dom";

export default function Auth(props) {
  const { loggedIn } = useContext(AuthContext);
  if (!loggedIn.userName) return <Navigate to="/" />;
  return props.children;
}
