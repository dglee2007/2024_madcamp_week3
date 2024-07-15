import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import CompanyList from '../components/Game/CompanyList';
import InvestmentInfo from '../components/Game/InvestmentInfo';
import PlayerInfo from '../components/Game/PlayerInfo';
import { getGameState } from '../services/api';

function GameDashboard() {
  const location = useLocation();
  const [gameState, setGameState] = useState(location.state?.gameState);
  const [sessionId, setSessionId] = useState(location.state?.gameState?.session?.session_id);

  useEffect(() => {
    if (sessionId) {
      const fetchGameState = async () => {
        try {
          const newGameState = await getGameState(sessionId);
          setGameState(newGameState);
        } catch (error) {
          console.error('게임 상태를 불러오는 중 오류 발생:', error);
        }
      };

      fetchGameState(); // 초기 로드

      const intervalId = setInterval(fetchGameState, 5000); // 5초마다 업데이트

      return () => clearInterval(intervalId); // 컴포넌트 언마운트 시 인터벌 제거
    }
  }, [sessionId]);

  if (!gameState) {
    return <div>게임 상태를 불러오는 중...</div>;
  }

  return (
    <div>
      <h1>게임 대시보드</h1>
      <PlayerInfo session={gameState.session} />
      <CompanyList companies={gameState.companies} />
      <InvestmentInfo investments={gameState.investments} />
    </div>
  );
}

export default GameDashboard;