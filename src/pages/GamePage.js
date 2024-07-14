import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import GameBoard from '../components/Game/GameBoard';
import { getGameState } from '../services/api';

const GamePage = () => {
  const { sessionId } = useParams();
  const [gameState, setGameState] = useState(null);

  useEffect(() => {
    const fetchGameState = async () => {
      try {
        const response = await getGameState(sessionId);
        setGameState(response.data);
      } catch (error) {
        console.error('Failed to fetch game state:', error);
      }
    };

    fetchGameState();
  }, [sessionId]);

  if (!gameState) return <div>Loading...</div>;

  return <GameBoard gameState={gameState} sessionId={sessionId} />;
};

export default GamePage;