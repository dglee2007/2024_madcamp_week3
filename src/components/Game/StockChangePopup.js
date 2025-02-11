import React from 'react';
import './StockChangePopup.css';

function StockChangePopup({ onClose, stockChanges }) {
  return (
    <div className="overlay">
      <div className="popup-container">
        <h2>Stock Price Changes</h2>
        <table className="stock-change-table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Previous Price</th>
              <th>Current Price</th>
              <th>Change %</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(stockChanges) && stockChanges.map((change) => (
              <tr key={change.company_id}>
                <td>{change.company_name}</td>
                <td>${parseFloat(change.previous_price).toFixed(2)}</td>
                <td>${parseFloat(change.current_price).toFixed(2)}</td>
                <td style={{color: change.change_percentage >= 0 ? 'green' : 'red'}}>
                  {change.change_percentage >= 0 ? '+' : ''}{parseFloat(change.change_percentage).toFixed(2)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default StockChangePopup;
