import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { startGame, getGameState } from '../services/api';

function MainPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleStartGame = async () => {
    try {
      console.log('Starting game for user:', user); // 로그 추가
      const startGameData = await startGame(user.userId);
      console.log('Game started, sessionId:', startGameData.sessionId); // 로그 추가

      // 게임 상태 가져오기
      const gameStateData = await getGameState(startGameData.sessionId);
      console.log('Fetched game state:', gameStateData); // 로그 추가

      navigate('/game-dashboard', { state: { gameState: startGameData } });
    } catch (error) {
      console.error('게임 시작 중 오류 발생:', error);
      alert('게임을 시작하는 데 실패했습니다.');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div>
      <h1>주식 거래 게임 메인 페이지</h1>
      <p>환영합니다, {user.username}님!</p>
      <button onClick={handleStartGame}>게임 시작</button>
      <button onClick={handleLogout}>로그아웃</button>
    </div>
  );
}

export default MainPage;
