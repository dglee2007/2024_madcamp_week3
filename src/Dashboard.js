// src/Dashboard.js
import React, { useState, useEffect } from 'react';
import { fetchGameState } from './api';
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


function Dashboard() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuText, setMenuText] = useState('');
  const [miniTabVisible, setMiniTabVisible] = useState(false);
  const [miniTabContent, setMiniTabContent] = useState('');
  const [session, setSession] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const sessionId = localStorage.getItem('sessionId');

  useEffect(() => {
    const getGameState = async () => {
      try {
        const data = await fetchGameState(sessionId);
        updateGameInfo(data.session);
        updateCompaniesInfo(data.companies);
        updatePortfolio(data.portfolio);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    if (sessionId){
      getGameState();
      const interval = setInterval(() => {
        getGameState();
      }, 5000); // 5초마다 업데이트
      return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 정리
    }    
  }, [sessionId]);

  const updateGameInfo = (session) => {
    setSession(session);
  };

  const updateCompaniesInfo = (companies) => {
    setCompanies(companies);
  };

  const updatePortfolio = (portfolio) => {
    setPortfolio(portfolio);
  };

  const handleIconClick = (text) => {
    setMenuText(text);
    setMenuVisible(true);
  };

  const closeMenu = () => {
    setMenuVisible(false);
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

  /*if (!session) {
    return <div>Loading...</div>;
  } */

  return (
    <div className="Dashboard">
      <div className="top-section">
        <div className="price_now">
          <table>
            <thead>
              <tr>
                <th colSpan="2">{session.current_year}년</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((company, index) => (
                <tr key={index} className={index % 2 === 0 ? 'odd-row' : 'even-row'}>
                  <td>{company.name}</td>
                  <td>{company.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="icons">
          {[company1, company2, company3, company4, company5, company6, company7, company8, company9, company10, company11, company12].map((company, index) => (
            <div className="icon-container" key={index}>
              <img src={company} alt={`Company ${index + 1}`} onClick={() => handleIconClick(`Company ${index + 1}`)} />
              <span>{`company${index + 1}`}</span>
            </div>
          ))}
        </div>
      </div>
      {menuVisible && (
        <Menu
          text={menuText}
          onClose={closeMenu}
          onGeneralInfoClick={handleGeneralInfoClick}
          onAdvancedInfoClick={handleAdvancedInfoClick}
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
      <div className="account">
        <div className="header">
          <button className="info-button">안내</button>
          <span>{`${session.username} 님의 계좌 잔고`}</span>
          <button className="query-button">조회</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>종목명</th>
              <th>매입금액</th>
              <th>주식수</th>
              <th>현재금액</th>
              <th>수익률</th>
            </tr>
          </thead>
          <tbody>
            {portfolio.map((stock, index) => (
              <tr key={index}>
                <td>{stock.name}</td>
                <td>{stock.purchase_price}</td>
                <td>{stock.amount}</td>
                <td>{stock.current_price}</td>
                <td>{stock.profit_rate}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="control_buttons">
        <button className="action-button">매수</button>
        <button className="action-button">매도</button>
        <button className="action-button">결정</button>
      </div>
    </div>
  );
}

export default Dashboard;