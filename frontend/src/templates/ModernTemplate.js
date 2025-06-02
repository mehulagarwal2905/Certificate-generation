import React from 'react';

const ModernTemplate = ({ certificate }) => {
  const formattedDate = new Date(certificate.assignedDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="modern-certificate" id="certificate-container">
      <div className="modern-content">
        <div className="modern-header">
          <h1 className="modern-title">{certificate.title}</h1>
        </div>
        
        <div className="modern-body">
          <p className="modern-text">This certificate is proudly presented to</p>
          <h2 className="modern-recipient">{certificate.firstName} {certificate.lastName}</h2>
          
          <div className="modern-details">
            <p className="modern-text">
              in recognition of successfully completing
            </p>
            <p className="modern-achievement">
              {certificate.certifiedFor}
            </p>
            {certificate.duration && (
              <p className="modern-duration">
                Duration: {certificate.duration}
              </p>
            )}
            <p className="modern-date">
              Issued on: {formattedDate}
            </p>
          </div>
          
          <div className="modern-signature">
            <div className="signature-line"></div>
            <p className="organization">{certificate.organization}</p>
          </div>
        </div>
        
        <div className="modern-footer">
          <p>This certificate is proudly issued by {certificate.organization}</p>
        </div>
      </div>
    </div>
  );
};

export default ModernTemplate;