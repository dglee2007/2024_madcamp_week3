// src/components/MainMenu.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

import '../styles/MainMenu.css';
import stockIllustration from '../assets/stock_illustration.png';
import profilePic from '../assets/profile-pic.jpg';

const MainMenu = () => {
  const navigate = useNavigate();
  const { user, logout, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/');
    }
  }, [user, loading, navigate]);

  const handleStartGame = async () => {
    try {
      navigate('/game');
    } catch (error) {
      console.error('게임 시작 중 오류 발생:', error);
      alert('게임을 시작하는 데 실패했습니다.');
    }
  };

  const handleLogoClick = () => {
    navigate('/main');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null; // 로딩 중이 아니고 사용자 정보가 없으면 아무것도 렌더링하지 않음
  }

  return (
    <div className="main-menu">
      <header className="header">
        <h1 onClick={handleLogoClick} style={{ cursor: 'pointer' }}>MadStocks</h1>
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
};

export default MainMenu;
