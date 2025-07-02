// src/contexts/AuthContext.js
import React, { createContext, useState, useEffect } from "react";

// Função para decodificar JWT com validação de expiração
function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    const payload = JSON.parse(jsonPayload);

    // Verifica se o token expirou
    const currentTime = Math.floor(Date.now() / 1000); // em segundos
    if (payload.exp && payload.exp < currentTime) {
      console.warn("Token expirado");
      return null;
    }

    return payload;
  } catch (e) {
    console.error("Erro ao decodificar o token:", e);
    return null;
  }
}

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const storedToken = localStorage.getItem("token");
  const [token, setToken] = useState(storedToken);
  const [user, setUser] = useState(() => {
    return storedToken ? parseJwt(storedToken) : null;
  });

  useEffect(() => {
    if (token) {
      const decodedUser = parseJwt(token);
      if (decodedUser) {
        localStorage.setItem("token", token);
        setUser(decodedUser);
      } else {
        // Token inválido ou expirado
        setToken(null);
        localStorage.removeItem("token");
        setUser(null);
      }
    } else {
      localStorage.removeItem("token");
      setUser(null);
    }
  }, [token]);

  const login = (newToken) => {
    const decoded = parseJwt(newToken);
    if (decoded) {
      setToken(newToken);
    } else {
      console.warn("Token inválido ou expirado no login.");
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
    window.location.href = "/"; // Redireciona para a home
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

