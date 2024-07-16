import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { GameContext } from '../../contexts/GameContext';
import CompanyIcons from './CompanyIcons';
import StockTable from './StockTable';
import PortfolioTable from './PortfolioTable';
import TradeForm from './TradeForm';
import NewsModal from './NewsModal';
import StockChangeModal from './StockChangeModal';
import GameResultModal from './GameResultModal';
import api from '../../services/api';
import './GameBoard.css';

function GameBoard() {
  const { gameState, setGameState } = useContext(GameContext);
  const [iconMapping, setIconMapping] = useState({});
  const [showNewsModal, setShowNewsModal] = useState(false);
  const [showStockChangeModal, setShowStockChangeModal] = useState(false);
  const [showGameResultModal, setShowGameResultModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [portfolio, setPortfolio] = useState([]);

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
      
      // 아이콘 매핑 생성
      const newIconMapping = {};
      response.data.companies.forEach((company, index) => {
        newIconMapping[company.company_id] = `company${index + 1}.png`;
      });
      setIconMapping(newIconMapping);

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
      console.log(`Ending turn for sessionId: ${gameState.sessionId}`);
      
      const endTurnResponse = await api.post(`/game/end-turn/${gameState.sessionId}`);
      console.log('End turn response:', endTurnResponse.data);
      
      const stockChangesResponse = await api.get(`/game/stock-changes/${gameState.sessionId}`);
      console.log('Stock changes response:', stockChangesResponse.data);
      
      const gameStateResponse = await api.get(`/game/game-state/${gameState.sessionId}`);
      console.log('Game state response:', gameStateResponse.data);
      
      setGameState(prevState => ({ 
        ...prevState, 
        current_year: endTurnResponse.data.nextYear,
        current_balance: parseFloat(endTurnResponse.data.newBalance),
        stockChanges: stockChangesResponse.data,
        companies: gameStateResponse.data.companies || [],
        investments: gameStateResponse.data.investments || []
      }));

      // 아이콘 매핑 업데이트
      const newIconMapping = {};
      gameStateResponse.data.companies.forEach((company, index) => {
        newIconMapping[company.company_id] = `company${index + 1}.png`;
      });
      setIconMapping(newIconMapping);

      setShowStockChangeModal(true);
      if (endTurnResponse.data.nextYear > 2023) {
        setShowGameResultModal(true);
      }
    } catch (error) {
      console.error('Failed to end turn:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPortfolio = async () => {
    try {
      const portfolioResponse = await api.get(`/game/portfolio/${gameState.sessionId}`);
      const portfolioData = portfolioResponse.data;
  
      // 현재 회사 정보와 주가를 가져오기
      const gameStateResponse = await api.get(`/game/game-state/${gameState.sessionId}`);
      const companies = gameStateResponse.data.companies;
  
      // 포트폴리오 정보 업데이트
      const updatedPortfolio = portfolioData.map(item => {
        const company = companies.find(c => c.company_id === item.company_id);
        return {
          ...item,
          current_price: company ? parseFloat(company.price) : 0
        };
      });
  
      setPortfolio(updatedPortfolio);
      setGameState(prevState => ({
        ...prevState,
        companies: companies.map(company => ({
          ...prevState.companies.find(c => c.company_id === company.company_id),
          ...company
        }))
      }));
  
      console.log('Updated portfolio:', updatedPortfolio);
      console.log('Updated companies:', companies);
    } catch (error) {
      console.error('Failed to fetch portfolio:', error);
    }
  };

  const handleTrade = async (action, companyId, amount) => {
    try {
      setIsLoading(true);
      console.log(`Trading: action=${action}, companyId=${companyId}, amount=${amount}, sessionId=${gameState.sessionId}`);
      const response = await api.post('/game/trade', {
        sessionId: gameState.sessionId,
        companyId: companyId,
        amount,
        action
      });
      
      console.log('Trade response:', response.data);
  
      setGameState(prevState => ({
        ...prevState,
        current_balance: parseFloat(response.data.session.current_balance)
      }));
      
      await fetchPortfolio();  // 여기에 fetchPortfolio 호출 추가
    } catch (error) {
      console.error('Trade failed:', error.response ? error.response.data : error.message);
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
        <h1>Madstocks</h1>
        <h2>Hello User</h2>
        <h3>Current Balance: ${gameState.current_balance.toFixed(2)}</h3>
        <h3>Current Year: {gameState.current_year}</h3>
      </div>
      <div className="main-content">
        <div className="left-section">
          <CompanyIcons 
            companies={gameState.companies || []} 
            onIconClick={handleNewsClick} 
            iconMapping={iconMapping}
          />
          <StockTable stocks={gameState.companies || []} />
        </div>
        <div className="right-section">
          <PortfolioTable 
            portfolio={portfolio} 
            companies={gameState.companies || []}
          />
          <TradeForm 
            companies={gameState.companies || []} 
            onTrade={handleTrade} 
          />
        </div>
      </div>
      <button className="next-turn-button" onClick={handleEndTurn} disabled={isLoading}>Next Session</button>
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
          sessionId={gameState.sessionId}
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
