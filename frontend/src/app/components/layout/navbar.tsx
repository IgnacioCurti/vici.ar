import React, { useState } from "react";
import "../../styles/navbar.css";
import { Link } from "react-router-dom";
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

/* =======================
   Navbar
======================= */
const AppNavbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

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
              <DropdownItem key="login">
                <Link to="/login">Login</Link>
              </DropdownItem>

              <DropdownItem key="signup">
                <button
                  onClick={() => setIsRegisterOpen(true)}
                  className="w-full text-left"
                >
                  Sign up
                </button>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      </Navbar>

      {/* MODAL */}
      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
      />
    </>
  );
};

export default AppNavbar;
