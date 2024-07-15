import React from 'react';

function StockTable({ stocks }) {
  return (
    <table className="stock-table">
      <thead>
        <tr>
          <th>Company</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {stocks.map((stock) => (
          <tr key={stock.id}>
            <td>{stock.name}</td>
            <td>${stock.price}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default StockTable;