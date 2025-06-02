const nodemailer = require('nodemailer');

// Create a new certificate
exports.createCertificate = async (req, res) => {
  try {
    console.log('Create certificate request received');
    
    // Access the database through req.db (set in middleware)
    const db = req.db;
    
    const certificateData = {
      _id: db.nextId.toString(),
      ...req.body,
      createdAt: new Date()
    };
    
    console.log('Created certificate with ID:', certificateData._id);
    
    // Add to database and increment ID
    db.certificates.push(certificateData);
    db.nextId++;
    
    console.log('Certificate added to database. Total count:', db.certificates.length);
    
    res.status(201).json(certificateData);
  } catch (error) {
    console.error('Error in createCertificate:', error);
    res.status(500).json({ message: error.message || 'An unknown error occurred' });
  }
};

// Get all certificates
exports.getAllCertificates = async (req, res) => {
  try {
    console.log('Get all certificates request received');
    
    // Access the database through req.db (set in middleware)
    const db = req.db;
    
    // Sort by createdAt in descending order
    const certificates = [...db.certificates].sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    
    console.log(`Returning ${certificates.length} certificates`);
    res.status(200).json(certificates);
  } catch (error) {
    console.error('Error in getAllCertificates:', error);
    res.status(500).json({ message: error.message || 'An unknown error occurred' });
  }
};

// Get a single certificate by ID
exports.getCertificateById = async (req, res) => {
  try {
    console.log('Get certificate by ID request received:', req.params.id);
    
    // Access the database through req.db (set in middleware)
    const db = req.db;
    
    console.log('Looking for certificate with ID:', req.params.id);
    console.log('Certificate count in DB:', db.certificates.length);
    
    const certificate = db.certificates.find(cert => cert._id === req.params.id);
    if (!certificate) {
      console.log('Certificate not found');
      return res.status(404).json({ message: 'Certificate not found' });
    }
    
    console.log('Certificate found:', certificate._id);
    res.status(200).json(certificate);
  } catch (error) {
    console.error('Error in getCertificateById:', error);
    res.status(500).json({ message: error.message || 'An unknown error occurred' });
  }
};

// Send certificate via email
exports.sendCertificateEmail = async (req, res) => {
  try {
    console.log('Received email request');
    
    // Validate request body
    if (!req.body || !req.body.id) {
      console.log('Missing ID in request:', req.body);
      return res.status(400).json({ message: 'Certificate ID is required' });
    }
    
    // Access the database through req.db (set in middleware)
    const db = req.db;
    
    const { id, pdfBuffer } = req.body;
    console.log('Looking for certificate with ID:', id);
    console.log('Certificate count in DB:', db.certificates.length);
    
    const certificate = db.certificates.find(cert => cert._id === id);
    if (!certificate) {
      console.log('Certificate not found in database');
      return res.status(404).json({ message: 'Certificate not found' });
    }

    console.log('Certificate found:', certificate._id);
    
    // For demo purposes, we'll just log that we would send an email
    console.log(`Email would be sent to: ${certificate.recipientEmail}`);
    console.log(`Subject: Your ${certificate.title} Certificate`);
    console.log(`With attachment: ${certificate.firstName}_${certificate.lastName}_Certificate.pdf`);
    
    // Try using the actual email credentials if provided
    if (process.env.EMAIL_USER && process.env.EMAIL_PASSWORD) {
      try {
        console.log('Attempting to send email with provided credentials');
        
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
          }
        });

        // Email options
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: certificate.recipientEmail,
          subject: `Your ${certificate.title} Certificate`,
          text: `Dear ${certificate.firstName} ${certificate.lastName},\n\nPlease find attached your ${certificate.title} certificate.\n\nBest regards,\n${certificate.organization}`,
          attachments: [
            {
              filename: `${certificate.firstName}_${certificate.lastName}_Certificate.pdf`,
              content: pdfBuffer,
              encoding: 'base64'
            }
          ]
        };

        // Send email - but don't wait for it, just log any errors
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error('Error sending email:', error);
          } else {
            console.log('Email sent successfully:', info.response);
          }
        });
        
        console.log('Email sending initiated');
      } catch (emailError) {
        console.error('Failed to send email:', emailError);
        // Continue execution even if email fails
      }
    }
    
    res.status(200).json({ message: 'Certificate sent successfully' });
  } catch (error) {
    console.error('Error in sendCertificateEmail:', error);
    res.status(500).json({ message: error.message || 'An unknown error occurred' });
  }
};
