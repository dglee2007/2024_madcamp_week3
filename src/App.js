// src/App.js
import React, { useState } from 'react';
import Menu from './Menu';
import company1 from './assets/company1.png';
import company2 from './assets/company2.png';
import company3 from './assets/company3.png';
import company4 from './assets/company4.png';
import company5 from './assets/company5.png';
import company6 from './assets/company6.png';
import company7 from './assets/company7.png';
import company8 from './assets/company8.png';
import company9 from './assets/company9.png';
import company10 from './assets/company10.png';
import company11 from './assets/company11.png';
import company12 from './assets/company12.png';
import './App.css';

function App() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuText, setMenuText] = useState('');
  const [miniTabVisible, setMiniTabVisible] = useState(false);
  const [miniTabContent, setMiniTabContent] = useState('');
  const [isInfoLevel2, setIsInfoLevel2] = useState(false);

  const handleIconClick = (text) => {
    setMenuText(text);
    setMenuVisible(true);
    setIsInfoLevel2(false);
  };

  const closeMenu = () => {
    setMenuVisible(false);
  };

  const handleBuyClick = () => {
    setMiniTabContent('매수 페이지 내용');
    setMiniTabVisible(true);
    setMenuVisible(false);
  };

  const handleInfoClick = () => {
    setIsInfoLevel2(true);
  };

  const handleGeneralInfoClick = () => {
    setMiniTabContent('일반 정보 페이지 내용');
    setMiniTabVisible(true);
    setMenuVisible(false);
  };

  const handleAdvancedInfoClick = () => {
    setMiniTabContent('고급 정보 페이지 내용');
    setMiniTabVisible(true);
    setMenuVisible(false);
  };

  const closeMiniTab = () => {
    setMiniTabVisible(false);
  };

  return (
    <div className="App">
      <div className="icons">
        <div className="icon-container">
          <img src={company1} alt="Company 1" onClick={() => handleIconClick('Company 1')} />
          <span>company1</span>
        </div>
        <div className="icon-container">
          <img src={company2} alt="Company 2" onClick={() => handleIconClick('Company 2')} />
          <span>company2</span>
        </div>
        <div className="icon-container">
          <img src={company3} alt="Company 3" onClick={() => handleIconClick('Company 3')} />
          <span>company3</span>
        </div>
        <div className="icon-container">
          <img src={company4} alt="Company 4" onClick={() => handleIconClick('Company 4')} />
          <span>company4</span>
        </div>
        <div className="icon-container">
          <img src={company5} alt="Company 5" onClick={() => handleIconClick('Company 5')} />
          <span>company5</span>
        </div>
        <div className="icon-container">
          <img src={company6} alt="Company 6" onClick={() => handleIconClick('Company 6')} />
          <span>company6</span>
        </div>
        <div className="icon-container">
          <img src={company7} alt="Company 7" onClick={() => handleIconClick('Company 7')} />
          <span>company7</span>
        </div>
        <div className="icon-container">
          <img src={company8} alt="Company 8" onClick={() => handleIconClick('Company 8')} />
          <span>company8</span>
        </div>
        <div className="icon-container">
          <img src={company9} alt="Company 9" onClick={() => handleIconClick('Company 9')} />
          <span>company9</span>
        </div>
        <div className="icon-container">
          <img src={company10} alt="Company 10" onClick={() => handleIconClick('Company 10')} />
          <span>company10</span>
        </div>
        <div className="icon-container">
          <img src={company11} alt="Company 11" onClick={() => handleIconClick('Company 11')} />
          <span>company11</span>
        </div>
        <div className="icon-container">
          <img src={company12} alt="Company 12" onClick={() => handleIconClick('Company 12')} />
          <span>company12</span>
        </div>
      </div>
      {menuVisible && (
        <Menu
          text={menuText}
          onClose={closeMenu}
          onBuyClick={handleBuyClick}
          onInfoClick={handleInfoClick}
          onGeneralInfoClick={handleGeneralInfoClick}
          onAdvancedInfoClick={handleAdvancedInfoClick}
          isInfoLevel2={isInfoLevel2}
        />
      )}
      {miniTabVisible && (
        <div className="mini-tab">
          <div className="mini-tab-content">
            <button className="close-button" onClick={closeMiniTab}>
              &times;
            </button>
            <div>{miniTabContent}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
