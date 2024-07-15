import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import GameBoard from '../components/Game/GameBoard';
import { getGameState } from '../services/api';

const GamePage = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const [gameState, setGameState] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchGameState = useCallback(async () => {
    if (!sessionId) {
      setError('Invalid session ID');
      return;
    }

    try {
      setIsLoading(true);
      const response = await getGameState(sessionId);
      const newGameState = response.data;
      setGameState(newGameState);
      localStorage.setItem(`gameState_${sessionId}`, JSON.stringify(newGameState));
      setError(null);
    } catch (error) {
      console.error('Failed to fetch game state:', error);
      setError('Failed to load game state. Using cached data if available.');
      const cachedGameState = localStorage.getItem(`gameState_${sessionId}`);
      if (cachedGameState) {
        setGameState(JSON.parse(cachedGameState));
      }
    } finally {
      setIsLoading(false);
    }
  }, [sessionId]);

  useEffect(() => {
    fetchGameState();
  }, [fetchGameState]);

  if (isLoading) {
    return <div>Loading game state...</div>;
  }

  if (error && !gameState) {
    return (
      <div>
        <p>{error}</p>
        <button onClick={fetchGameState}>Retry</button>
        <button onClick={() => navigate('/')}>Return to Home</button>
      </div>
    );
  }

  return <GameBoard gameState={gameState} sessionId={sessionId} onUpdateGameState={fetchGameState} />;
};

export default GamePage;