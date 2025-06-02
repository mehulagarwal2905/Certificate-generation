import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-dark text-white py-3">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          <Link to="/" className="text-white text-decoration-none">
            <h1 className="m-0">Certificate Generator</h1>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
