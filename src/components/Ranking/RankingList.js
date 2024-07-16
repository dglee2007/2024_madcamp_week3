// src/components/Ranking/RankingList.js
import React, { useState, useEffect } from 'react';
//import axios from 'axios';
import '../../styles/RankingList.css';
import api from '../../services/api';


const RankingList = () => {
  const [activeTab, setActiveTab] = useState('single');
  const [singleRanking, setSingleRanking] = useState([]);
  const [cumulativeRanking, setCumulativeRanking] = useState([]);

  useEffect(() => {
    fetchSingleRanking();
    fetchCumulativeRanking();
  }, []);

  const fetchSingleRanking = async () => {
    try {
      const response = await api.get('/ranking/top-profit-rate');
      setSingleRanking(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching single game ranking:', error);
      setSingleRanking([]);
    }
  };
  
  const fetchCumulativeRanking = async () => {
    try {
      const response = await api.get('/ranking/top-cumulative-profit');
      setCumulativeRanking(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching cumulative ranking:', error);
      setCumulativeRanking([]);
    }
  };

  const getMedal = (index) => {
    switch(index) {
      case 0: return '🥇';
      case 1: return '🥈';
      case 2: return '🥉';
      default: return '';
    }
  };

  return (
    <div className="ranking-container">
      <div className="tab-container">
        <button 
          className={`tab ${activeTab === 'single' ? 'active' : ''}`} 
          onClick={() => setActiveTab('single')}>
          단일 게임 랭킹
        </button>
        <button 
          className={`tab ${activeTab === 'cumulative' ? 'active' : ''}`} 
          onClick={() => setActiveTab('cumulative')}>
          누적 수익률 랭킹
        </button>
      </div>
      <ul className="ranking-list">
        {activeTab === 'single' ? (
          singleRanking.map((item, index) => (
            <li key={index} className="ranking-item">
              <span className="medal">{getMedal(index)}</span>
              <span className="username">{item.username}</span>
              <span className="profit-rate">{parseFloat(item.best_profit_rate).toFixed(2)}%</span>
            </li>
          ))
        ) : (
          cumulativeRanking.map((item, index) => (
            <li key={index} className="ranking-item">
              <span className="medal">{getMedal(index)}</span>
              <span className="username">{item.username}</span>
              <span className="profit-rate">{parseFloat(item.cumulative_profit_rate).toFixed(2)}%</span>
              <span className="total-games">({item.total_games}게임)</span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default RankingList;