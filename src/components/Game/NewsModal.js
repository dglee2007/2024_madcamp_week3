import React, { useState } from 'react';
import { getNews } from '../../services/api';

const NewsModal = ({ company, onClose, sessionId, currentBalance }) => {
  const [news, setNews] = useState(null);
  const [error, setError] = useState(null);

  const fetchNews = async (isPremium) => {
    try {
      const response = await getNews(sessionId, company.company_id, isPremium ? 1 : 0);
      setNews(response.data.news);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to fetch news');
    }
  };

  return (
    <div className="news-modal">
      <h2>{company.name} News</h2>
      {!news && (
        <>
          <button onClick={() => fetchNews(false)} disabled={currentBalance < 100}>
            General News ($100)
          </button>
          <button onClick={() => fetchNews(true)} disabled={currentBalance < 1000}>
            Premium News ($1000)
          </button>
        </>
      )}
      {news && (
        <div>
          <h3>{news.headline}</h3>
          {news.content && <p>{news.content}</p>}
        </div>
      )}
      {error && <p className="error">{error}</p>}
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default NewsModal;