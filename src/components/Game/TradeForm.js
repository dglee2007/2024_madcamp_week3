// src/components/Game/TradeForm.js
import React, { useState } from 'react';
import './TradeForm.css';

function TradeForm({ companies, onTrade, onEndTurn, isLastYear, currentYear }) {
  const [selectedCompany, setSelectedCompany] = useState('');
  const [amount, setAmount] = useState('');
  const [action, setAction] = useState('buy');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedCompany && amount) {
      onTrade(action, selectedCompany, Number(amount));
      setAmount('');
    }
  };

  return (
    <form className="trade-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="company-select">Company:</label>
        <select
          id="company-select"
          value={selectedCompany}
          onChange={(e) => setSelectedCompany(e.target.value)}
          required
        >
          <option value="">Select a company</option>
          {companies.map((company) => (
            <option key={company.id} value={company.id}>
              {company.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="amount-input">Amount:</label>
        <input
          id="amount-input"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          min="1"
          required
        />
      </div>

      <div className="form-group">
        <label>Action:</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              value="buy"
              checked={action === 'buy'}
              onChange={() => setAction('buy')}
            />
            Buy
          </label>
          <label>
            <input
              type="radio"
              value="sell"
              checked={action === 'sell'}
              onChange={() => setAction('sell')}
            />
            Sell
          </label>
        </div>
      </div>

      <button type="submit" className="trade-button">
        {action === 'buy' ? 'Buy' : 'Sell'} Stocks
      </button>

      <button type="button" className="end-turn-button" onClick={onEndTurn}>
        {isLastYear ? 'Finish' : 'Next Session'}
      </button>

      {isLastYear && (
        <p className="last-year-message">
          Current year: {currentYear}. This is the last year.
        </p>
      )}
    </form>
  );
}

export default TradeForm;