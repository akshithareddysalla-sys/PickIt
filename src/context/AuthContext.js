import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Load user from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("pickit_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  function login(email) {
    const userData = { email };
    setUser(userData);
    localStorage.setItem("pickit_user", JSON.stringify(userData));
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("pickit_user");
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
