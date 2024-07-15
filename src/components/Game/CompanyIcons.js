import React from 'react';

function CompanyIcons({ companies, onIconClick }) {
  return (
    <div className="company-icons">
      {companies.map((company) => (
        <div 
          key={company.id} 
          className="company-icon" 
          onClick={() => onIconClick(company.id)}
        >
          <img src={`/assets/Company${company.id}.png`} alt={company.name} />
          <p>{company.name}</p>
          <p>${company.price}</p>
        </div>
      ))}
    </div>
  );
}

export default CompanyIcons;
