// src/components/Auth/LoginPageWrapper.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import profilePic from '../../assets/profile-pic.jpg';
import stockIllustration from '../../assets/stock_illustration.png';
import Login from './Login';  
import Register from './Register';  
import '../../styles/LoginPageWrapper.css';

function LoginPageWrapper({ isLogin }) {
  const navigate = useNavigate();

  return (
    <div className="login-page-wrapper">
      <header className="header">
        <div className="logo">Madstocks</div>
        <div className="welcome">Hello User</div>
        <div className="profile">
          <img src={profilePic} alt="Profile" />
        </div>
      </header>
      <main className="main-content">
        <img src={stockIllustration} alt="Stock Illustration" className="main-image" />
        {isLogin ? <Login /> : <Register />}
        <button className="back-button" onClick={() => navigate('/')}>Back to Main</button>
      </main>
    </div>
  );
}

export default LoginPageWrapper;
