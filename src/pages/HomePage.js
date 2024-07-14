import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { startGame } from '../services/api';

const HomePage = () => {
  const { user } = useAuth();

  const handleStartGame = async () => {
    try {
      console.log('Current user:', user);
      if (!user || !user.id) {
        throw new Error('User not logged in or user ID not available');
      }
      const response = await startGame(user.id);
      console.log('Game started successfully:', response.data);
      // 게임 페이지로 이동 로직
    } catch (error) {
      console.error('Failed to start game:', error);
      alert('Failed to start game. Please try again.');
    }
  };

  return (
    <div>
      <h1>Stock Market Game</h1>
      <button onClick={handleStartGame}>Start Game</button>
      <Link to="/ranking">View Rankings</Link>
      <Link to="/profile">My Profile</Link>
      <Link to="/how-to-play">How to Play</Link>
    </div>
  );
};

export default HomePage;