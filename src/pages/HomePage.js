import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { startGame } from '../services/api';

const HomePage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleStartGame = async () => {
    try {
      console.log('Starting game for user:', user);
      if (!user || !user.id) {
        console.error('User ID is missing');
        alert('User information is missing. Please log in again.');
        return;
      }
      const response = await startGame(user.id);
      console.log('Game started successfully:', response.data);
      
      if (response.data && response.data.sessionId) {
        console.log('Navigating to game page with sessionId:', response.data.sessionId);
        navigate(`/game/${response.data.sessionId}`);
      } else {
        console.error('No sessionId received from server');
        alert('Failed to start game. SessionId not received.');
      }
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
