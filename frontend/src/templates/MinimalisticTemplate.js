import React from 'react';

const MinimalisticTemplate = ({ certificate }) => {
  const formattedDate = new Date(certificate.assignedDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="certificate minimalistic" id="certificate-container">
      <h1 className="title">{certificate.title}</h1>
      
      <div className="certificate-content">
        <h2 className="recipient-name">{certificate.firstName} {certificate.lastName}</h2>
        <p className="certificate-text">
          has successfully completed {certificate.duration} of training in<br />
          <strong>{certificate.certifiedFor}</strong>
        </p>
        <p className="certificate-text">
          Awarded on {formattedDate}
        </p>
      </div>
      
      <div className="certificate-footer">
        <div className="signature-line"></div>
        <p className="organization">{certificate.organization}</p>
      </div>
    </div>
  );
};

export default MinimalisticTemplate;
