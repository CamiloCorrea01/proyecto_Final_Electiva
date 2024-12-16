import React, { useEffect, useState } from 'react';
import axios from '../../config/api';
import { Link } from 'react-router-dom';

const ListarAsignaciones = () => {
  const [asignaciones, setAsignaciones] = useState([]);

  useEffect(() => {
    const fetchAsignaciones = async () => {
      const token = localStorage.getItem('token');

      try {
        const response = await axios.get('/api/asignaciones', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAsignaciones(response.data);
      } catch (error) {
        console.error('Error al obtener las asignaciones:', error);
      }
    };

    fetchAsignaciones();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');

    try {
      await axios.delete(`/api/asignaciones/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Asignación eliminada con éxito');
      setAsignaciones(asignaciones.filter(asignacion => asignacion._id !== id));
    } catch (error) {
      console.error('Error al eliminar la asignación:', error);
      alert('Hubo un error al eliminar la asignación');
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-4">Lista de Asignaciones</h2>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Nombre</th>
            <th className="p-2 border">Monto</th>
            <th className="p-2 border">Fecha de Asignación</th>
            <th className="p-2 border">Fecha de Vencimiento</th>
            <th className="p-2 border">Estado</th>
            <th className="p-2 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {asignaciones.map((asignacion) => (
            <tr key={asignacion._id}>
              <td className="p-2 border">{asignacion.nombre}</td>
              <td className="p-2 border">{asignacion.monto}</td>
              <td className="p-2 border">{new Date(asignacion.fecha_asignacion).toLocaleDateString()}</td>
              <td className="p-2 border">{new Date(asignacion.fecha_vencimiento).toLocaleDateString()}</td>
              <td className="p-2 border">{asignacion.estado}</td>
              <td className="p-2 border">
                <Link
                  to={`/asignaciones/editar/${asignacion._id}`}
                  className="text-yellow-500 hover:underline"
                >
                  Editar
                </Link>
                <button
                  className="text-red-600 ml-2"
                  onClick={() => handleDelete(asignacion._id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Botón para agregar una nueva asignación */}
      <Link
        to="/asignaciones/crear"
        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 mt-4 block text-center"
      >
        Agregar Asignación
      </Link>
    </div>
  );
};

export default ListarAsignaciones;
