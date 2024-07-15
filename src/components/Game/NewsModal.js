import React, { useState, useContext } from 'react';
import { GameContext } from '../../contexts/GameContext';
import api from '../../services/api';
import '../../styles/NewsModal.css';

function NewsModal({ onClose, sessionId, companyId }) {
  const { gameState, setGameState } = useContext(GameContext);
  const [newsContent, setNewsContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchNews = async (isPremium) => {
    setIsLoading(true);
    setError('');
    try {
      const response = await api.get(`/game/news/${sessionId}/${companyId}/${isPremium ? 1 : 0}`);
      console.log('Full API Response:', response); // 전체 응답 로깅

      if (!response.data) {
        console.error('No data in response:', response);
        throw new Error('No data received from server');
      }

      console.log('News data:', response.data); // 뉴스 데이터만 로깅

      const { news, remainingBalance } = response.data;

      if (!news) {
        console.error('No news object in response data:', response.data);
        throw new Error('No news data in server response');
      }

      // isPremium에 따라 content 또는 headline을 사용
      setNewsContent(isPremium && news.content ? news.content : news.headline || '뉴스 내용이 없습니다.');
      
      if (remainingBalance !== undefined) {
        setGameState(prevState => ({
          ...prevState,
          current_balance: parseFloat(remainingBalance)
        }));
      } else {
        console.warn('No remainingBalance in response');
      }
    } catch (error) {
      console.error('Failed to fetch news:', error);
      setError(`뉴스를 가져오는데 실패했습니다: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="news-modal">
      <h2>Company News</h2>
      <button onClick={() => fetchNews(false)} disabled={isLoading}>일반 뉴스</button>
      <button onClick={() => fetchNews(true)} disabled={isLoading}>프리미엄 뉴스</button>
      {isLoading && <p>로딩 중...</p>}
      {error && <p className="error">{error}</p>}
      {newsContent && (
        <div className="news-content">
          <h3>뉴스 내용:</h3>
          <p>{newsContent}</p>
        </div>
      )}
      <button onClick={onClose}>닫기</button>
    </div>
  );
}

export default NewsModal;