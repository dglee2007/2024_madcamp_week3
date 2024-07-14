// src/MainPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function MainPage() {
  const navigate = useNavigate();

  const handlePlayClick = async () => {
    const userId = parseInt(localStorage.getItem('userId'), 10); // userId를 정수로 변환
    try {
      const response = await fetch('https://25c7-118-235-90-93.ngrok-free.app/api/game/start-game', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify({ userId }),
      });
      const data = await response.json();
      if (data.sessionId && data.companies) {
        console.log('게임 시작:', data.message);
        localStorage.setItem('sessionId', data.sessionId);
        displayCompanies(data.companies); // 회사 정보를 게임 화면에 표시
        navigate('/dashboard');
      } else {
        console.error('게임 시작 실패:', data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const displayCompanies = (companies) => {
    console.log('Selected Companies:', companies);
  };

  return (
    <div>
      <h1>Welcome to the Main Page</h1>
      <button onClick={() => alert('How to play instructions...')}>How to play</button>
      <button onClick={handlePlayClick}>Play</button>
    </div>
  );
}

export default MainPage;
