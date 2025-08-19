import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const logout =()=>{
    setUser(null)
    localStorage.removeItem("user")
    navigate("/login")
  }

  useEffect(() => {
    if (!user) {
      if (location.pathname !== "/login" && location.pathname !== "/register") {
        navigate("/login")
      }
    }
  }, [user, navigate, location]);

  return (
    <UserContext.Provider value={{ user, setUser,logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
