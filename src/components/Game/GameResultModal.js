// GameResultModal.js
import React from 'react';

function GameResultModal({ onClose, finalBalance }) {
  return (
    <div className="game-result-modal">
      <h2>게임 종료</h2>
      <p>최종 잔액: ${finalBalance.toFixed(2)}</p>
      <button onClick={onClose}>닫기</button>
    </div>
  );
}

export default GameResultModal;