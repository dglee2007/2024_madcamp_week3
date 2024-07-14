import React from 'react';

const Portfolio = ({ investments }) => {
  return (
    <div className="portfolio">
      <h3>Your Portfolio</h3>
      <table>
        <thead>
          <tr>
            <th>Company</th>
            <th>Shares</th>
            <th>Purchase Price</th>
          </tr>
        </thead>
        <tbody>
          {investments.map(investment => (
            <tr key={investment.company_id}>
              <td>{investment.name}</td>
              <td>{investment.amount}</td>
              <td>${investment.price_per_stock.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Portfolio;