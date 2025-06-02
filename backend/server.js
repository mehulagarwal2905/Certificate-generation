require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' })); // Increase payload size limit for PDF data

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
app.use('/api/certificates', certificateRoutes);

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
