import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/GameInstruction.css';  // 상대 경로로 CSS 파일 참조
//import 'src/styles/GameInstruction.css';
import stockIllustration from '../assets/stock_illustration.png';
import profilePic from '../assets/profile-pic.jpg';

function GameInstructions() {
  const navigate = useNavigate();

  const handleBackToMain = () => {
    navigate('/main');
  };

  return (
    <div className="instruction">
      <header className="header">
        <div className="logo">Madstocks</div>
        <div className="welcome">Hello User</div>
        <div className="profile">
          <img src={profilePic} alt="Profile" />
        </div>
      </header>
      <main className="main-content">
      <img src={stockIllustration} alt="Stock Illustration" className="main-image" />
        <h2>How to Play</h2>
        <p>Start a new game session with $1,000 initial balance.</p>
        <p>You will be presented with 12 random companies to invest in.</p>
        <p>Each turn represents one year, starting from 2014</p>
        <p>Buy and sell stocks to maximize your profit.</p>
        <p>Read news (general or premium) to make informed decisions.</p>
        <p>End your turn to move to the next year and see stock price changes.</p>
        <p>The game ends after 10 turns (years), in 2023.</p>
        <p>Your final balance determines your profit rate and ranking.</p>
        <button className="back-button" onClick={handleBackToMain}>Back to Main</button>
      </main>
    </div>
  );
}

export default GameInstructions;