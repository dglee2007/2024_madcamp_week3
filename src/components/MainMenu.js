import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // useAuth 훅을 올바르게 가져옴
//import { startGame, getGameState } from '../services/api';
//import { startGame, getGameState } from './Game/GameBoard';

import '../styles/MainMenu.css';  // 상대 경로로 CSS 파일 참조
import stockIllustration from '../assets/stock_illustration.png';
import profilePic from '../assets/profile-pic.jpg';


function MainPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleStartGame = async () => {
    try {
      //console.log('Starting game for user:', user); // 로그 추가
      //const startGameData = await startGame(user.userId);
      //console.log('Game started, sessionId:', startGameData.sessionId); // 로그 추가

      // 게임 상태 가져오기
      //const gameStateData = await getGameState(startGameData.sessionId);
      //console.log('Fetched game state:', gameStateData); // 로그 추가

      //navigate('/game-dashboard', { state: { gameState: startGameData } });
      navigate('/game')
    } catch (error) {
      console.error('게임 시작 중 오류 발생:', error);
      alert('게임을 시작하는 데 실패했습니다.');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="main-page">
    <header className="header">
      <div className="logo">Madstocks</div>
      <div className="welcome">Hello {user.username}</div>
      <div className="profile">
        <img src={profilePic} alt="Profile" />
      </div>
    </header>
    <main className="main-content">
      <img src={stockIllustration} alt="Stock Illustration" className="main-image" />
      <button className="play-button" onClick={handleStartGame}>Play</button>
      <button className="logout-button" onClick={handleLogout}>Logout</button>
    </main>
    <div className="sidebar">
      <button className="sidebar-button" onClick={() => navigate('/how-to-play')}>How to Play</button>
      <button className="sidebar-button" onClick={() => navigate('/ranking')}>Ranking</button>
    </div>
  </div>
  );
}

export default MainPage;
