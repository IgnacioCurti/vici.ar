import { useState } from "react";
import { Button } from "@heroui/react";
import RegisterModal from "../auth/RegisterModal";
import "../../styles/homeStyles.css";
import LoginModal from "../auth/LoginModal";

const Home = () => {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

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
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
};

export default Home;
