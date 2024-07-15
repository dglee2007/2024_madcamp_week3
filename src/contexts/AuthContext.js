import React, { createContext, useState, useContext, useEffect } from 'react';
import { refreshAccessToken } from '../services/api';

export const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const storedUser = localStorage.getItem('user');
      const refreshToken = localStorage.getItem('refreshToken');
      if (storedUser && refreshToken) {
        try {
          const { accessToken } = await refreshAccessToken(refreshToken);
          const userData = JSON.parse(storedUser);
          setUser({ ...userData, accessToken });
        } catch (error) {
          console.error('Failed to refresh token:', error);
          localStorage.removeItem('user');
          localStorage.removeItem('refreshToken');
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('refreshToken', userData.refreshToken);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('refreshToken');
  };

  const value = {
    user,
    login,
    logout,
    loading,
    setUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}