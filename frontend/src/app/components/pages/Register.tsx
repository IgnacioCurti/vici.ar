import React from "react";
import { useNavigate } from "react-router-dom";
import  "../../styles/RegisterForm.css";

const RegisterFormSimple: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // acá después iría la lógica real de registro
    console.log("Registro enviado");

    // prueba de routing
    navigate("/");
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="title">Crear cuenta</h2>

        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              className="input"
              required
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              placeholder="Contraseña"
              className="input"
              required
            />
          </div>

          <button type="submit" className="button">
            Continuar
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterFormSimple;
