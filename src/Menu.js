// src/Menu.js
import React from 'react';

const Menu = ({ text, onClose, onGeneralInfoClick, onAdvancedInfoClick }) => (
  <div className="menu">
    <div className="menu-content">
      <span className="close-button" onClick={onClose}>&times;</span>
      <h3>{text}</h3>
      <ul>
        <li className="menu-item" onClick={onGeneralInfoClick}>일반 정보</li>
        <li className="menu-item" onClick={onAdvancedInfoClick}>고급 정보</li>
      </ul>
    </div>
  </div>
);

export default Menu;
