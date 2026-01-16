import React, { useState } from 'react';
import '../styles/navbar.css';

interface NavbarProps {
  className?: string;
  onLoginClick?: () => void;
  onRegisterClick?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ 
  className = '',
  onLoginClick,
  onRegisterClick 
}) => {
  const handleLogin = () => {
    if (onLoginClick) {
      onLoginClick();
    } else {
      console.log('Redirigiendo a login...');
    }
  };

  const handleRegister = () => {
    if (onRegisterClick) {
      onRegisterClick();
    } else {
      console.log('Redirigiendo a registro...');
    }
  };

  return (
    <nav className={`navbar ${className}`}>
      <div className="navbar-container">
        <div className="navbar-logo">
          <a 
            href="/" 
            onClick={(e: React.MouseEvent) => {
              e.preventDefault();
              console.log('Navegando a inicio...');
            }}
            aria-label="VICI.AR - Inicio"
          >
            <span className="logo-text">VICI</span>
            <span className="logo-dot">.</span>
            <span className="logo-ar">AR</span>
          </a>
        </div>

        <div className="navbar-actions">
          <button 
            className="btn btn-primary" 
            onClick={handleRegister}
            type="button"
            aria-label="Registrarse"
          >
            Registrarse
          </button>
        </div>
      </div>
    </nav>
    
  );
};

export default Navbar;