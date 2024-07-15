import React from 'react';
import { useNavigate } from 'react-router-dom';  // useNavigate를 import

function MainMenu() {
  const navigate = useNavigate();  // useNavigate 훅 사용

  const handleStartGame = () => {
    navigate('/game');  // navigate 대신 navigate 사용
  };

  return (
    <div>
      <h1>Main Menu</h1>
      <button onClick={handleStartGame}>Start Game</button>
      <button onClick={() => navigate('/profile')}>My Profile</button>
      <button onClick={() => navigate('/ranking')}>Rankings</button>
      <button onClick={() => navigate('/instructions')}>How to Play</button>
    </div>
  );
}

export default MainMenu;