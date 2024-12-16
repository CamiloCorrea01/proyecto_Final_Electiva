import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AlertasPorFondo = ({ fondoId }) => {
  const [alertas, setAlertas] = useState([]);

  useEffect(() => {
    const fetchAlertas = async () => {
      const token = localStorage.getItem('token');
      
      try {
        const response = await axios.get(`/api/alertas/fondo/${fondoId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAlertas(response.data);
      } catch (error) {
        console.error('Error al obtener las alertas por fondo:', error);
      }
    };

    fetchAlertas();
  }, [fondoId]);

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-4">Alertas por Fondo</h2>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Tipo</th>
            <th className="p-2 border">Mensaje</th>
            <th className="p-2 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {alertas.map((alerta) => (
            <tr key={alerta._id}>
              <td className="p-2 border">{alerta.tipo}</td>
              <td className="p-2 border">{alerta.mensaje}</td>
              <td className="p-2 border">
                <button className="text-red-600" onClick={() => handleDelete(alerta._id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const handleDelete = async (id) => {
  const token = localStorage.getItem('token');
  
  try {
    await axios.delete(`/api/alertas/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    alert('Alerta eliminada con éxito');
    window.location.reload();
  } catch (error) {
    console.error('Error al eliminar la alerta:', error);
    alert('Hubo un error al eliminar la alerta');
  }
};

export default AlertasPorFondo;
