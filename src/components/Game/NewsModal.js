import React, { useState } from 'react';
import api from '../../services/api';

function NewsModal({ onClose, sessionId, companyId }) {
  const [newsContent, setNewsContent] = useState('');

  const fetchNews = async (isPremium) => {
    try {
      const response = await api.get(`/game/news/${sessionId}/${companyId}/${isPremium ? 1 : 0}`);
      setNewsContent(response.data.news.content || response.data.news.headline);
    } catch (error) {
      console.error('Failed to fetch news:', error);
    }
  };

  return (
    <div className="news-modal">
      <h2>Company News</h2>
      <button onClick={() => fetchNews(false)}>General News</button>
      <button onClick={() => fetchNews(true)}>Premium News</button>
      <p>{newsContent}</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
}

export default NewsModal;