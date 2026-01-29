import React, { useState } from "react";
import logo from "../../../assets/Logo-removebg-preview.png";
import { Modal, ModalContent, ModalBody, Button, Input, Textarea } from "@heroui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

type RegisterModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, onClose }) => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
    description: "",
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
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
        displayName: formData.displayName || undefined,
        description: formData.description || undefined,
      });

      alert("Registro exitoso! Por favor verifica tu email");
      onClose();
      navigate("/");
    } catch (err) {
      const errorMessage = err instanceof Error
        ? err.message
        : "Error al registrar usuario";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} hideCloseButton backdrop='blur' placement='center'>
      <ModalContent className='bg-transparent shadow-none'>
        <ModalBody className='flex justify-center py-10'>
          {/* CONTENEDOR 3D */}
          <div className='relative'>
            {/* sombra */}
            <div className='absolute inset-0 translate-x-3 translate-y-3 bg-primary rounded-xl' />

            {/* card */}
            <div className='relative z-10 w-full max-w-[520px] bg-background rounded-xl shadow-2xl p-8'>
              <form className='flex flex-col gap-10 relative' onSubmit={handleSubmit}>
                {/* BOTÓN CERRAR */}
                <button
                  type='button'
                  onClick={onClose}
                  className='absolute top-0 right-0 text-white/70 hover:text-white transition'
                  aria-label='Cerrar'>
                  <XMarkIcon className='h-5 w-5' />
                </button>

                {/* LOGO */}
                <div className='flex justify-center'>
                  <img src={logo} alt='VICI.AR' className='h-12 object-contain' />
                </div>

                <h2 className='text-white text-2xl font-semibold text-center mb-2'>Crear cuenta</h2>

                {error && (
                  <div className='bg-red-500/100 border border-red-500 text-red-500 px-4 py-2 rounded-lg text-sm'>
                    {error}
                  </div>
                )}

                <div className='flex gap-4'>
                  <Input
                    name='username'
                    value={formData.username}
                    onChange={handleChange}
                    label='Username'
                    labelPlacement='outside'
                    placeholder='Username *'
                    required
                    variant='flat'
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
                    variant='flat'
                    classNames={{
                      label: "text-white text-sm",
                      inputWrapper: "bg-white",
                      input: "text-black",
                    }}
                  />
                </div>

                {/* Email */}
                <Input
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  type='email'
                  label='Email'
                  labelPlacement='outside'
                  placeholder='Email *'
                  required
                  variant='flat'
                  classNames={{
                    label: "text-white text-sm",
                    inputWrapper: "bg-white",
                    input: "text-black",
                  }}
                />

                {/* Passwords */}
                <div className='flex gap-4'>
                  <Input
                    type='password'
                    name='password'
                    value={formData.password}
                    onChange={handleChange}
                    label='Contraseña'
                    labelPlacement='outside'
                    placeholder='Contraseña *'
                    required
                    variant='flat'
                    classNames={{
                      label: "text-white text-sm",
                      inputWrapper: "bg-white",
                      input: "text-black",
                    }}
                  />

                  <Input
                    name='confirmPassword'
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    type='password'
                    label='Repetir contraseña'
                    labelPlacement='outside'
                    placeholder='Repetir contraseña *'
                    required
                    variant='flat'
                    classNames={{
                      label: "text-white text-sm",
                      inputWrapper: "bg-white",
                      input: "text-black",
                    }}
                  />
                </div>

                {/* Description */}
                <Textarea
                  name='description'
                  value={formData.description}
                  onChange={handleChange}
                  label='Descripción'
                  labelPlacement='outside'
                  placeholder='Descripción (opcional)'
                  minRows={2}
                  variant='flat'
                  classNames={{
                    label: "text-white text-sm",
                    inputWrapper: "bg-white",
                    input: "text-black",
                  }}
                />

                {/* submit */}
                <Button type='submit' color='primary' className='mt-2' isLoading={isLoading} isDisabled={isLoading}>
                  {isLoading ? "Registrando..." : "Continuar"}
                </Button>

                {/* google */}
                <Button
                  type='button'
                  className='mt-3 bg-secondary text-white'
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
