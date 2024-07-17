import React, { createContext, useState } from 'react';

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [gameState, setGameState] = useState({
    sessionId: null,
    userId: null,
    companies: [],
    investments: [],
    current_balance: 1000, // 초기 잔액 설정
    currentYear: 2014,
  });

  return (
    <GameContext.Provider value={{ gameState, setGameState }}>
      {children}
    </GameContext.Provider>
  );
};
