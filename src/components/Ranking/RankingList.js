import React, { useState, useEffect } from 'react';
import api from '../../services/api';

function RankingList() {
  const [topProfitRate, setTopProfitRate] = useState([]);
  const [topCumulativeProfit, setTopCumulativeProfit] = useState([]);

  useEffect(() => {
    fetchRankings();
  }, []);

  const fetchRankings = async () => {
    try {
      const profitRateResponse = await api.get('/ranking/top-profit-rate');
      const cumulativeProfitResponse = await api.get('/ranking/top-cumulative-profit');
      setTopProfitRate(profitRateResponse.data);
      setTopCumulativeProfit(cumulativeProfitResponse.data);
    } catch (error) {
      console.error('Failed to fetch rankings:', error);
    }
  };

  return (
    <div className="ranking-list">
      <h2>Rankings</h2>
      <h3>Top Profit Rate</h3>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Username</th>
            <th>Profit Rate</th>
          </tr>
        </thead>
        <tbody>
          {topProfitRate.map((user, index) => (
            <tr key={user.username}>
              <td>{index + 1}</td>
              <td>{user.username}</td>
              <td>{user.best_profit_rate}%</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Top Cumulative Profit</h3>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Username</th>
            <th>Cumulative Profit Rate</th>
            <th>Total Games</th>
          </tr>
        </thead>
        <tbody>
          {topCumulativeProfit.map((user, index) => (
            <tr key={user.username}>
              <td>{index + 1}</td>
              <td>{user.username}</td>
              <td>{user.cumulative_profit_rate}%</td>
              <td>{user.total_games}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RankingList;