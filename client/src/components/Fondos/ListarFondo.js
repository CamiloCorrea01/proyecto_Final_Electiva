import React, { useEffect, useState } from 'react';
import axios from '../../config/api';
import { Link } from 'react-router-dom';

const ListarFondos = () => {
  const [fondos, setFondos] = useState([]);

  useEffect(() => {
    const fetchFondos = async () => {
      const token = localStorage.getItem('token');

      try {
        const response = await axios.get('/api/fondos', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFondos(response.data);
      } catch (error) {
        console.error('Error al obtener los fondos:', error);
      }
    };

    fetchFondos();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');

    try {
      await axios.delete(`/api/fondos/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Fondo eliminado con éxito');
      setFondos(fondos.filter(fondo => fondo._id !== id));
    } catch (error) {
      console.error('Error al eliminar el fondo:', error);
      alert('Hubo un error al eliminar el fondo');
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-4">Lista de Fondos</h2>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Nombre</th>
            <th className="p-2 border">Presupuesto</th>
            <th className="p-2 border">Saldo</th>
            <th className="p-2 border">Descripción</th>
            <th className="p-2 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {fondos.map((fondo) => (
            <tr key={fondo._id}>
              <td className="p-2 border">{fondo.nombre}</td>
              <td className="p-2 border">{fondo.presupuesto}</td>
              <td className="p-2 border">{fondo.saldo}</td>
              <td className="p-2 border">{fondo.descripcion}</td>
              <td className="p-2 border">
                <Link
                  to={`/fondos/editar/${fondo._id}`}
                  className="text-yellow-500 hover:underline"
                >
                  Editar
                </Link>
                <button
                  className="text-red-600 ml-2"
                  onClick={() => handleDelete(fondo._id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Botón para agregar un nuevo fondo */}
      <Link
        to="/fondos/crear"
        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 mt-4 block text-center"
      >
        Agregar Fondo
      </Link>
    </div>
  );
};

export default ListarFondos;
