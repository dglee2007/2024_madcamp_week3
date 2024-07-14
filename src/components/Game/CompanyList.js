import React from 'react';

const CompanyList = ({ companies, onCompanyClick }) => {
  return (
    <div className="company-list">
      <div className="company-icons">
        {companies.map((company, index) => (
          <img 
            key={company.id}
            src={`/assets/company${index + 1}.png`}
            alt={company.name}
            onClick={() => onCompanyClick(company)}
          />
        ))}
      </div>
      <table>
        <thead>
          <tr>
            <th>Company</th>
            <th>Stock Price</th>
          </tr>
        </thead>
        <tbody>
          {companies.map(company => (
            <tr key={company.id}>
              <td>{company.name}</td>
              <td>${company.price.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompanyList;