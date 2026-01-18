import "../../styles/navbar.css";

interface NavbarProps {
  className?: string;
  onLoginClick?: () => void;
  onRegisterClick?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ className = "" }) => {
  return (
    <nav className={`navbar ${className}`}>
      <div className="navbar-container">
        <div className="navbar-logo">
          <a href="/" aria-label="VICI.AR - Inicio">
            <span className="logo-text">VICI</span>
            <span className="logo-dot">.</span>
            <span className="logo-ar">AR</span>
          </a>
        </div>

        <div className="navbar-actions">
          <button
            className="btn btn-primary"
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
