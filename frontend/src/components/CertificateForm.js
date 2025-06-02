import React, { useState } from 'react';
import { Form, Button, Row, Col, Card, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import TemplateManager from './TemplateManager';

function CertificateForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: 'Certificate of Appreciation',
    firstName: 'John',
    lastName: 'Doe',
    organization: 'ABC Company',
    certifiedFor: 'Outstanding Performance',
    assignedDate: new Date(),
    duration: '1 year',
    recipientEmail: 'john.doe@example.com',
    templateType: 'classic',
    customTemplate: null
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showTemplateManager, setShowTemplateManager] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleDateChange = (date) => {
    setFormData(prevState => ({
      ...prevState,
      assignedDate: date
    }));
  };

  const handleTemplateSelect = (templateType, templateData = null) => {
    setFormData(prevState => ({
      ...prevState,
      templateType,
      customTemplate: templateType === 'custom' ? templateData : null
    }));
    
    if (templateType === 'custom' && templateData) {
      setShowTemplateManager(false);
    }
  };
  
  const handleOpenTemplateManager = () => {
    setShowTemplateManager(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('/api/certificates', formData);
      setLoading(false);
      navigate(`/preview/${response.data._id}`);
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || 'Error creating certificate. Please try again.');
    }
  };

  return (
    <div className="certificate-form">
      <h2 className="text-center mb-4">Generate a Certificate</h2>
      
      {error && <div className="alert alert-danger">{error}</div>}
      
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Certificate Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="e.g. Certificate of Appreciation"
              />
            </Form.Group>
          </Col>
          
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Organization Name</Form.Label>
              <Form.Control
                type="text"
                name="organization"
                value={formData.organization}
                onChange={handleChange}
                required
                placeholder="e.g. ABC Company"
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                placeholder="Recipient's first name"
              />
            </Form.Group>
          </Col>
          
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                placeholder="Recipient's last name"
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Certified For</Form.Label>
          <Form.Control
            type="text"
            name="certifiedFor"
            value={formData.certifiedFor}
            onChange={handleChange}
            required
            placeholder="e.g. Outstanding Performance"
          />
        </Form.Group>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Assigned Date</Form.Label>
              <DatePicker
                selected={formData.assignedDate}
                onChange={handleDateChange}
                className="form-control"
                dateFormat="MMMM d, yyyy"
                required
              />
            </Form.Group>
          </Col>
          
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Duration</Form.Label>
              <Form.Control
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                required
                placeholder="e.g. 3 months, 1 year"
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Recipient Email</Form.Label>
          <Form.Control
            type="email"
            name="recipientEmail"
            value={formData.recipientEmail}
            onChange={handleChange}
            required
            placeholder="e.g. recipient@example.com"
          />
        </Form.Group>

        <h4 className="mt-4 mb-3">Select Certificate Template</h4>
        <div className="template-selector">
          <Card 
            className={`template-option ${formData.templateType === 'classic' ? 'selected' : ''}`}
            onClick={() => handleTemplateSelect('classic')}
          >
            <div className="template-image">Classic</div>
            <Card.Body>
              <Card.Title>Classic</Card.Title>
              <Card.Text>Traditional and elegant design with ornamental borders</Card.Text>
            </Card.Body>
          </Card>

          <Card 
            className={`template-option ${formData.templateType === 'modern' ? 'selected' : ''}`}
            onClick={() => handleTemplateSelect('modern')}
          >
            <div className="template-image">Modern</div>
            <Card.Body>
              <Card.Title>Modern</Card.Title>
              <Card.Text>Contemporary design with bold colors and typography</Card.Text>
            </Card.Body>
          </Card>

          <Card 
            className={`template-option ${formData.templateType === 'minimalistic' ? 'selected' : ''}`}
            onClick={() => handleTemplateSelect('minimalistic')}
          >
            <div className="template-image">Minimalistic</div>
            <Card.Body>
              <Card.Title>Minimalistic</Card.Title>
              <Card.Text>Clean and simple design with minimal elements</Card.Text>
            </Card.Body>
          </Card>

          <Card 
            className={`template-option ${formData.templateType === 'custom' ? 'selected' : ''}`}
            onClick={handleOpenTemplateManager}
          >
            <div className="template-image">
              {formData.customTemplate ? (
                <img 
                  src={formData.customTemplate.url} 
                  alt="Custom Template Preview" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : 'Custom'}
            </div>
            <Card.Body>
              <Card.Title>Custom Template</Card.Title>
              <Card.Text>
                {formData.customTemplate 
                  ? formData.customTemplate.name 
                  : 'Upload your own template'}
              </Card.Text>
            </Card.Body>
          </Card>
        </div>

        <div className="mt-4 text-center">
          <Button 
            variant="primary" 
            size="lg" 
            type="submit" 
            className="btn-generate"
            disabled={loading}
          >
            {loading ? 'Generating...' : 'Generate Certificate'}
          </Button>
        </div>
      </Form>
      
      <TemplateManager 
        show={showTemplateManager} 
        onClose={() => setShowTemplateManager(false)}
        onSelect={(template) => handleTemplateSelect('custom', template)}
      />
    </div>
  );
}

export default CertificateForm;
