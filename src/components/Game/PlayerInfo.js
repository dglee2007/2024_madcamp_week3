import React from 'react';
import PropTypes from 'prop-types';

function PlayerInfo({ session }) {
  console.log('PlayerInfo session:', session); // 로그 추가

  if (!session) {
    return <div>플레이어 정보를 불러올 수 없습니다.</div>;
  }

  return (
    <div>
      <h2>플레이어 정보</h2>원
      <p>현재 잔액: ${session.current_balance}</p>
      <p>현재 연도: {session.current_year}</p>
    </div>
  );
}

PlayerInfo.propTypes = {
  session: PropTypes.shape({
    session_id: PropTypes.number.isRequired,
    user_id: PropTypes.number.isRequired,
    start_balance: PropTypes.string.isRequired,
    current_balance: PropTypes.string.isRequired,
    current_year: PropTypes.number.isRequired,
    is_active: PropTypes.number.isRequired,
    created_at: PropTypes.string.isRequired,
    completed_at: PropTypes.string,
  }).isRequired,
};

export default PlayerInfo;
