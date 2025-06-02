import React from 'react';

const ClassicTemplate = ({ certificate }) => {
  const formattedDate = new Date(certificate.assignedDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="certificate classic" id="certificate-container">
      <div className="certificate-border">
        <div className="certificate-content">
          <h1 className="title">{certificate.title}</h1>
          
          <div className="certificate-body">
            <p className="certificate-text">This is to certify that</p>
            <h2 className="recipient-name">{certificate.firstName} {certificate.lastName}</h2>
            <p className="certificate-text">
              has successfully completed {certificate.duration} of
            </p>
            <p className="certificate-text">
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
      </div>
    </div>
  );
};

export default ClassicTemplate;
