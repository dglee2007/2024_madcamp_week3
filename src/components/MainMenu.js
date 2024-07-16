import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // useAuth 훅을 올바르게 가져옴

import '../styles/MainMenu.css';  // 상대 경로로 CSS 파일 참조
import stockIllustration from '../assets/stock_illustration.png';
import profilePic from '../assets/profile-pic.jpg';

function MainMenu() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    // user 객체가 없으면 로그인 페이지로 리디렉션
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleStartGame = async () => {
    try {
      // 게임 시작하기
      navigate('/game');
    } catch (error) {
      console.error('게임 시작 중 오류 발생:', error);
      alert('게임을 시작하는 데 실패했습니다.');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) {
    return <div>Loading...</div>; // user 객체가 로드될 때까지 로딩 상태를 표시
  }

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

export default MainMenu;
