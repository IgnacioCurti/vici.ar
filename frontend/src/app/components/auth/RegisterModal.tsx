import React, { useState } from "react";
import logo from "../../../assets/Logo-removebg-preview.png";
import {
  Modal,
  ModalContent,
  ModalBody,
  Button,
  Input,
  Textarea,
} from "@heroui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

type RegisterModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

/* =======================
   Estado inicial del form
======================= */
const initialFormData = {
  username: "",
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
  description: "",
};

const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, onClose }) => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleClose = () => {
    setFormData(initialFormData);
    setError("");
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    if (!passwordPattern.test(formData.password)) {
      setError(
        "La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un carácter especial"
      );
      return;
    }

    setIsLoading(true);

    try {
      await register({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        displayName: formData.displayName || undefined,
        description: formData.description || undefined,
      });

   Swal.fire({
          icon: "success",
          title: "Enhorabuena",
          text: "Registro exitoso",
          timer: 2000,
          showConfirmButton: false,
        });
      setFormData(initialFormData);
      setError("");

      alert("Registro exitoso! Por favor verifica tu email");
      handleClose();
      navigate("/");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Error al registrar usuario";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      hideCloseButton
      backdrop="blur"
      placement="center"
    >
      <ModalContent className="bg-transparent shadow-none">
        <ModalBody className="flex justify-center py-10">
          <div className="relative">
            <div className="absolute inset-0 translate-x-3 translate-y-3 bg-background rounded-xl" />

            <div className="relative z-10 w-full max-w-[520px] rounded-xl shadow-2xl p-8">
              <form className="flex flex-col gap-3 relative" onSubmit={handleSubmit}>
                {/* cerrar */}
                <button
                  type="button"
                  onClick={handleClose}
                  className="absolute top-0 right-0 text-white/70 hover:text-white transition"
                  aria-label="Cerrar"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>

                {/* logo */}
                <div className="flex justify-center">
                  <img src={logo} alt="VICI.AR" className="h-12 object-contain" />
                </div>

                <h2 className="text-white text-2xl font-semibold text-center mb-2">
                  Crear cuenta
                </h2>

                {error && (
                  <div className="bg-red-500 border border-red-500 px-4 py-2 rounded-lg text-sm text-black">
                    {error}
                  </div>
                )}

                <div className="flex gap-4">
                  <Input
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    label="Username"
                    labelPlacement="outside"
                    placeholder="Username *"
                    required
                    classNames={{
                      label: "text-white text-sm",
                      inputWrapper: "bg-white",
                      input: "text-black",
                    }}
                  />

                  <Input
                    name="displayName"
                    value={formData.displayName}
                    onChange={handleChange}
                    label="Nombre visible"
                    labelPlacement="outside"
                    placeholder="Nombre visible"
                    classNames={{
                      label: "text-white text-sm",
                      inputWrapper: "bg-white",
                      input: "text-black",
                    }}
                  />
                </div>

                <Input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  label="Email"
                  labelPlacement="outside"
                  placeholder="Email *"
                  required
                  classNames={{
                    label: "text-white text-sm",
                    inputWrapper: "bg-white",
                    input: "text-black",
                  }}
                />

                <div className="flex gap-4">
                  <Input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    label="Contraseña"
                    labelPlacement="outside"
                    placeholder="Contraseña *"
                    required
                    classNames={{
                      label: "text-white text-sm",
                      inputWrapper: "bg-white",
                      input: "text-black",
                    }}
                  />

                  <Input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    label="Repetir contraseña"
                    labelPlacement="outside"
                    placeholder="Repetir contraseña *"
                    required
                    classNames={{
                      label: "text-white text-sm",
                      inputWrapper: "bg-white",
                      input: "text-black",
                    }}
                  />
                </div>

                <Textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  label="Descripción"
                  labelPlacement="outside"
                  placeholder="Descripción (opcional)"
                  minRows={2}
                  classNames={{
                    label: "text-white text-sm",
                    inputWrapper: "bg-white",
                    input: "text-black",
                  }}
                />

                <Button
                  type="submit"
                  className="mt-2 bg-primary"
                  isLoading={isLoading}
                  isDisabled={isLoading}
                >
                  {isLoading ? "Registrando..." : "Continuar"}
                </Button>

                <Button
                  type="button"
                  className="mt-3 text-black bg-foreground-dark"
                  onPress={() => console.log("Registro con Google")}
                  isDisabled={isLoading}
                >
                  Continuar con Google
                </Button>
              </form>
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default RegisterModal;
