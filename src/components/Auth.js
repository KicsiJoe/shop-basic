import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext.js";
import { Navigate } from "react-router-dom";

export function AuthAdmin(props) {
  const { loggedIn } = useContext(AuthContext);
  if (loggedIn.role != "admin") return <Navigate to="/" />;
  return props.children;
}
export function AuthAnonym(props) {
  const { loggedIn } = useContext(AuthContext);
  if (!loggedIn.role) return <Navigate to="/" />;
  return props.children;
}

