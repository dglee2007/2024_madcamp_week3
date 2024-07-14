import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getGameState, endTurn } from '../../services/api';
import CompanyList from './CompanyList';
import Portfolio from './Portfolio';
import News from './News';

const GameBoard = () => {
  const { sessionId } = useParams();
  const [gameState, setGameState] = useState(null);

  useEffect(() => {
    fetchGameState();
  }, [sessionId]);

  const fetchGameState = async () => {
    try {
      const response = await getGameState(sessionId);
      setGameState(response.data);
    } catch (error) {
      console.error('Failed to fetch game state:', error);
    }
  };

  const handleEndTurn = async () => {
    try {
      await endTurn(sessionId);
      fetchGameState();
    } catch (error) {
      console.error('Failed to end turn:', error);
    }
  };

  if (!gameState) return <div>Loading...</div>;

  return (
    <div>
      <h2>Game Year: {gameState.session.current_year}</h2>
      <h3>Balance: ${gameState.session.current_balance.toFixed(2)}</h3>
      <CompanyList companies={gameState.companies} />
      <Portfolio investments={gameState.investments} />
      <News sessionId={sessionId} />
      <button onClick={handleEndTurn}>End Turn</button>
    </div>
  );
};

export default GameBoard;