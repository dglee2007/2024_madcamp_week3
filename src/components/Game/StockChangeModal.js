import React, { useEffect, useState } from 'react';
import api from '../../services/api';

function StockChangeModal({ onClose, sessionId }) {
  const [stockChanges, setStockChanges] = useState([]);

  useEffect(() => {
    fetchStockChanges();
  }, []);

  const fetchStockChanges = async () => {
    try {
      const response = await api.get(`/game/stock-changes/${sessionId}`);
      setStockChanges(response.data);
    } catch (error) {
      console.error('Failed to fetch stock changes:', error);
    }
  };

  function StockChangeModal({ onClose, stockChanges }) {
    return (
      <div className="stock-change-modal">
        <h2>Stock Price Changes</h2>
        <table>
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
                <td>{parseFloat(change.change_percentage).toFixed(2)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={onClose}>Close</button>
      </div>
    );
  }
}

export default StockChangeModal;