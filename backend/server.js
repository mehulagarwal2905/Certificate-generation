require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const fs = require('fs');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, 'uploads/templates');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'));
    }
  }
});

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' })); // Increase payload size limit for PDF data
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve uploaded files

// Create a simple in-memory database that persists between requests
// This is attached directly to the app object to ensure it's available throughout the request lifecycle
if (!app.locals.db) {
  app.locals.db = {
    certificates: [],
    nextId: 1
  };
  console.log('Database initialized');
}

// Middleware to make the database available in the request object
app.use((req, res, next) => {
  req.db = app.locals.db;
  next();
});

// Simple request logger middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Routes
const certificateRoutes = require('./routes/certificateRoutes');
const templateRoutes = require('./routes/templateRoutes');

app.use('/api/certificates', certificateRoutes);
app.use('/api/templates', templateRoutes);

// Simple test endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!', certificateCount: req.db.certificates.length });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
