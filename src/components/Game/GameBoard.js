import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { GameContext } from '../../contexts/GameContext';
import CompanyIcons from './CompanyIcons';
import StockTable from './StockTable';
import PortfolioTable from './PortfolioTable';
import TradeButtons from './TradeButtons';
import NewsModal from './NewsModal';
import StockChangeModal from './StockChangeModal';
import GameResultModal from './GameResultModal';
import api from '../../services/api';

function GameBoard() {
  const { gameState, setGameState } = useContext(GameContext);
  const [showNewsModal, setShowNewsModal] = useState(false);
  const [showStockChangeModal, setShowStockChangeModal] = useState(false);
  const [showGameResultModal, setShowGameResultModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    startGame();
  }, []);

  const startGame = async () => {
    try {
      const userId = localStorage.getItem('userId'); // localStorage에서 userId를 가져옴
      console.log('Starting game with userId:', userId);
      
      if (!userId) {
        console.error('No userId found. Please login again.');
        // 여기서 로그인 페이지로 리다이렉트하는 로직을 추가할 수 있습니다.
        return;
      }

      const response = await api.post('/game/start-game', { userId });
      console.log('Game start response:', response.data);
      
      setGameState(prevState => ({ 
        ...prevState, 
        userId,
        sessionId: response.data.sessionId,
        companies: response.data.companies
      }));
    } catch (error) {
      console.error('Failed to start game:', error.response ? error.response.data : error.message);
    }
  };

  const handleEndTurn = async () => {
    try {
      const response = await api.post(`/game/end-turn/${gameState.sessionId}`);
      setGameState(prevState => ({ ...prevState, ...response.data }));
      setShowStockChangeModal(true);
      if (response.data.nextYear > 2023) {
        setShowGameResultModal(true);
      }
    } catch (error) {
      console.error('Failed to end turn:', error);
    }
  };

  const handleTrade = async (action, companyId, amount) => {
    try {
      const response = await api.post('/game/trade', {
        sessionId: gameState.sessionId,
        companyId,
        amount,
        action
      });
      setGameState(prevState => ({ ...prevState, ...response.data }));
    } catch (error) {
      console.error('Trade failed:', error);
    }
  };

  const handleNewsClick = (companyId) => {
    setSelectedCompany(companyId);
    setShowNewsModal(true);
  };

  const handleGameEnd = () => {
    navigate('/main');
  };

  if (!gameState.sessionId) {
    return <div>Loading...</div>;
  }

  return (
    <div className="game-board">
      <CompanyIcons companies={gameState.companies} onIconClick={handleNewsClick} />
      <StockTable stocks={gameState.companies} />
      <PortfolioTable portfolio={gameState.investments} />
      <TradeButtons onTrade={handleTrade} />
      <button onClick={handleEndTurn}>다음 턴</button>
      {showNewsModal && (
        <NewsModal 
          onClose={() => setShowNewsModal(false)} 
          sessionId={gameState.sessionId}
          companyId={selectedCompany}
        />
      )}
      {showStockChangeModal && (
        <StockChangeModal 
          onClose={() => setShowStockChangeModal(false)}
          stockChanges={gameState.stockChanges}
        />
      )}
      {showGameResultModal && (
        <GameResultModal 
          onClose={handleGameEnd}
          finalBalance={gameState.currentBalance}
        />
      )}
    </div>
  );
}

export default GameBoard;