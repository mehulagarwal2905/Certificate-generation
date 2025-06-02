const path = require('path');
const fs = require('fs');

// Upload a new template
exports.uploadTemplate = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // The file is already saved by multer, just return the URL
    const fileUrl = `/uploads/templates/${req.file.filename}`;
    
    // Store template info in the database
    const templateData = {
      id: Date.now().toString(),
      name: req.body.name || 'Custom Template',
      filename: req.file.filename,
      url: fileUrl,
      createdAt: new Date()
    };

    // Add to database
    if (!req.db.templates) {
      req.db.templates = [];
    }
    
    req.db.templates.push(templateData);
    
    res.status(201).json({
      message: 'Template uploaded successfully',
      template: templateData
    });
  } catch (error) {
    console.error('Error uploading template:', error);
    res.status(500).json({ 
      message: 'Error uploading template',
      error: error.message 
    });
  }
};

// Get all templates
exports.getAllTemplates = async (req, res) => {
  try {
    const templates = req.db.templates || [];
    res.status(200).json(templates);
  } catch (error) {
    console.error('Error fetching templates:', error);
    res.status(500).json({ 
      message: 'Error fetching templates',
      error: error.message 
    });
  }
};

// Delete a template
exports.deleteTemplate = async (req, res) => {
  try {
    const { id } = req.params;
    const templateIndex = req.db.templates?.findIndex(t => t.id === id);
    
    if (templateIndex === -1 || templateIndex === undefined) {
      return res.status(404).json({ message: 'Template not found' });
    }
    
    const template = req.db.templates[templateIndex];
    
    // Delete the file
    const filePath = path.join(__dirname, '..', 'uploads', 'templates', template.filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    
    // Remove from database
    req.db.templates.splice(templateIndex, 1);
    
    res.status(200).json({ message: 'Template deleted successfully' });
  } catch (error) {
    console.error('Error deleting template:', error);
    res.status(500).json({ 
      message: 'Error deleting template',
      error: error.message 
    });
  }
};
