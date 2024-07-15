import React from 'react';

function CompanyIcons({ onIconClick }) {
  const icons = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <div className="company-icons">
      {icons.map((icon) => (
        <img
          key={icon}
          src={`/assets/company${icon}.png`}
          alt={`Company ${icon}`}
          onClick={() => onIconClick(icon)}
        />
      ))}
    </div>
  );
}

export default CompanyIcons;