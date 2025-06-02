import React from 'react';

const CustomTemplate = ({ certificate }) => {
  const formattedDate = new Date(certificate.assignedDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // If we have a custom template, render it with the certificate details overlaid
  if (certificate.customTemplate) {
    return (
      <div className="custom-template-container" id="certificate-container">
        <div className="template-image-wrapper">
          <img 
            src={certificate.customTemplate.url} 
            alt="Certificate Template" 
            className="template-background"
          />
          <div className="certificate-overlay">
            <div className="overlay-content">
              <h1 className="certificate-title">{certificate.title}</h1>
              <p className="presented-to">This certificate is proudly presented to</p>
              <h2 className="recipient-name">
                {certificate.firstName} {certificate.lastName}
              </h2>
              <p className="certified-for">
                {certificate.certifiedFor}
              </p>
              <div className="certificate-details">
                <p>Date: {formattedDate}</p>
                {certificate.duration && <p>Duration: {certificate.duration}</p>}
                <p className="organization">{certificate.organization}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Fallback to a simple certificate if no custom template is provided
  return (
    <div className="simple-certificate" id="certificate-container">
      <div className="certificate-content">
        <h1>{certificate.title}</h1>
        <p>This certificate is presented to</p>
        <h2>{certificate.firstName} {certificate.lastName}</h2>
        <p>for {certificate.certifiedFor}</p>
        <p>Date: {formattedDate}</p>
        {certificate.duration && <p>Duration: {certificate.duration}</p>}
        <p>Issued by: {certificate.organization}</p>
      </div>
    </div>
  );
};

export default CustomTemplate;
