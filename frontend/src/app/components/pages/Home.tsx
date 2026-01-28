import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@heroui/react";
import RegisterModal from "../auth/RegisterModal";
import "../../styles/homeStyles.css";

const Home = () => {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  return (
    <>
      <div className="buttons-container">
        <Link to="/login">
          <Button color="primary">Iniciar sesión</Button>
        </Link>

        <Button
          color="secondary"
          onPress={() => setIsRegisterOpen(true)}
        >
          Registrarse
        </Button>
      </div>

      {/* MODAL */}
      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
      />
    </>
  );
};

export default Home;
