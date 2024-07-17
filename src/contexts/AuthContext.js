// src/contexts/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import api, { refreshAccessToken } from '../services/api';

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
          api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
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
    localStorage.setItem('accessToken', userData.accessToken);
    localStorage.setItem('refreshToken', userData.refreshToken);
    localStorage.setItem('userId', userData.userId); // userId 저장 추가
    localStorage.setItem('username', userData.username); // username 저장 추가
    api.defaults.headers.common['Authorization'] = `Bearer ${userData.accessToken}`;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userId'); // userId 제거 추가
    localStorage.removeItem('username'); // username 제거 추가
    delete api.defaults.headers.common['Authorization'];
  };

  const value = {
    user,
    login,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
