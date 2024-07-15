import React from 'react';

function GameInstructions() {
  return (
    <div className="game-instructions">
      <h2>How to Play</h2>
      <ol>
        <li>Start a new game session with $1,000,000 initial balance.</li>
        <li>You will be presented with 12 random companies to invest in.</li>
        <li>Each turn represents one year, starting from 2014.</li>
        <li>Buy and sell stocks to maximize your profit.</li>
        <li>Read news (general or premium) to make informed decisions.</li>
        <li>End your turn to move to the next year and see stock price changes.</li>
        <li>The game ends after 10 turns (years), in 2023.</li>
        <li>Your final balance determines your profit rate and ranking.</li>
      </ol>
      <p>Good luck and happy investing!</p>
    </div>
  );
}

export default GameInstructions;