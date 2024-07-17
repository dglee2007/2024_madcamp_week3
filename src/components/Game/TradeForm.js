import React, { useState, useEffect } from 'react';

function TradeForm({ companies, onTrade, currentBalance }) {
  const [selectedCompanyId, setSelectedCompanyId] = useState('');
  const [amount, setAmount] = useState(0);
  const [maxAmount, setMaxAmount] = useState(0);

  useEffect(() => {
    if (selectedCompanyId) {
      const selectedCompany = companies.find(c => c.company_id === selectedCompanyId);
      if (selectedCompany) {
        const max = Math.floor(currentBalance / selectedCompany.price);
        setMaxAmount(max);
        setAmount(Math.min(amount, max));
      }
    } else {
      setMaxAmount(0);
      setAmount(0);
    }
  }, [selectedCompanyId, companies, currentBalance]);

  const handleCompanyChange = (e) => {
    setSelectedCompanyId(e.target.value);
  };

  const handleAmountChange = (e) => {
    const newAmount = parseInt(e.target.value, 10);
    setAmount(isNaN(newAmount) ? 0 : Math.min(newAmount, maxAmount));
  };

  const handleTrade = (action) => {
    if (selectedCompanyId && amount > 0) {
      console.log(`Calling onTrade: action=${action}, companyId=${selectedCompanyId}, amount=${amount}`);
      onTrade(action, selectedCompanyId, amount);
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
        onChange={handleCompanyChange}
      >
        <option value="">Select a company</option>
        {companies.map((company) => (
          <option key={company.company_id} value={company.company_id}>
            {company.name} (${company.price})
          </option>
        ))}
      </select>
      <input
        type="number"
        value={amount}
        onChange={handleAmountChange}
        placeholder="Amount"
        min="0"
        max={maxAmount}
      />
      <p>최대 구매 가능 수량: {maxAmount}</p>
      <button onClick={() => handleTrade('buy')} disabled={amount === 0}>Buy</button>
      <button onClick={() => handleTrade('sell')} disabled={amount === 0}>Sell</button>
    </div>
  );
}

export default TradeForm;