import { createContext, useContext, useState } from "react";
import { AUTH_URL } from "../features/user/authSlice";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(() =>
    localStorage.getItem("authToken")
  );

  const register = async ({ email, password, userName }) => {
    try {
      const res = await axios.post(`${AUTH_URL}/register`, {
        email,
        password,
        name: userName,
      });
      const token = res.data.token;
      setAuthToken(token);
      localStorage.setItem("authToken", token);
      window.location.href = "/";
    } catch (err) {

      alert(err?.response?.data?.message);
      console.error(err);
    }
  };

  const login = async (email, password) => {
    try {
      const res = await axios.post(`${AUTH_URL}/login`, {
        email,
        password,
      });
      const token = res.data.token;
      setAuthToken(token);
      localStorage.setItem("authToken", token);
      window.location.href = "/";
    } catch (err) {
      
      alert(err?.response?.data?.message);
      console.error(err);
    }
  };

  const logout = () => {
    setAuthToken(null);
    localStorage.removeItem("authToken");
  };

  const isAuthenticated = !!authToken;

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
