import { Navigate } from "react-router-dom";
import { useContext } from "react";
import SharedContext from "./pages/user_pages/components/SharedContext";

export const AuthenticatedRoute = ({ children }) => {
  const ctx = useContext(SharedContext);
  if (ctx.user) {
    return children;
  }
  if (!ctx.loading) {
    return <Navigate to="/Login" replace />;
  }
};
