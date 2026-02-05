import type React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { useAuth } from "../../../hooks/useAuth";
import Swal from "sweetalert2";

import {
  Button,
  Form,
  Input,
  Modal,
  ModalBody,
  ModalContent,
} from "@heroui/react";

import { XMarkIcon } from "@heroicons/react/24/outline";
import logo from "../../../assets/Logo-removebg-preview.png";

type LoginModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const formData = Object.fromEntries(new FormData(e.currentTarget));
    const email = formData.email as string;
    const password = formData.password as string;

    try {
      await login({ email, password });

      const profile = {
        username: email.split("@")[0],
        displayName: email.split("@")[0],
        email,
        description: "",
      };

      localStorage.setItem("profile", JSON.stringify(profile));
      Swal.fire({
        icon: "success",
        title: "Bienvenido a VICI.AR",
        text: "Inicio de sesión exitoso",
        timer: 2000,
        showConfirmButton: false,
      });

      onClose();
      navigate("/");
    } catch (err) {
      let errorMessage = "Error al iniciar sesión";

      if (axios.isAxiosError(err)) {
        errorMessage = err.response?.data?.message || errorMessage;
      }

      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      hideCloseButton
      backdrop="blur"
      placement="center"
    >
      <ModalContent className="bg-background relative z-10 w-full max-w-112.5 rounded-xl shadow-2xl p-8">
        <ModalBody className="flex justify-center">
          {/* Botón cerrar */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-6 right-6 text-[--color-foreground]/70 hover:text-[--color-foreground] transition z-10"
            aria-label="Cerrar"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>

          {/* Logo */}
          <div className="flex justify-center mb-2">
            <img src={logo} alt="VICI.AR" className="h-12 object-contain" />
          </div>

          <h2 className="text-foreground text-2xl font-semibold text-center mb-6">
            Iniciar sesión
          </h2>

          {/* Error */}
          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded-lg text-sm mb-6">
              {error}
            </div>
          )}

          {/* Form */}
          <Form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <Input
              isRequired
              type="email"
              name="email"
              label="Email"
              labelPlacement="outside"
              placeholder="tu@email.com"
              isDisabled={isLoading}
              errorMessage="Por favor ingresá un email válido"
              classNames={{
                label: "text-foreground text-sm mb-1",
                inputWrapper: "bg-white",
                input: "text-black",
              }}
            />

            <Input
              isRequired
              type="password"
              name="password"
              label="Contraseña"
              labelPlacement="outside"
              placeholder="Tu contraseña"
              isDisabled={isLoading}
              errorMessage="Por favor ingresá tu contraseña"
              classNames={{
                label: "text-foreground text-sm mb-1",
                inputWrapper: "bg-white",
                input: "text-black",
              }}
            />

            <Button
              type="submit"
              color="primary"
              fullWidth
              isLoading={isLoading}
              isDisabled={isLoading}
            >
              {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
            </Button>

            <Button
              type="button"
              color="secondary"
              fullWidth
              isDisabled={isLoading}
              onPress={() => console.log("Login con Google")}
            >
              Continuar con Google
            </Button>

            <div className="text-center">
              <button
                type="button"
                disabled={isLoading}
                onClick={() => console.log("Olvidé mi contraseña")}
                className="text-sm text-[--color-primary-light] hover:underline"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>
          </Form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default LoginModal;
