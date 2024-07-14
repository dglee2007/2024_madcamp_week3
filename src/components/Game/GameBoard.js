import React, { useState } from 'react';
import CompanyList from './CompanyList';
import Portfolio from './Portfolio';
import NewsModal from './NewsModal';
import { endTurn, tradeStock } from '../../services/api';
import '../../styles/GameBoard.css';

const GameBoard = ({ gameState, sessionId }) => {
  const [showNewsModal, setShowNewsModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);

  const handleEndTurn = async () => {
    try {
      const response = await endTurn(sessionId);
      // Update game state with new turn data
    } catch (error) {
      console.error('Failed to end turn:', error);
    }
  };

  const handleTrade = async (companyId, amount, action) => {
    try {
      await tradeStock(sessionId, companyId, amount, action);
      // Update game state after successful trade
    } catch (error) {
      console.error('Trade failed:', error);
    }
  };

  const handleCompanyClick = (company) => {
    setSelectedCompany(company);
    setShowNewsModal(true);
  };

  return (
    <div className="game-board">
      <div className="left-panel">
        <CompanyList 
          companies={gameState.companies} 
          onCompanyClick={handleCompanyClick}
        />
      </div>
      <div className="right-panel">
        <Portfolio investments={gameState.investments} />
        <div className="actions">
          <button onClick={handleEndTurn}>End Turn</button>
        </div>
      </div>
      {showNewsModal && (
        <NewsModal 
          company={selectedCompany}
          onClose={() => setShowNewsModal(false)}
          sessionId={sessionId}
        />
      )}
    </div>
  );
};

export default GameBoard;