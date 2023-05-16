import { Navigate } from "react-router-dom";

export const AuthenticatedRoute = ({ children }) => {
  if (localStorage.getItem("user")) {
    return children;
  }
  return <Navigate to="/Login" replace />;
};
