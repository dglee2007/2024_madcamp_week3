import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // useNavigate를 import
import api from '../../services/api';
import '../../styles/Register.css';
import stockIllustration from '../../assets/stock_illustration.png';  // 이미지 파일 임포트
import profilePic from '../../assets/profile-pic.jpg';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    try {
      await api.post('/auth/register', { username, password });
      navigate('/');
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed. Please try again.');
    }
  };

  const handleBackToLogin = () => {
    navigate('/');
  };

  return (
    <div className="register-page">
      <header className="header">
        <div className="logo">Madstocks</div>
        <div className="welcome">Hello User</div>
        <div className="profile">
          <img src={profilePic} alt="Profile" />
        </div>
      </header>
      <main className="main-content">
      <img src={stockIllustration} alt="Stock Illustration" className="main-image" />
      <div className="register-container">
          <h2>Let's Get Started!</h2>
          <form onSubmit={handleRegister}>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              required
            />
            <button type="submit" className="register-button">Sign Up</button>
          </form>
          <button className="back-to-main-button" onClick={handleBackToLogin}>Back to Main</button>
        </div>
      </main>
    </div>
  );
}

export default Register;