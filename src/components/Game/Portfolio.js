import React from 'react';

const Portfolio = ({ investments, balance }) => {
  return (
    <div className="portfolio">
      <h3>Current Balance: ${balance}</h3>
      <table>
        <thead>
          <tr>
            <th>Company</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {investments.map((investment) => (
            <tr key={investment.company_id}>
              <td>{investment.name}</td>
              <td>{investment.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Portfolio;