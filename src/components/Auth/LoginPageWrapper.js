import React from 'react';
import { useNavigate } from 'react-router-dom';
import profilePic from '../../assets/profile-pic.jpg';
import stockIllustration from '../../assets/stock_illustration.png';
import Login from './Login';  // Login 컴포넌트를 import
import '../../styles/LoginPageWrapper.css';  // LoginPageWrapper.css 파일 import

function LoginPageWrapper() {
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
        <Login />
        <button className="back-button" onClick={() => navigate('/')}>Back to Main</button>
      </main>
    </div>
  );
}

export default LoginPageWrapper;
