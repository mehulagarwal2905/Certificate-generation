import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CertificateForm from './components/CertificateForm';
import CertificatePreview from './components/CertificatePreview';
import Header from './components/Header';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<CertificateForm />} />
            <Route path="/preview/:id" element={<CertificatePreview />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
