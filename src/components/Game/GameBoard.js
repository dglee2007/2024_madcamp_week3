import React, { useState } from 'react';
import CompanyList from './CompanyList';
import Portfolio from './Portfolio';
import NewsModal from './NewsModal';
import { endTurn, tradeStock } from '../../services/api';
import '../../styles/GameBoard.css';

const GameBoard = ({ gameState, sessionId, onUpdateGameState }) => {
  const [showNewsModal, setShowNewsModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);

  const handleEndTurn = async () => {
    try {
      await endTurn(sessionId);
      onUpdateGameState();
    } catch (error) {
      console.error('Failed to end turn:', error);
    }
  };

  const handleTrade = async (companyId, amount, action) => {
    try {
      await tradeStock(sessionId, companyId, amount, action);
      onUpdateGameState();
    } catch (error) {
      console.error('Trade failed:', error);
    }
  };

  const handleCompanyClick = (company) => {
    setSelectedCompany(company);
    setShowNewsModal(true);
  };

  if (!gameState || !gameState.companies) {
    return <div>No game state available. Please start a new game.</div>;
  }

  return (
    <div className="game-board">
      <div className="left-panel">
        <div className="company-icons">
          {gameState.companies.map((company, index) => (
            <img
              key={company.company_id}
              src={`/assets/company${index + 1}.png`}
              alt={company.name}
              onClick={() => handleCompanyClick(company)}
            />
          ))}
        </div>
        <CompanyList companies={gameState.companies} />
      </div>
      <div className="right-panel">
        <Portfolio 
          investments={gameState.investments} 
          balance={gameState.session.current_balance}
        />
        <div className="actions">
          <button onClick={() => handleTrade(null, null, 'buy')}>Buy</button>
          <button onClick={() => handleTrade(null, null, 'sell')}>Sell</button>
          <button onClick={handleEndTurn}>Next Turn</button>
        </div>
      </div>
      {showNewsModal && (
        <NewsModal
          company={selectedCompany}
          onClose={() => setShowNewsModal(false)}
          sessionId={sessionId}
          currentBalance={gameState.session.current_balance}
        />
      )}
    </div>
  );
};

export default GameBoard;