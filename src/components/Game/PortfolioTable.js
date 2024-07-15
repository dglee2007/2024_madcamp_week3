import React from 'react';

function PortfolioTable({ portfolio }) {
  return (
    <table className="portfolio-table">
      <thead>
        <tr>
          <th>Company</th>
          <th>Shares</th>
          <th>Avg. Price</th>
        </tr>
      </thead>
      <tbody>
        {portfolio.map((item) => (
          <tr key={item.company_id}>
            <td>{item.name}</td>
            <td>{item.amount}</td>
            <td>${item.price_per_stock}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default PortfolioTable;