// src/components/UserProfile.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../styles/UserProfile.css';

const UserProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(`/profile/${userId}`, {
          withCredentials: true
        });
        setProfileData(response.data);
      } catch (error) {
        console.error('프로필 데이터 가져오기 실패:', error);
      }
    };

    fetchProfileData();
  }, [userId, navigate]);

  if (!profileData) return <div>Loading...</div>;

  return (
    <div className="user-profile">
      <div className="profile-header">
        <h1>{profileData.userInfo.username}의 프로필</h1>
      </div>
      <div className="profile-content">
        <div className="user-stats">
          <h2>통계</h2>
          <p>최고 수익률: {profileData.userInfo.best_profit_rate}%</p>
          <p>총 게임 수: {profileData.userInfo.total_games}</p>
          <p>누적 수익률: {profileData.userInfo.cumulative_profit_rate}%</p>
          <p>최고 금액: ${parseFloat(profileData.maxMoney).toLocaleString()}</p>
        </div>
        <div className="game-history">
          <h2>게임 기록</h2>
          <table>
            <thead>
              <tr>
                <th>날짜</th>
                <th>시작 금액</th>
                <th>종료 금액</th>
                <th>수익률</th>
              </tr>
            </thead>
            <tbody>
              {profileData.gameHistory.map((game) => (
                <tr key={game.session_id}>
                  <td>{new Date(game.completed_at).toLocaleDateString()}</td>
                  <td>${parseFloat(game.start_balance).toLocaleString()}</td>
                  <td>${parseFloat(game.end_balance).toLocaleString()}</td>
                  <td>{parseFloat(game.profit_rate).toFixed(2)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;