import { Link } from "react-router-dom";
import { Button} from "@heroui/react";
import "../../styles/homeStyles.css";

const Home = () => {
  return (
    <div className="buttons-container">
      <Link to="/login">
        <Button color="primary">Iniciar sesión</Button>
      </Link>

      <Link to="/register">
        <Button color="secondary">Registrarse</Button>
      </Link>
    </div>
  );
};

export default Home;
