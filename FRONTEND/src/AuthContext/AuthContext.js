import { createContext, useContext, useEffect, useState } from "react";
import { checkUserAuthStatusAPI } from "../apis/user/usersAPI";
import { useQuery } from "@tanstack/react-query";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  //Make request using react query
  const { isError, isLoading, data, isSuccess } = useQuery({
    queryFn: checkUserAuthStatusAPI,
    queryKey: ["checkAuth"],
  });
  
  console.log("check api:" ,checkUserAuthStatusAPI);
  

  console.log("check data: ", data);
  
  //update the authenticated user
  useEffect(() => {
    if (isSuccess && typeof data.isAuthenticated == "boolean") {
      setIsAuthenticated(data.isAuthenticated);
      console.log("isAuthenticated: " ,isAuthenticated);
      
    }
  }, [data, isSuccess]);

  //Update the user auth after login
  const login = () => {
    console.log("login function called");
    
    setIsAuthenticated(true);
  };
  //Update the user auth after login
  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isError, isLoading, isSuccess, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

//Custom hook
export const useAuth = () => {
  return useContext(AuthContext);
};
