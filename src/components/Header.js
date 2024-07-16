// src/components/Header.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import profilePic from '../assets/profile-pic.jpg';

const Header = () => {
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

  return (
    <header className="header">
      <h1 onClick={handleLogoClick} style={{ cursor: 'pointer' }}>MadStocks</h1>
      <div className="welcome">Hello {user.username}</div>
      <div className="profile" onClick={handleProfileClick} style={{ cursor: 'pointer' }}>
        <img src={profilePic} alt="Profile" />
      </div>
    </header>
  );
};

export default Header;
