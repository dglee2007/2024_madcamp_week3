import React from 'react';

function StockTable({ stocks }) {
  // stocks 배열을 두 개의 열로 나누기
  const leftColumn = stocks.slice(0, Math.ceil(stocks.length / 2));
  const rightColumn = stocks.slice(Math.ceil(stocks.length / 2));

  const formatPrice = (price) => {
    if (price === null || price === undefined) {
      return 'N/A';
    }
    
    let numPrice;
    if (typeof price === 'number') {
      numPrice = price;
    } else if (typeof price === 'string') {
      numPrice = parseFloat(price);
    } else if (typeof price === 'object' && price.toString) {
      numPrice = parseFloat(price.toString());
    } else {
      return 'N/A';
    }
  
    if (isNaN(numPrice)) {
      return 'N/A';
    }
  
    return numPrice.toFixed(2);
  };

  return (
    <table className="stock-table">
      <thead>
        <tr>
          <th>회사명</th>
          <th>현재가</th>
          <th>회사명</th>
          <th>현재가</th>
        </tr>
      </thead>
      <tbody>
        {leftColumn.map((stock, index) => (
          <tr key={stock.company_id}>
            <td>{stock.name}</td>
            <td>${formatPrice(stock.price)}</td>
            {rightColumn[index] && (
              <>
                <td>{rightColumn[index].name}</td>
                <td>${formatPrice(rightColumn[index].price)}</td>
              </>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default StockTable;