import React, { useState } from 'react';
import { getNews } from '../../services/api';

const NewsModal = ({ company, onClose, sessionId }) => {
  const [news, setNews] = useState(null);

  const handleGetNews = async (isPremium) => {
    try {
      const response = await getNews(sessionId, company.id, isPremium);
      setNews(response.data.news);
    } catch (error) {
      console.error('Failed to fetch news:', error);
    }
  };

  return (
    <div className="news-modal">
      <h2>{company.name} News</h2>
      <button onClick={() => handleGetNews(false)}>General News ($100)</button>
      <button onClick={() => handleGetNews(true)}>Premium News ($1000)</button>
      {news && (
        <div>
          <h3>{news.headline}</h3>
          {news.content && <p>{news.content}</p>}
        </div>
      )}
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default NewsModal;