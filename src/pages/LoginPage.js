import React from 'react';
import Login from '../components/Auth/Login';
import { Link } from 'react-router-dom';

function LoginPage() {
  return (
    <div>
      <h1>주식 거래 게임</h1>
      <Login />
      <p>계정이 없으신가요? <Link to="/register">회원가입</Link></p>
    </div>
  );
}

export default LoginPage;