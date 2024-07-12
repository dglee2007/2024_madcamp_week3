// src/Menu.js
import React from 'react';

const Menu = ({ text, onClose, onBuyClick, onInfoClick, onGeneralInfoClick, onAdvancedInfoClick, isInfoLevel2 }) => (
  <div className="menu">
    <div className="menu-content">
      <span className="close-button" onClick={onClose}>&times;</span>
      <h3>{text}</h3>
      {!isInfoLevel2 ? (
        <ul>
          <li className="menu-item" onClick={onBuyClick}>매수</li>
          <li className="menu-item" onClick={onInfoClick}>정보</li>
        </ul>
      ) : (
        <ul>
          <li className="menu-item" onClick={onGeneralInfoClick}>일반 정보</li>
          <li className="menu-item" onClick={onAdvancedInfoClick}>고급 정보</li>
        </ul>
      )}
    </div>
  </div>
);

export default Menu;
