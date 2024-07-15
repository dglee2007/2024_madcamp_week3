import React from 'react';
import PropTypes from 'prop-types';

function CompanyList({ companies }) {
  console.log('CompanyList companies:', companies); // 로그 추가

  if (!companies || companies.length === 0) {
    return <div>회사 정보가 없습니다.</div>;
  }

  return (
    <div>
      <h2>회사 목록</h2>
      <ul>
        {companies.map(company => (
          <li key={company.company_id}>
            {company.name} - 가격: ${company.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

CompanyList.propTypes = {
  companies: PropTypes.arrayOf(PropTypes.shape({
    company_id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
  })).isRequired,
};

export default CompanyList;
