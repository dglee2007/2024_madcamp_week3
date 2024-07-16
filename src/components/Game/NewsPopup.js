import React from 'react';
import './NewsPopup.css';

function NewsPopup({ isOpen, companyId, headline, content, isPremium, onClose, onSelect }) {
  return (
    <div className={`news-popup ${isOpen ? 'open' : ''}`}>
      <div className="news-popup-content">
        <h2>뉴스 열람</h2>
        {headline ? (
          <div>
            <h3>{headline}</h3>
            {isPremium && <p>{content}</p>}
            <button onClick={onClose}>닫기</button>
          </div>
        ) : (
          <div>
            <p>어떤 정보를 열람하시겠습니까?</p>
            <button onClick={() => onSelect(companyId, false)}>일반 정보</button>
            <button onClick={() => onSelect(companyId, true)}>고급 정보</button>
            <button onClick={onClose}>닫기</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default NewsPopup;
