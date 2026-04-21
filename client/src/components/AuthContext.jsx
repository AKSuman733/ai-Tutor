import { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });

  const login = () => {
    localStorage.setItem("isLoggedIn", "true"); // 2. Save to storage
    setIsLoggedIn(true);
  };
  const logout = () => {
    localStorage.removeItem("isLoggedIn"); // 3. Clear storage
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for easy access
export const useAuth = () => useContext(AuthContext);