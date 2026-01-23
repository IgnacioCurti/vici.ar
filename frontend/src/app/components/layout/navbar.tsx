import React, { useState } from "react";
import logo from "../../../assets/Logo-removebg-preview.png";
import "../../styles/navbar.css";
import { Link } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import { UserCircleIcon } from "@heroicons/react/24/outline";

/* =======================
   Logo
======================= */
export const AcmeLogo: React.FC = () => {
  return (
    <img src={logo} alt="VICI.AR Logo" className="h-12 w-auto object-contain" />
  );
};

/* =======================
   Navbar
======================= */
const AppNavbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Navbar
      isBordered={false}
      maxWidth="full"
      className="w-full custom-navbar"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      {/* LEFT */}
      <NavbarContent justify="start">
        {/* ☰ SOLO MOBILE */}
        <NavbarMenuToggle className="md:hidden" />

        <NavbarBrand className="flex items-center gap-1">
          <Link to="/" className="logo-link">
            <AcmeLogo />
            <span className="logo-text">VICI</span>
            <span className="logo-dot">.</span>
            <span className="logo-ar">AR</span>
          </Link>
        </NavbarBrand>

        {/* DESKTOP MENU */}
        <NavbarContent className="hidden md:flex gap-4">
          <NavbarItem>
            <Link to="/" color="foreground">
              Inicio
            </Link>
          </NavbarItem>

          <NavbarItem isActive>
            <Link aria-current="page" color="secondary" to="/">
              About is
            </Link>
          </NavbarItem>

          <NavbarItem>
            <Link color="foreground" to="/register">
              Registro
            </Link>
          </NavbarItem>
        </NavbarContent>
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
              <Link to="/register">Sign up</Link>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>

      {/* MOBILE MENU (NO TOCADO) */}
      <NavbarMenu>
        <NavbarMenuItem>
          <Link
            className="w-full"
            color="foreground"
            to="/"
            onClick={() => setIsMenuOpen(false)}
          >
            Inicio
          </Link>
        </NavbarMenuItem>

        <NavbarMenuItem>
          <Link
            className="w-full"
            color="secondary"
            to="/"
            onClick={() => setIsMenuOpen(false)}
          >
            About is
          </Link>
        </NavbarMenuItem>

        <NavbarMenuItem>
          <Link
            className="w-full"
            color="foreground"
            to="/"
            onClick={() => setIsMenuOpen(false)}
          >
            Registro
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
};

export default AppNavbar;
