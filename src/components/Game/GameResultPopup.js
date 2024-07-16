import React from 'react';

function GameResultPopup({ onClose, onPlayAgain, finalBalance, startBalance }) {
  const profitRate = ((finalBalance - startBalance) / startBalance * 100).toFixed(2);

  return (
    <div className="popup game-result-popup">
      <div className="popup-content">
        <h2>Game Over</h2>
        <p>Your final balance: ${finalBalance.toFixed(2)}</p>
        <p>Profit rate: {profitRate}%</p>
        <button onClick={onPlayAgain}>Play Again</button>
        <button onClick={onClose}>Back to Main Menu</button>
      </div>
    </div>
  );
}

export default GameResultPopup;