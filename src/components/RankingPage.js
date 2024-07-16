// src/components/RankingPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import RankingList from './Ranking/RankingList';
import '../styles/RankingPage.css';
import profilePic from '../assets/profile-pic.jpg';

const RankingPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

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

  if (!user) {
    return null;
  }

  return (
    <div className="ranking-page">
      <header className="header">
        <h1 onClick={handleLogoClick} style={{ cursor: 'pointer' }}>MadStocks</h1>
        <div className="welcome">Hello {user.username}</div>
        <div className="profile" onClick={handleProfileClick} style={{ cursor: 'pointer' }}>
          <img src={profilePic} alt="Profile" />
        </div>
      </header>
      <main className="main-content">
        <h2>Ranking</h2>
        <RankingList />
      </main>
      <div className="sidebar">
        <button className="sidebar-button" onClick={() => navigate('/main')}>Back to Main Menu</button>
      </div>
    </div>
  );
};

export default RankingPage;