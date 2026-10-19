import { useState } from "react";
import { Button } from "@heroui/react";
import { useLocation, useNavigate } from "react-router-dom";
import RegisterModal from "../auth/RegisterModal";
import "../../styles/homeStyles.css";
import LoginModal from "../auth/LoginModal";

const Home = () => {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const shouldOpenLogin = isLoginOpen || location.state?.openLogin === true;

  const handleCloseLogin = () => {
    setIsLoginOpen(false);
    if (location.state?.openLogin) {
      navigate(location.pathname, { replace: true, state: null });
    }
  };

  return (
    <>
      <div className='buttons-container'>
        <Button color='primary' onPress={() => setIsLoginOpen(true)}>
          Iniciar sesión
        </Button>

        <Button color='secondary' onPress={() => setIsRegisterOpen(true)}>
          Registrarse
        </Button>
      </div>

      <RegisterModal isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} />
      <LoginModal isOpen={shouldOpenLogin} onClose={handleCloseLogin} />
    </>
  );
};

export default Home;
