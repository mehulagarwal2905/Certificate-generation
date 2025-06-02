import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col, Card, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';

const TemplateManager = ({ show, onClose, onSelect }) => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  const [templateName, setTemplateName] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadError, setUploadError] = useState('');

  useEffect(() => {
    if (show) {
      fetchTemplates();
    }
  }, [show]);

  const fetchTemplates = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/templates');
      setTemplates(response.data);
      setError('');
    } catch (err) {
      console.error('Error fetching templates:', err);
      setError('Failed to load templates. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const filetypes = /jpeg|jpg|png|gif/;
      const extname = filetypes.test(file.name.toLowerCase());
      
      if (!extname) {
        setUploadError('Only image files (JPEG, JPG, PNG, GIF) are allowed');
        return;
      }
      
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        setUploadError('File size must be less than 10MB');
        return;
      }
      
      setSelectedFile(file);
      setUploadError('');
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !templateName.trim()) {
      setUploadError('Please provide both a name and select a file');
      return;
    }

    const formData = new FormData();
    formData.append('template', selectedFile);
    formData.append('name', templateName);

    try {
      setUploading(true);
      await axios.post('/api/templates', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      // Refresh templates
      await fetchTemplates();
      setTemplateName('');
      setSelectedFile(null);
      setUploadError('');
    } catch (err) {
      console.error('Error uploading template:', err);
      setUploadError(err.response?.data?.message || 'Error uploading template');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this template? This action cannot be undone.')) {
      try {
        await axios.delete(`/api/templates/${id}`);
        // Refresh templates
        await fetchTemplates();
      } catch (err) {
        console.error('Error deleting template:', err);
        setError('Failed to delete template');
      }
    }
  };

  return (
    <Modal show={show} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Manage Templates</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>Upload New Template</h5>
        <Form className="mb-4">
          <Row>
            <Col md={5}>
              <Form.Group controlId="templateName" className="mb-3">
                <Form.Label>Template Name</Form.Label>
                <Form.Control
                  type="text"
                  value={templateName}
                  onChange={(e) => setTemplateName(e.target.value)}
                  placeholder="Enter template name"
                  disabled={uploading}
                />
              </Form.Group>
            </Col>
            <Col md={5}>
              <Form.Group controlId="templateFile" className="mb-3">
                <Form.Label>Template Image</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  disabled={uploading}
                />
                <Form.Text className="text-muted">
                  Max size: 10MB. Supported formats: JPG, PNG, GIF
                </Form.Text>
              </Form.Group>
            </Col>
            <Col md={2} className="d-flex align-items-end">
              <Button 
                variant="primary" 
                onClick={handleUpload}
                disabled={!selectedFile || !templateName.trim() || uploading}
              >
                {uploading ? 'Uploading...' : 'Upload'}
              </Button>
            </Col>
          </Row>
          {uploadError && <Alert variant="danger">{uploadError}</Alert>}
        </Form>

        <hr />
        
        <h5>Available Templates</h5>
        {loading ? (
          <div className="text-center my-4">
            <Spinner animation="border" />
            <p>Loading templates...</p>
          </div>
        ) : error ? (
          <Alert variant="danger">{error}</Alert>
        ) : templates.length === 0 ? (
          <p>No templates available. Upload a template to get started.</p>
        ) : (
          <Row>
            {templates.map((template) => (
              <Col md={6} key={template.id} className="mb-3">
                <Card>
                  <Card.Img 
                    variant="top" 
                    src={template.url} 
                    style={{ height: '150px', objectFit: 'contain', backgroundColor: '#f8f9fa' }}
                  />
                  <Card.Body>
                    <Card.Title>{template.name}</Card.Title>
                    <div className="d-flex justify-content-between">
                      <Button 
                        variant="outline-primary" 
                        size="sm"
                        onClick={() => onSelect(template)}
                      >
                        Use Template
                      </Button>
                      <Button 
                        variant="outline-danger" 
                        size="sm"
                        onClick={() => handleDelete(template.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TemplateManager;
