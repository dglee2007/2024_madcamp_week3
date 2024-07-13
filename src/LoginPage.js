// src/LoginPage.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function LoginPage({ onLogin }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://c6a7-2001-e60-a304-f1d8-31e9-2309-d13b-595.ngrok-free.app/api/auth/login', { username, password });
      /*const res = await axios.post('http://localhost:3000/api/users/login', { username, password });*/
      
      localStorage.setItem('token', res.data.token);
      onLogin();
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
      alert('Login failed');
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
