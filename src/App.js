// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { GameProvider } from './contexts/GameContext';  // GameProvider를 import
//import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import MainMenu from './components/MainMenu';
import GameBoard from './components/Game/GameBoard';
import UserProfile from './components/Profile/UserProfile';
import RankingList from './components/Ranking/RankingList';
import GameInstructions from './components/GameInstructions';
import LoginPageWrapper from './components/Auth/LoginPageWrapper'; // LoginPageWrapper 컴포넌트 추가


function App() {
  return (
    <AuthProvider>
      <GameProvider>  {/* GameProvider로 감싸기 */}
        <Router>
          <Routes>
            <Route path="/" element={<LoginPageWrapper isLogin={true} />} /> {/* 로그인 경로 추가 */}
            <Route path="/register" element={<Register isLogin={false} />} /> {/* 회원가입 경로 추가 */}
            <Route path="/main" element={<MainMenu />} />
            <Route path="/game" element={<GameBoard />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/ranking" element={<RankingList />} />
            <Route path="/how-to-play" element={<GameInstructions />} />
          </Routes>
        </Router>
      </GameProvider>
    </AuthProvider>
  );
}

export default App;