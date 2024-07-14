// src/api.js
export async function fetchGameState(sessionId) {
    const response = await fetch(`https://25c7-118-235-90-93.ngrok-free.app/api/game/game-state/${sessionId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      }
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  }
  