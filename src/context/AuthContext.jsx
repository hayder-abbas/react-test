import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(
    localStorage.getItem("currentUserEmail")
      ? localStorage.getItem("currentUserEmail")
      : null,
  );

  function signUp(email, password) {
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    if (users.find((u) => u.email === email)) {
      return { success: false, error: "Email already exist!" };
    }

    const newUser = { email, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUserEmail", email);

    setUser({ email });

    return { success: true };
  }

  // Login
  function login(email, password) {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(
      (u) => u.email === email && u.password === password,
    );

    if (!user) {
      return { success: false, error: "Invalid email or password!" };
    }

    localStorage.setItem("currentUserEmail", email);
    setUser({ email });

    return { success: true };
  }

  // Log out
  function logout() {
    localStorage.removeItem("currentUserEmail");
    setUser(null);
    navigate("/auth");
  }

  return (
    <AuthContext.Provider value={{ signUp, logout, login, user }}>
      {children}
    </AuthContext.Provider>
  );
}
