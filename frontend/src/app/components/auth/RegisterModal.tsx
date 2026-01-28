import React from "react";
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

type RegisterModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, onClose }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Registro enviado");
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      hideCloseButton
      backdrop="blur"
      placement="center"
    >
      <ModalContent className="bg-transparent shadow-none">
        <ModalBody className="flex justify-center py-10">
          {/* CONTENEDOR 3D */}
          <div className="relative">
            {/* sombra */}
            <div
              className="
                absolute inset-0
                translate-x-3 translate-y-3
                bg-primary
                rounded-xl
              "
            />

            {/* card */}
            <div
              className="
                relative z-10
                w-full max-w-[520px]
                bg-background
                rounded-xl
                shadow-2xl
                p-8
                "
            >
              <form
                className="flex flex-col gap-10 relative"
                onSubmit={handleSubmit}
              >
                {/* BOTÓN CERRAR */}
                <button
                  type="button"
                  onClick={onClose}
                  className="
                absolute top-0 right-0
                text-white/70
                hover:text-white
                transition
                 "
                  aria-label="Cerrar"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>

                {/* LOGO */}
                <div className="flex justify-center">
                  <img
                    src={logo}
                    alt="VICI.AR"
                    className="h-12 object-contain"
                  />
                </div>

                <h2 className="text-white text-2xl font-semibold text-center mb-2">
                  Crear cuenta
                </h2>

                <div className="flex gap-4">
                  <Input
                    label="Username"
                    labelPlacement="outside"
                    placeholder="Username *"
                    required
                    variant="flat"
                    classNames={{
                      label: "text-white text-sm",
                      inputWrapper: "bg-white",
                      input: "text-black",
                    }}
                  />

                  <Input
                    label="Nombre visible"
                    labelPlacement="outside"
                    placeholder="Nombre visible"
                    variant="flat"
                    classNames={{
                      label: "text-white text-sm",
                      inputWrapper: "bg-white",
                      input: "text-black",
                    }}
                  />
                </div>

                {/* Email */}
                <Input
                  type="email"
                  label="Email"
                  labelPlacement="outside"
                  placeholder="Email *"
                  required
                  variant="flat"
                  classNames={{
                    label: "text-white text-sm",
                    inputWrapper: "bg-white",
                    input: "text-black",
                  }}
                />

                {/* Passwords */}
                <div className="flex gap-4">
                  <Input
                    type="password"
                    label="Contraseña"
                    labelPlacement="outside"
                    placeholder="Contraseña *"
                    required
                    variant="flat"
                    classNames={{
                      label: "text-white text-sm",
                      inputWrapper: "bg-white",
                      input: "text-black",
                    }}
                  />

                  <Input
                    type="password"
                    label="Repetir contraseña"
                    labelPlacement="outside"
                    placeholder="Repetir contraseña *"
                    required
                    variant="flat"
                    classNames={{
                      label: "text-white text-sm",
                      inputWrapper: "bg-white",
                      input: "text-black",
                    }}
                  />
                </div>

                {/* Description */}
                <Textarea
                  label="Descripción"
                  labelPlacement="outside"
                  placeholder="Descripción (opcional)"
                  minRows={2}
                  variant="flat"
                  classNames={{
                    label: "text-white text-sm",
                    inputWrapper: "bg-white",
                    input: "text-black",
                  }}
                />

                {/* submit */}
                <Button type="submit" color="primary" className="mt-2">
                  Continuar
                </Button>

                {/* google */}
                <Button
                  type="button"
                  className="mt-3 bg-secondary text-white"
                  onPress={() => console.log("Registro con Google")}
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
