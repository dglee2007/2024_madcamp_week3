// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Navigate, Routes } from 'react-router-dom';
import LoginPage from './LoginPage';
import MainPage from './MainPage';
//import SignupPage from './SignupPage';
import Dashboard from './Dashboard';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/dashboard" /> : <LoginPage onLogin={handleLogin} />}
        />
        <Route
          path="/main"
          element={isLoggedIn ? <MainPage /> : <Navigate to="/login" />} 
          />
        <Route
          path="/dashboard"
          element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
