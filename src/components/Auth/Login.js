import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { GameContext } from '../../contexts/GameContext';  // GameContext를 import
import api from '../../services/api';
import '../../styles/Login.css';  // CSS 파일 import


function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useContext(AuthContext);
  const { setGameState } = useContext(GameContext);  // GameContext에서 setGameState를 가져옴=
  
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', { username, password });
      const userData = response.data;
      setUser(userData);
      localStorage.setItem('token', userData.token);
      localStorage.setItem('userId', userData.userId); // userId를 localStorage에 저장
      setGameState(prevState => ({ ...prevState, userId: userData.userId }));
      navigate('/main');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="login-container">
      <h2>Let's Get Started!</h2>
      <form onSubmit={handleLogin}>
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
        <button type="submit" className="login-button">Log In</button>
        <button type="button" className="signup-button">Sign Up</button>
      </form>
    </div>
  );
}

export default Login;