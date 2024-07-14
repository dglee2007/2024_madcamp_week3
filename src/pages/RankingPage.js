import React, { useState, useEffect } from 'react';
import { getTopProfitRate, getTopCumulativeProfit } from '../services/api';

const RankingPage = () => {
  const [topProfitRate, setTopProfitRate] = useState([]);
  const [topCumulativeProfit, setTopCumulativeProfit] = useState([]);

  useEffect(() => {
    fetchRankings();
  }, []);

  const fetchRankings = async () => {
    try {
      const [profitRateResponse, cumulativeProfitResponse] = await Promise.all([
        getTopProfitRate(),
        getTopCumulativeProfit()
      ]);
      setTopProfitRate(profitRateResponse.data);
      setTopCumulativeProfit(cumulativeProfitResponse.data);
    } catch (error) {
      console.error('Failed to fetch rankings:', error);
    }
  };

  return (
    <div>
      <h1>Rankings</h1>
      <h2>Top Profit Rate</h2>
      {/* Render topProfitRate data */}
      <h2>Top Cumulative Profit</h2>
      {/* Render topCumulativeProfit data */}
    </div>
  );
};

export default RankingPage;