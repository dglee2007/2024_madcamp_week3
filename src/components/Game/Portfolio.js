import React from 'react';

const Portfolio = ({ investments }) => {
  return (
    <div>
      <h3>Your Portfolio</h3>
      <table>
        <thead>
          <tr>
            <th>Company</th>
            <th>Amount</th>
            <th>Price per Stock</th>
          </tr>
        </thead>
        <tbody>
          {investments.map((investment) => (
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