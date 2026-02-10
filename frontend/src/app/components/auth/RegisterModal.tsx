import React, { useState } from "react";
import logo from "../../../assets/Logo-removebg-preview.png";
import { Modal, ModalContent, ModalBody, Button, Input, Form } from "@heroui/react";
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    if (!passwordPattern.test(formData.password)) {
      setError("La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un carácter especial");
      return;
    }

    setIsLoading(true);

    try {
      await register({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        displayname: formData.displayName || undefined,
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
      const errorMessage = err instanceof Error ? err.message : "Error al registrar usuario";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} hideCloseButton backdrop='blur' placement='center'>
      <ModalContent className='bg-background relative z-10 w-full max-w-112.5 rounded-xl shadow-2xl p-8'>
        <ModalBody className='flex justify-center'>
          {/* cerrar */}
          <button
            type='button'
            onClick={handleClose}
            className='absolute top-6 right-6 text-[--color-foreground]/70 hover:text-[--color-foreground] transition z-10'
            aria-label='Cerrar'>
            <XMarkIcon className='h-6 w-6' />
          </button>

          {/* logo */}
          <div className='flex justify-center'>
            <img src={logo} alt='VICI.AR' className='h-12 object-contain' />
          </div>

          <h2 className='text-white text-2xl font-semibold text-center mb-2'>Crear cuenta</h2>

          {error && (
            <div className='bg-red-500 border border-red-500 px-4 py-2 rounded-lg text-sm text-black'>{error}</div>
          )}

          <Form className='flex flex-col gap-6' onSubmit={handleSubmit}>
            <div className='flex gap-4'>
              <Input
                name='username'
                value={formData.username}
                onChange={handleChange}
                label='Username'
                labelPlacement='outside'
                placeholder='Username'
                isRequired
                classNames={{
                  label: "text-white text-sm",
                  inputWrapper: "bg-white",
                  input: "text-black",
                }}
              />

              <Input
                name='displayName'
                value={formData.displayName}
                onChange={handleChange}
                label='Nombre visible'
                labelPlacement='outside'
                placeholder='Nombre visible'
                classNames={{
                  label: "text-white text-sm",
                  inputWrapper: "bg-white",
                  input: "text-black",
                }}
              />
            </div>

            <Input
              name='email'
              value={formData.email}
              onChange={handleChange}
              type='email'
              label='Email'
              labelPlacement='outside'
              placeholder='tu@email.com'
              isRequired
              classNames={{
                label: "text-white text-sm",
                inputWrapper: "bg-white",
                input: "text-black",
              }}
            />

            <Input
              type='password'
              name='password'
              value={formData.password}
              onChange={handleChange}
              label='Contraseña'
              labelPlacement='outside'
              placeholder='Contraseña'
              isRequired
              classNames={{
                label: "text-white text-sm",
                inputWrapper: "bg-white",
                input: "text-black",
              }}
            />

            <Input
              type='password'
              name='confirmPassword'
              value={formData.confirmPassword}
              onChange={handleChange}
              label='Repetir contraseña'
              labelPlacement='outside'
              placeholder='Repetir contraseña'
              isRequired
              classNames={{
                label: "text-white text-sm",
                inputWrapper: "bg-white",
                input: "text-black",
              }}
            />

            <Button type='submit' color='primary' fullWidth isLoading={isLoading} isDisabled={isLoading}>
              {isLoading ? "Registrando..." : "Continuar"}
            </Button>

            <Button
              type='button'
              color='secondary'
              fullWidth
              onPress={() => console.log("Registro con Google")}
              isDisabled={isLoading}>
              Continuar con Google
            </Button>
          </Form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default RegisterModal;
