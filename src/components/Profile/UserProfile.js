import React, { useEffect, useState } from 'react';
import api from '../../services/api';

function UserProfile({ userId }) {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const response = await api.get(`/profile/${userId}`);
      setProfileData(response.data);
    } catch (error) {
      console.error('Failed to fetch profile data:', error);
    }
  };

  if (!profileData) return <div>Loading...</div>;

  return (
    <div className="user-profile">
      <h2>{profileData.userInfo.username}'s Profile</h2>
      <p>Best Profit Rate: {profileData.userInfo.best_profit_rate}%</p>
      <p>Total Games: {profileData.userInfo.total_games}</p>
      <p>Cumulative Profit Rate: {profileData.userInfo.cumulative_profit_rate}%</p>
      <h3>Game History</h3>
      {/* Display game history here */}
    </div>
  );
}

export default UserProfile;