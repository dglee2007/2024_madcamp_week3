import React from 'react';

function PortfolioTable({ portfolio, companies }) {
  const getCompanyInfo = (companyId) => {
    return companies.find(c => c.company_id === companyId) || {};
  };

  return (
    <div className="portfolio-table">
      <h2>Your Portfolio</h2>
      <table>
        <thead>
          <tr>
            <th>Company</th>
            <th>Quantity</th>
            <th>Current Price</th>
            <th>Total Value</th>
          </tr>
        </thead>
        <tbody>
          {portfolio.map((item) => {
            const companyInfo = getCompanyInfo(item.company_id);
            const currentPrice = parseFloat(companyInfo.price) || 0;
            const totalValue = item.amount * currentPrice;
            return (
              <tr key={item.company_id}>
                <td>{companyInfo.name || 'Unknown'}</td>
                <td>{item.amount}</td>
                <td>${currentPrice.toFixed(2)}</td>
                <td>${totalValue.toFixed(2)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default PortfolioTable;