// src/LoginPage.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
//import axios from 'axios';

function LoginPage({ onLogin }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://25c7-118-235-90-93.ngrok-free.app/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (data.accessToken && data.refreshToken) {
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        localStorage.setItem('userId', data.userId); // userId를 올바르게 저장
        console.log('로그인 성공:', data.userId);
        onLogin();
        navigate('/main');
      } else {
        console.error('로그인 실패:', data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username: </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label>Password: </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Log In</button>
      <div>
        <Link to="/signup">Sign Up</Link>
      </div>
    </form>
  );
}

export default LoginPage;
