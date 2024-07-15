import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MainPage from './pages/MainPage';
import GamePage from './pages/GamePage';
import ProfilePage from './pages/ProfilePage';
import RankingPage from './pages/RankingPage';
import GameDashboard from './pages/GameDashboard';

import { AuthProvider, useAuth } from './contexts/AuthContext';

function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  return user ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<PrivateRoute><Navigate to="/main" /></PrivateRoute>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/main" element={<PrivateRoute><MainPage /></PrivateRoute>} />
          <Route path="/game-dashboard" element={<PrivateRoute><GameDashboard /></PrivateRoute>} />
          <Route path="/game" element={<PrivateRoute><GamePage /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
          <Route path="/ranking" element={<PrivateRoute><RankingPage /></PrivateRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
