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
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    startGame();
  }, []);

  const startGame = async () => {
    try {
      const userId = localStorage.getItem('userId');
      console.log('Starting game with userId:', userId);
      
      if (!userId) {
        console.error('No userId found. Please login again.');
        navigate('/login');
        return;
      }

      const response = await api.post('/game/start-game', { userId });
      console.log('Game start response:', response.data);
      
      setGameState(prevState => ({ 
        ...prevState, 
        userId,
        sessionId: response.data.sessionId,
        companies: response.data.companies,
        current_balance: parseFloat(response.data.start_balance),
        current_year: 2014 // 시작 연도 설정
      }));
    } catch (error) {
      console.error('Failed to start game:', error.response ? error.response.data : error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEndTurn = async () => {
    try {
      setIsLoading(true);
      const response = await api.post(`/game/end-turn/${gameState.sessionId}`);
      
      const stockChangesResponse = await api.get(`/game/stock-changes/${gameState.sessionId}`);
      const gameStateResponse = await api.get(`/game/game-state/${gameState.sessionId}`);
      
      setGameState(prevState => ({ 
        ...prevState, 
        current_year: response.data.nextYear,
        current_balance: parseFloat(response.data.newBalance),
        stockChanges: stockChangesResponse.data,
        companies: gameStateResponse.data.companies,
        investments: gameStateResponse.data.investments
      }));
      
      setShowStockChangeModal(true);
      if (response.data.nextYear > 2023) {
        setShowGameResultModal(true);
      }
    } catch (error) {
      console.error('Failed to end turn:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTrade = async (action, companyId, amount) => {
    try {
      setIsLoading(true);
      const response = await api.post('/game/trade', {
        sessionId: gameState.sessionId,
        companyId,
        amount,
        action
      });

      setGameState(prevState => ({ 
        ...prevState, 
        investments: response.data.investments,
        current_balance: parseFloat(response.data.session.current_balance)
      }));
    } catch (error) {
      console.error('Trade failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewsClick = (companyId) => {
    setSelectedCompany(companyId);
    setShowNewsModal(true);
  };

  const handleGameEnd = () => {
    navigate('/main');
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="game-board">
      <div className="header">
        <h2>Current Balance: ${gameState.current_balance.toFixed(2)}</h2>
        <h3>Current Year: {gameState.current_year}</h3>
      </div>
      <CompanyIcons companies={gameState.companies || []} onIconClick={handleNewsClick} />
      <StockTable stocks={gameState.companies || []} />
      <PortfolioTable portfolio={gameState.investments || []} />
      <TradeButtons onTrade={handleTrade} companies={gameState.companies || []} />
      <button onClick={handleEndTurn} disabled={isLoading}>다음 턴</button>
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
          stockChanges={gameState.stockChanges || []}
        />
      )}
      {showGameResultModal && (
        <GameResultModal 
          onClose={handleGameEnd}
          finalBalance={gameState.current_balance}
        />
      )}
    </div>
  );
}

export default GameBoard;