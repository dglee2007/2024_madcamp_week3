// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { GameProvider } from './contexts/GameContext';
import MainMenu from './components/MainMenu';
import GameBoard from './components/Game/GameBoard';
import UserProfile from './components/Profile/UserProfile';
import RankingList from './components/Ranking/RankingList';
import GameInstructions from './components/GameInstructions';
import LoginPageWrapper from './components/Auth/LoginPageWrapper';
import RankingPage from './components/RankingPage'


function App() {
  return (
    <AuthProvider>
      <GameProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LoginPageWrapper isLogin={true} />} />
            <Route path="/register" element={<LoginPageWrapper isLogin={false} />} />
            <Route path="/main" element={<MainMenu />} />
            <Route path="/game" element={<GameBoard />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/ranking" element={<RankingList />} />
            <Route path="/how-to-play" element={<GameInstructions />} />
            <Route path="/profile/:userId" element={<UserProfile />} />
            <Route path="/ranking" element={<RankingPage />} />


          </Routes>
        </Router>
      </GameProvider>
    </AuthProvider>
  );
}

export default App;
