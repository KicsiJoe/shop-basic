import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext.js";
import { Navigate } from "react-router-dom";

export function Auth(props) {
  const { loggedIn } = useContext(AuthContext);
  if (!loggedIn.userName) return <Navigate to="/" />;
  return props.children;
}
export function AuthAdmin(props) {
  const { loggedIn } = useContext(AuthContext);
  if (loggedIn.role != "admin") return <Navigate to="/" />;
  return props.children;
}

