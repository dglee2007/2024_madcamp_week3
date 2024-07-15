import React from 'react';
import { useNavigate } from 'react-router-dom';

function GameResultModal({ finalBalance }) {
  const navigate = useNavigate();

  return (
    <div className="game-result-modal">
      <h2>Game Over</h2>
      <p>Your final balance: ${finalBalance}</p>
      <button onClick={() => navigate('/main')}>Back to Main Menu</button>
    </div>
  );
}

export default GameResultModal;