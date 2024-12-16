import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-4xl w-full text-center">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">Bienvenido a la Aplicación</h1>
        <p className="text-xl text-gray-600 mb-8">
          Esta es una plataforma para la gestión de fondos, asignaciones y alertas. ¡Comienza a explorar!
        </p>
        <div className="space-x-4">
          <Link
            to="/login"
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            Iniciar sesión
          </Link>
          <Link
            to="/register"
            className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700 transition"
          >
            Registrarse
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
