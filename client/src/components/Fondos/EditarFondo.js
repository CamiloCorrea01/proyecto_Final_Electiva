import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Importa useParams
import axios from '../../config/api';

const EditarFondo = () => {
  const { id } = useParams(); // Obtén el fondoId desde la URL
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [presupuesto, setPresupuesto] = useState('');
  const [saldo, setSaldo] = useState('');

  useEffect(() => {
    const fetchFondo = async () => {
      const token = localStorage.getItem('token');

      try {
        const response = await axios.get(`/api/fondos/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const { nombre, descripcion, presupuesto, saldo } = response.data;
        setNombre(nombre);
        setDescripcion(descripcion);
        setPresupuesto(presupuesto);
        setSaldo(saldo);
      } catch (error) {
        console.error('Error al obtener el fondo:', error);
      }
    };

    fetchFondo();
  }, [id]); // Usamos el id para hacer la llamada al backend

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
  
    const updatedFondo = {};
  
    // Solo agregamos los campos que tienen valor
    if (nombre) updatedFondo.nombre = nombre;
    if (descripcion) updatedFondo.descripcion = descripcion;
    if (presupuesto) updatedFondo.presupuesto = presupuesto;
    if (saldo) updatedFondo.saldo = saldo;
  
    try {
      // Solo enviamos los campos modificados
      await axios.put(
        `/api/fondos/${id}`,
        updatedFondo,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert('Fondo editado con éxito');
    } catch (error) {
      console.error('Error al editar el fondo:', error);
      alert('Hubo un error al editar el fondo');
    }
  };
  

  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-4">Editar Fondo</h2>
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
          Editar Fondo
        </button>
      </form>
    </div>
  );
};

export default EditarFondo;
