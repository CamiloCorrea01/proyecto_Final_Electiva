import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importar el hook useNavigate
import axios from '../../config/api';

const CrearFondo = () => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [presupuesto, setPresupuesto] = useState('');
  const [saldo, setSaldo] = useState('');
  const navigate = useNavigate(); // Inicializar useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      await axios.post(
        '/api/fondos',
        { nombre, descripcion, presupuesto, saldo },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert('Fondo creado con éxito');
      navigate('/fondos'); // Redirigir a /fondos
    } catch (error) {
      console.error('Error al crear el fondo:', error);
      alert('Hubo un error al crear el fondo');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-4">Crear Fondo</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Nombre</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Descripción</label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium">Presupuesto</label>
          <input
            type="number"
            value={presupuesto}
            onChange={(e) => setPresupuesto(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Saldo</label>
          <input
            type="number"
            value={saldo}
            onChange={(e) => setSaldo(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white p-2 rounded w-full">
          Crear Fondo
        </button>
      </form>
    </div>
  );
};

export default CrearFondo;
