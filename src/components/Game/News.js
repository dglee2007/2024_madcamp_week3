import React, { useState } from 'react';
import { getNews } from '../../services/api';

const News = ({ sessionId }) => {
  const [news, setNews] = useState(null);

  const handleReadNews = async (companyId, isPremium) => {
    try {
      const response = await getNews(sessionId, companyId, isPremium ? 1 : 0);
      setNews(response.data.news);
    } catch (error) {
      console.error('Failed to fetch news:', error);
      alert('Failed to fetch news. Please try again.');
    }
  };

  return (
    <div>
      <h3>News</h3>
      {news ? (
        <div>
          <h4>{news.headline}</h4>
          {news.content && <p>{news.content}</p>}
        </div>
      ) : (
        <p>Select a company to read news</p>
      )}
      {/* Add buttons or UI to select company and news type */}
    </div>
  );
};

export default News;