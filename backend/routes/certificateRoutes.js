const express = require('express');
const router = express.Router();
const certificateController = require('../controllers/certificateController');

// Create a new certificate
router.post('/', certificateController.createCertificate);

// Get all certificates
router.get('/', certificateController.getAllCertificates);

// Get a single certificate by ID
router.get('/:id', certificateController.getCertificateById);

// Send certificate via email
router.post('/send-email', certificateController.sendCertificateEmail);

module.exports = router;
