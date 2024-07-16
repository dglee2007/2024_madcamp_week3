import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { GameContext } from '../../contexts/GameContext';
import CompanyIcons from './CompanyIcons';
import StockTable from './StockTable';
import PortfolioTable from './PortfolioTable';
import TradeForm from './TradeForm';
import StockChangeModal from './StockChangeModal';
import GameResultModal from './GameResultModal';
import NewsPopup from './NewsPopup';  // 뉴스 팝업 컴포넌트 추가
import api from '../../services/api';
import './GameBoard.css';

function GameBoard() {
  const { gameState, setGameState } = useContext(GameContext);
  const [showStockChangeModal, setShowStockChangeModal] = useState(false);
  const [showGameResultModal, setShowGameResultModal] = useState(false);
  const [showNewsPopup, setShowNewsPopup] = useState(false);  // 뉴스 팝업 상태 추가
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);  // 선택된 회사 ID 상태 추가
  const [news, setNews] = useState({ headline: '', content: '' });
  const [isPremium, setIsPremium] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [portfolio, setPortfolio] = useState([]);

  const updateGameState = useCallback((newState) => {
    setGameState(prevState => ({
      ...prevState,
      ...newState,
      companies: newState.companies ? newState.companies.map(company => ({
        ...company,
        id: company.id,
        company_id: company.company_id,
      })) : prevState.companies,
    }));
  }, [setGameState]);

  useEffect(() => {
    startGame();
  }, []);

  useEffect(() => {
    console.log('Updated game state:', gameState);
  }, [gameState]);

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
      
      const newIconMapping = {};
      response.data.companies.forEach((company, index) => {
        newIconMapping[company.id] = `company${index + 1}`;
      });

      console.log('Initial companies:', response.data.companies);
      console.log('Initial icon mapping:', newIconMapping);

      updateGameState({
        userId,
        sessionId: response.data.sessionId,
        companies: response.data.companies.map(c => ({
          ...c,
          company_id: c.id,
          id: c.id,
        })),
        current_balance: parseFloat(response.data.start_balance),
        current_year: 2014,
        iconMapping: newIconMapping,
      });

      await fetchPortfolio(response.data.sessionId);
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
      
      updateGameState({
        current_year: endTurnResponse.data.nextYear,
        current_balance: parseFloat(endTurnResponse.data.newBalance),
        stockChanges: stockChangesResponse.data,
        companies: gameStateResponse.data.companies,
        investments: gameStateResponse.data.investments || [],
      });

      setShowStockChangeModal(true);
      if (endTurnResponse.data.nextYear > 2023) {
        setShowGameResultModal(true);
      }

      await fetchPortfolio(gameState.sessionId);
    } catch (error) {
      console.error('Failed to end turn:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPortfolio = async (sessionId) => {
    try {
      const portfolioResponse = await api.get(`/game/portfolio/${sessionId}`);
      const portfolioData = portfolioResponse.data;

      const gameStateResponse = await api.get(`/game/game-state/${sessionId}`);
      const companies = gameStateResponse.data.companies;

      const updatedPortfolio = portfolioData.map(item => {
        const company = companies.find(c => c.id === item.company_id);
        return {
          ...item,
          current_price: company ? parseFloat(company.price) : 0,
        };
      });

      setPortfolio(updatedPortfolio);
      updateGameState({ companies });
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
        companyId,
        amount,
        action,
      });
      
      console.log('Trade response:', response.data);
  
      updateGameState({
        current_balance: parseFloat(response.data.session.current_balance),
      });
      
      await fetchPortfolio(gameState.sessionId);
    } catch (error) {
      console.error('Trade failed:', error.response ? error.response.data : error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewsClick = (companyId) => {
    setSelectedCompanyId(companyId);
    setShowNewsPopup(true);
  };

  const fetchNews = async (companyId, isPremium) => {
    console.log('Fetching news for company ID:', companyId, 'isPremium:', isPremium);
    try {
      const response = await api.get(`/game/news/${gameState.sessionId}/${companyId}/${isPremium ? 1 : 0}`);
      console.log('News response:', response.data);
      const { news, remainingBalance } = response.data;

      setNews({
        headline: news.headline,
        content: news.content || '',
      });
      setIsPremium(isPremium);
      setShowNewsPopup(true);  // 뉴스 선택 후 팝업 열기

      if (remainingBalance !== undefined) {
        updateGameState({
          current_balance: parseFloat(remainingBalance),
        });
      }
    } catch (error) {
      console.error('Failed to fetch news:', error);
      alert('뉴스를 가져오는데 실패했습니다.');
    }
  };

  const handleGameEnd = () => {
    navigate('/main');
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="game">
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
            iconMapping={gameState.iconMapping || {}}
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
      {showNewsPopup && (
        <NewsPopup 
          isOpen={showNewsPopup}
          companyId={selectedCompanyId}
          headline={news.headline}
          content={news.content}
          isPremium={isPremium}
          onClose={() => {
            setShowNewsPopup(false);
            setNews({ headline: '', content: '' });
          }}
          onSelect={fetchNews}
        />
      )}
    </div>
  );
}

export default GameBoard;
