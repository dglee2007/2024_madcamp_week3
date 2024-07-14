import React from 'react';
import { tradeStock } from '../../services/api';

const CompanyList = ({ companies, sessionId }) => {
  const handleTrade = async (companyId, action) => {
    const amount = prompt(`Enter the number of stocks to ${action}:`);
    if (amount) {
      try {
        await tradeStock(sessionId, companyId, parseInt(amount), action);
        // TODO: Update game state
      } catch (error) {
        console.error('Trade failed:', error);
        alert('Trade failed. Please try again.');
      }
    }
  };

  return (
    <div>
      <h3>Companies</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company) => (
            <tr key={company.id}>
              <td>{company.name}</td>
              <td>${company.price.toFixed(2)}</td>
              <td>
                <button onClick={() => handleTrade(company.id, 'buy')}>Buy</button>
                <button onClick={() => handleTrade(company.id, 'sell')}>Sell</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompanyList;