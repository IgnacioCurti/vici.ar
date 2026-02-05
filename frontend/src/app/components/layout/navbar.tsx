import React, { useState } from "react";
import "../../styles/navbar.css";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenuToggle,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import { UserCircleIcon } from "@heroicons/react/24/outline";

import RegisterModal from "../auth/RegisterModal";
import LoginModal from "../auth/LoginModal";
import { useAuth } from "../../../hooks/useAuth";

/* =======================
   Navbar
======================= */
const AppNavbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "¿Cerrar sesión?",
      text: "Vas a salir de tu cuenta",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, cerrar sesión",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      background: "#0B0F1A",
      color: "#fff",
    });

    if (result.isConfirmed) {
      logout();

      Swal.fire({
        icon: "success",
        title: "Sesión cerrada",
        timer: 1500,
        showConfirmButton: false,
        background: "#0B0F1A",
        color: "#fff",
      });
    }
  };

  return (
    <>
      <Navbar
        isBordered={false}
        maxWidth="full"
        className="w-full custom-navbar bg-[--color-background]"
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
      >
        {/* LEFT */}
        <NavbarContent justify="start">
          <NavbarMenuToggle className="md:hidden" />

          <NavbarBrand className="flex items-center gap-1">
            <Link to="/" className="logo-link">
              <span className="logo-text">VICI</span>
              <span className="logo-dot">.</span>
              <span className="logo-ar">AR</span>
            </Link>
          </NavbarBrand>
        </NavbarContent>

        {/* RIGHT */}
        <NavbarContent justify="end" className="gap-3">
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <button className="flex items-center justify-center">
                <UserCircleIcon className="h-8 w-8 text-secondary hover:scale-105 transition-transform" />
              </button>
            </DropdownTrigger>

            <DropdownMenu variant="flat">
              {!isAuthenticated ? (
                <>
                  <DropdownItem key="login">
                    <button
                      onClick={() => setIsLoginOpen(true)}
                      className="w-full text-left"
                    >
                      Login
                    </button>
                  </DropdownItem>

                  <DropdownItem key="signup">
                    <button
                      onClick={() => setIsRegisterOpen(true)}
                      className="w-full text-left"
                    >
                      Sign up
                    </button>
                  </DropdownItem>
                </>
              ) : (
                <>
                  <DropdownItem
                    key="user"
                    className="cursor-default opacity-70 text-sm"
                  >
                    {user?.email}
                  </DropdownItem>

                  <DropdownItem key="profile">
                    <Link to="/profile">Mi perfil</Link>
                  </DropdownItem>

                  <DropdownItem
                    key="logout"
                    className="text-danger"
                    onClick={handleLogout}
                  >
                    Cerrar sesión
                  </DropdownItem>
                </>
              )}
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      </Navbar>

      {/* MODALS */}
      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
      />

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
};

export default AppNavbar;
