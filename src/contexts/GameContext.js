// src/contexts/GameContext.js
import React, { createContext, useState } from 'react';

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [gameState, setGameState] = useState({
    sessionId: null,
    userId: null,
    companies: [],
    investments: [],
    balance: 1000000,
    currentYear: 2014,
  });

  return (
    <GameContext.Provider value={{ gameState, setGameState }}>
      {children}
    </GameContext.Provider>
  );
};