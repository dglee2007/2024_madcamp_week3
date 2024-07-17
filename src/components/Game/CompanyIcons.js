import React from 'react';
import company1 from '../../assets/company1.png';
import company2 from '../../assets/company2.png';
import company3 from '../../assets/company3.png';
import company4 from '../../assets/company4.png';
import company5 from '../../assets/company5.png';
import company6 from '../../assets/company6.png';
import company7 from '../../assets/company7.png';
import company8 from '../../assets/company8.png';
import company9 from '../../assets/company9.png';
import company10 from '../../assets/company10.png';
import company11 from '../../assets/company11.png';
import company12 from '../../assets/company12.png';

const companyIcons = {
  company1, company2, company3, company4, company5, company6, company7, company8, company9, company10, company11, company12, 
}

function CompanyIcons({ companies, onIconClick, iconMapping }) {
  console.log('Companies in CompanyIcons:', companies);
  console.log('Icon mapping in CompanyIcons:', iconMapping);
  
  return (
    <div className="company-icons-grid" style={{
      display: 'grid',
      gridTemplateRows: `repeat(3, 1fr)`,
      gridTemplateColumns: `repeat(4, 1fr)`,
      gap: '10px'
    }}>
      {companies.map((company) => (
        <div key={company.company_id} onClick={() => onIconClick(company.company_id)}>
          <img 
            src={companyIcons[iconMapping[company.company_id]] || companyIcons.company1} 
            alt={company.name} 
            style={{width: '50px', height: '50px'}}
          />
          <div>{company.name}</div>
        </div>
      ))}
    </div>
  );
}

export default CompanyIcons;
