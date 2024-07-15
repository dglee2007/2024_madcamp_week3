// components/Game/Gameinfo.js
import React from 'react';

function GameInfo({ gameData }) {
  return (
    <div>
      <h2>게임 정보</h2>
      <p>{gameData.message}</p>
      <p>세션 ID: {gameData.sessionId}</p>
      <h3>회사 목록:</h3>
      <ul>
        {gameData.companies.map(company => (
          <li key={company.id}>
            {company.name} - 가격: {company.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GameInfo;