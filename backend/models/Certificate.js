const mongoose = require('mongoose');

const CertificateSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  organization: {
    type: String,
    required: true,
    trim: true
  },
  certifiedFor: {
    type: String,
    required: true,
    trim: true
  },
  assignedDate: {
    type: Date,
    required: true
  },
  duration: {
    type: String,
    required: true,
    trim: true
  },
  recipientEmail: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  templateType: {
    type: String,
    required: true,
    enum: ['classic', 'modern', 'minimalistic'],
    default: 'classic'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Certificate', CertificateSchema);
