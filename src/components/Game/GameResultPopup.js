// components/Game/GameResultPopup.js

import React from 'react';
import './GameResultPopup.css';

function GameResultPopup({ finalBalance, startBalance, onRestart, onMainMenu }) {
  const profitRate = startBalance !== 0 
    ? ((finalBalance - startBalance) / startBalance * 100).toFixed(2)
    : '0.00';

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Game Over</h2>
        <p>Final Balance: ${finalBalance.toFixed(2)}</p>
        <p>Total Profit Rate: {profitRate}%</p>
        <div className="button-container">
          <button onClick={onMainMenu}>Main Menu</button>
          <button onClick={onRestart}>Play Again</button>
        </div>
      </div>
    </div>
  );
}

export default GameResultPopup;