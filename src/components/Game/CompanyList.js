import React from 'react';

const CompanyList = ({ companies }) => {
  return (
    <div className="company-list">
      <table>
        <thead>
          <tr>
            <th>Company</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company) => (
            <tr key={company.id}>
              <td>{company.name}</td>
              <td>${company.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompanyList;