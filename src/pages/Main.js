import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Main() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div>
      <h1>메인 화면</h1>
      <p>환영합니다, {user.username}님!</p>
      <button onClick={() => navigate('/game')}>게임 시작</button>
      <button onClick={() => navigate('/profile')}>프로필</button>
      <button onClick={() => navigate('/ranking')}>랭킹</button>
      <button onClick={logout}>로그아웃</button>
    </div>
  );
}

export default Main;