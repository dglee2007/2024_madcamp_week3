import React, { useState } from 'react';
import { useContext } from 'react';
import { GameContext } from '../../contexts/GameContext';

function TradeButtons({ onTrade }) {
  const { gameState } = useContext(GameContext);
  const [selectedCompany, setSelectedCompany] = useState('');
  const [amount, setAmount] = useState(0);

  const handleTrade = (action) => {
    if (selectedCompany && amount > 0) {
      onTrade(action, selectedCompany, amount);
      setSelectedCompany('');
      setAmount(0);
    } else {
      alert('회사와 수량을 선택해 주세요.');
    }
  };

  return (
    <div className="trade-buttons">
      <select
        value={selectedCompany}
        onChange={(e) => setSelectedCompany(e.target.value)}
      >
        <option value="">Select a company</option>
        {gameState.companies.map((company) => (
          <option key={company.id} value={company.id}>
            {company.name}
          </option>
        ))}
      </select>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
      />
      <button onClick={() => handleTrade('buy')}>Buy</button>
      <button onClick={() => handleTrade('sell')}>Sell</button>
    </div>
  );
}

export default TradeButtons;
