import React from 'react';
import PropTypes from 'prop-types';

function InvestmentInfo({ investments }) {
  console.log('InvestmentInfo investments:', investments); // 로그 추가

  if (!investments) {
    return <div>투자 정보를 불러올 수 없습니다.</div>;
  }

  return (
    <div>
      <h2>투자 정보</h2>
      {investments.length === 0 ? (
        <p>현재 투자 내역이 없습니다.</p>
      ) : (
        <ul>
          {investments.map((investment, index) => (
            <li key={index}>
              {investment.name}: {investment.amount}주
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

InvestmentInfo.propTypes = {
  investments: PropTypes.arrayOf(PropTypes.shape({
    company_id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    price_per_stock: PropTypes.string.isRequired,
  })).isRequired,
};

export default InvestmentInfo;
