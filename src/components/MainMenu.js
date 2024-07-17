// src/components/MainMenu.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/MainMenu.css';
import stockIllustration from '../assets/stock_illustration.png';
import profilePic from '../assets/profile-pic.jpg'; // profilePic import 추가

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
      const userId = localStorage.getItem('userId'); // userId 가져오기
      if (userId) {
        navigate('/game');
      } else {
        console.error('User ID not found');
        alert('유효한 사용자 ID가 없습니다.');
      }
    } catch (error) {
      console.error('게임 시작 중 오류 발생:', error);
      alert('게임을 시작하는 데 실패했습니다.');
    }
  };

  const handleLogoClick = () => {
    navigate('/main');
  };

  const handleProfileClick = () => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      navigate(`/profile/${userId}`);
    } else {
      console.error('User ID not found');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="main-menu">
      <header className="header">
        <h1 onClick={handleLogoClick} style={{ cursor: 'pointer' }}>MadStocks</h1>
        <div className="welcome">Hello {user.username}</div>
        <div className="profile" onClick={handleProfileClick} style={{ cursor: 'pointer' }}>
          <img src={profilePic} alt="Profile" />
        </div>
      </header>
      <main className="main-content">
        <img src={stockIllustration} alt="Stock Illustration" className="main-image" />
        <button className="play-button" onClick={handleStartGame}>Play</button>
      </main>
      <div className="sidebar">
        <button className="sidebar-button" onClick={() => navigate('/how-to-play')}>How to Play</button>
        <button className="sidebar-button" onClick={() => navigate('/ranking')}>Ranking</button>
        <button className="sidebar-button logout-button" onClick={logout}>Logout</button>
      </div>
    </div>
  );
};

export default MainMenu;
