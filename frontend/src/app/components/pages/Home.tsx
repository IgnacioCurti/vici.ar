import { Link } from "react-router-dom";
import "../../styles/homeStyles.css";

const Home = () => {
  return (
    <div className="buttons-container">
      <Link to="/login">
        <button className="login-button">Iniciar sesión</button>
      </Link>

      <Link to="/register">
        <button className="register-button">Registrarse</button>
      </Link>
    </div>
  );
};

export default Home;
