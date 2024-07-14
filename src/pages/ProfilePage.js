import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getUserProfile } from '../services/api';

const ProfilePage = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const response = await getUserProfile(user.id);
      setProfile(response.data);
    } catch (error) {
      console.error('Failed to fetch profile:', error);
    }
  };

  if (!profile) return <div>Loading...</div>;

  return (
    <div>
      <h1>My Profile</h1>
      <p>Username: {profile.userInfo.username}</p>
      <p>Best Profit Rate: {profile.userInfo.best_profit_rate}%</p>
      <p>Total Games: {profile.userInfo.total_games}</p>
      <p>Cumulative Profit Rate: {profile.userInfo.cumulative_profit_rate}%</p>
      <p>Max Money: ${profile.maxMoney}</p>

      <h2>Game History</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Start Balance</th>
            <th>End Balance</th>
            <th>Profit Rate</th>
          </tr>
        </thead>
        <tbody>
          {profile.gameHistory.map((game) => (
            <tr key={game.session_id}>
              <td>{new Date(game.completed_at).toLocaleDateString()}</td>
              <td>${game.start_balance}</td>
              <td>${game.end_balance}</td>
              <td>{game.profit_rate.toFixed(2)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProfilePage;