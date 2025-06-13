import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../AuthContext/AuthContext";
import AuthCheckingComponent from "../Alert/AuthCheckingComponent";

const AuthRoute = ({ children }) => {
  const location = useLocation();
  const { isAuthenticated, isLoading, isError } = useAuth();
  if (isLoading) {
    console.log("AuthCheck loading");
    
    return <AuthCheckingComponent />;
  }
  if (isError) {
    console.log("AuthCheck err failed");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  if (isAuthenticated === false) {
    console.log("AuthCheck failed");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  return children;
};

export default AuthRoute;
