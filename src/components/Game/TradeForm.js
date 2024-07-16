import React, { useState } from 'react';

function TradeForm({ companies, onTrade }) {
  const [selectedCompanyId, setSelectedCompanyId] = useState('');
  const [amount, setAmount] = useState(0);

  const handleTrade = (action) => {
    if (selectedCompanyId && amount > 0) {
      console.log(`Calling onTrade: action=${action}, companyId=${selectedCompanyId}, amount=${amount}`);
      onTrade(action, selectedCompanyId, parseInt(amount, 10));
      setSelectedCompanyId('');
      setAmount(0);
    } else {
      alert('회사와 수량을 선택해 주세요.');
    }
  };

  return (
    <div className="trade-form">
      <select
        value={selectedCompanyId}
        onChange={(e) => setSelectedCompanyId(e.target.value)}
      >
        <option value="">Select a company</option>
        {companies.map((company) => (
          <option key={company.company_id} value={company.company_id}>
            {company.name}
          </option>
        ))}
      </select>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
        min="1"
      />
      <button onClick={() => handleTrade('buy')}>Buy</button>
      <button onClick={() => handleTrade('sell')}>Sell</button>
    </div>
  );
}

export default TradeForm;