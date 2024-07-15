import React, { useState } from 'react';

function TradeButtons({ onTrade }) {
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [amount, setAmount] = useState(0);

  const handleTrade = (action) => {
    onTrade(action, selectedCompany, amount);
    setSelectedCompany(null);
    setAmount(0);
  };

  return (
    <div className="trade-buttons">
      <button onClick={() => handleTrade('buy')}>Buy</button>
      <button onClick={() => handleTrade('sell')}>Sell</button>
      {/* Add company selection and amount input */}
    </div>
  );
}

export default TradeButtons;