import React, { useState } from 'react';
import axios from 'axios';

const CrearAlerta = () => {
  const [tipo, setTipo] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [fondo, setFondo] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    
    try {
      await axios.post(
        '/api/alertas',
        { tipo, mensaje, fondo },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert('Alerta creada con éxito');
    } catch (error) {
      console.error('Error al crear la alerta:', error);
      alert('Hubo un error al crear la alerta');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-4">Crear Alerta</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Tipo</label>
          <input
            type="text"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Mensaje</label>
          <textarea
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Fondo</label>
          <input
            type="text"
            value={fondo}
            onChange={(e) => setFondo(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white p-2 rounded w-full">
          Crear Alerta
        </button>
      </form>
    </div>
  );
};

export default CrearAlerta;
