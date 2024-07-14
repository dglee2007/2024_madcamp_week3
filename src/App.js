import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import HomePage from './pages/HomePage'; // 정확한 파일 이름을 사용
import GamePage from './pages/GamePage';
import RankingPage from './pages/RankingPage';
import ProfilePage from './pages/ProfilePage';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>} />
          <Route path="/game/:sessionId" element={<PrivateRoute><GamePage /></PrivateRoute>} />
          <Route path="/ranking" element={<PrivateRoute><RankingPage /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;