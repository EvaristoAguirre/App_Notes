import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (
    location.pathname === "/" ||
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/not-found"
  ) {
    return null;
  }

  return (
    <header className="flex justify-between items-center p-4 bg-gray-400 text-white">
      <h1 className="text-xl font-bold">Gestor de Notas</h1>
      <button
        onClick={handleLogout}
        className="bg-red-400 hover:bg-red-600 px-4 py-2 rounded text-sm font-medium"
      >
        Logout
      </button>
    </header>
  );
};

export default Header;
