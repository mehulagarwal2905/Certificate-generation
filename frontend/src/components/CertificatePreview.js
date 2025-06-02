import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';
import html2pdf from 'html2pdf.js';
import ClassicTemplate from '../templates/ClassicTemplate';
import ModernTemplate from '../templates/ModernTemplate';
import MinimalisticTemplate from '../templates/MinimalisticTemplate';

function CertificatePreview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [certificate, setCertificate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCertificate = async () => {
      try {
        const response = await axios.get(`/api/certificates/${id}`);
        setCertificate(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load certificate. Please try again.');
        setLoading(false);
      }
    };

    fetchCertificate();
  }, [id]);

  const renderTemplate = () => {
    if (!certificate) return null;

    switch (certificate.templateType) {
      case 'modern':
        return <ModernTemplate certificate={certificate} />;
      case 'minimalistic':
        return <MinimalisticTemplate certificate={certificate} />;
      case 'classic':
      default:
        return <ClassicTemplate certificate={certificate} />;
    }
  };

  const handleDownloadPDF = () => {
    const element = document.getElementById('certificate-container');
    const opt = {
      margin: 0,
      filename: `${certificate.firstName}_${certificate.lastName}_Certificate.pdf`,
      image: { type: 'jpeg', quality: 1 },
      html2canvas: { 
        scale: 2, 
        useCORS: true,
        width: 1123,  // A4 width in pixels at 96 DPI (297mm)
        height: 794,  // A4 height in pixels at 96 DPI (210mm)
        windowWidth: 1123,
        windowHeight: 794
      },
      jsPDF: { 
        unit: 'mm', 
        format: 'a4', 
        orientation: 'landscape',
        hotfixes: ['px_scaling']
      }
    };

    // Ensure the element is visible and properly sized before generating PDF
    const originalDisplay = element.style.display;
    element.style.display = 'block';
    
    html2pdf()
      .set(opt)
      .from(element)
      .save()
      .then(() => {
        element.style.display = originalDisplay;
      });
  };



  const handleCreateNew = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-2">Loading certificate...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="mt-4">
        {error}
        <div className="mt-3">
          <Button variant="primary" onClick={handleCreateNew}>
            Create New Certificate
          </Button>
        </div>
      </Alert>
    );
  }

  return (
    <div className="certificate-preview">
      <h2 className="text-center mb-4">Certificate Preview</h2>
      

      
      <div className="certificate-container mb-4">
        {renderTemplate()}
      </div>
      
      <div className="preview-controls">
        <Button 
          variant="primary" 
          className="btn-download" 
          onClick={handleDownloadPDF}
        >
          Download PDF
        </Button>
        
        <Button 
          variant="outline-primary" 
          onClick={handleCreateNew}
        >
          Create New Certificate
        </Button>
      </div>
    </div>
  );
}

export default CertificatePreview;
