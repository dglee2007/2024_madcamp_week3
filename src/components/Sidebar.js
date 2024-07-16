// src/components/Sidebar.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Sidebar = ({ additionalButtons }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="sidebar">
      <button className="sidebar-button" onClick={() => navigate('/main')}>Back to Main Menu</button>
      <button className="sidebar-button" onClick={handleLogout}>Logout</button>
      {additionalButtons && additionalButtons.map((button, index) => (
        <button key={index} className="sidebar-button" onClick={button.onClick}>{button.label}</button>
      ))}
    </div>
  );
};

export default Sidebar;
