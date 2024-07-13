// src/MainPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function MainPage() {
  const navigate = useNavigate();

  const handlePlayClick = async () => {
    const userId = localStorage.getItem('userId');
    try {
      const response = await fetch('https://a794-2001-e60-a30d-f741-2145-eab9-5d7e-279.ngrok-free.app/start-game', {
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
