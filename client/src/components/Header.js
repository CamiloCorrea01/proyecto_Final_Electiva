import React from "react";
import { Link, useNavigate } from "react-router-dom";


const Header = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Eliminar el token de localStorage
      localStorage.removeItem("token");

      // Redirigir al login
      navigate('/login');
    } catch (error) {
      console.error("Error cerrando sesión", error);
      // Aquí podrías manejar el error y mostrar un mensaje si lo deseas
    }
  };

  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          Sistema de Gestion de Fondos
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="/dashboard" className="hover:underline">
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/fondos" className="hover:underline">
                Fondos
              </Link>
            </li>
            <li>
              <Link to="/asignaciones" className="hover:underline">
                Asignaciones
              </Link>
            </li>
            <li></li>
            <li>
              <Link to="/alertas" className="hover:underline">
                Alertas
              </Link>
            </li>
            <li>
              <button onClick={handleLogout} className="hover:underline">
                Cerrar sesión
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
