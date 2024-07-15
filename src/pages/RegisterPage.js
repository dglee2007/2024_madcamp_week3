import React from 'react';
import Register from '../components/Auth/Register';
import { Link } from 'react-router-dom';

function RegisterPage() {
  return (
    <div>
      <h1>회원가입</h1>
      <Register />
      <p>이미 계정이 있으신가요? <Link to="/login">로그인</Link></p>
    </div>
  );
}

export default RegisterPage;