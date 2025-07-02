import React from 'react';
import { Navigate } from 'react-router-dom';

const parseJwt = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
};

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('access_token');

  if (!token) {
    return <Navigate to="/" />; 
  }

  const payload = parseJwt(token);

  if (!payload || payload.exp * 1000 < Date.now()) {
    localStorage.removeItem('access_token');
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;

