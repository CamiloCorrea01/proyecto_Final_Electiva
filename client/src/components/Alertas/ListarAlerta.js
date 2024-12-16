import React, { useEffect, useState } from 'react';
import api from '../../config/api';

const Alertas = () => {
  const [alertas, setAlertas] = useState([]);
  const [filteredAlertas, setFilteredAlertas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [tipoSeleccionado, setTipoSeleccionado] = useState('');

  // Obtener todas las alertas
  useEffect(() => {
    const fetchAlertas = async () => {
      try {
        const response = await api.get('/api/alertas', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setAlertas(response.data);
        setFilteredAlertas(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error al obtener alertas:', err);
        setError('No se pudieron cargar las alertas. Inténtalo nuevamente.');
        setLoading(false);
      }
    };

    fetchAlertas();
  }, []);

  // Filtrar alertas por tipo
  const handleFiltrarPorTipo = (tipo) => {
    setTipoSeleccionado(tipo);
    if (tipo === '') {
      setFilteredAlertas(alertas);
    } else {
      setFilteredAlertas(alertas.filter((alerta) => alerta.tipo === tipo));
    }
  };

  // Eliminar una alerta
  const handleEliminarAlerta = async (id) => {
    try {
      await api.delete(`/api/alertas/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      const nuevasAlertas = alertas.filter((alerta) => alerta._id !== id);
      setAlertas(nuevasAlertas);
      handleFiltrarPorTipo(tipoSeleccionado); // Actualizar el filtro después de eliminar
    } catch (err) {
      console.error('Error al eliminar alerta:', err);
      alert('No se pudo eliminar la alerta. Inténtalo nuevamente.');
    }
  };

  if (loading) {
    return <p>Cargando alertas...</p>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  // Obtener tipos de alerta únicos
  const tiposUnicos = Array.from(new Set(alertas.map((alerta) => alerta.tipo)));

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-red-600 mb-6">Alertas</h1>
        <p className="text-lg text-gray-700 mb-6">
          Aquí puedes gestionar todas las alertas relacionadas con los fondos.
        </p>

        {/* Filtro por tipo de alerta */}
        <div className="mb-6">
          <label htmlFor="tipo" className="block text-sm font-medium text-gray-700">
            Filtrar por tipo de alerta:
          </label>
          <select
            id="tipo"
            value={tipoSeleccionado}
            onChange={(e) => handleFiltrarPorTipo(e.target.value)}
            className="mt-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
          >
            <option value="">Todos los tipos</option>
            {tiposUnicos.map((tipo) => (
              <option key={tipo} value={tipo}>
                {tipo}
              </option>
            ))}
          </select>
        </div>

        {filteredAlertas.length > 0 ? (
          <ul className="space-y-4">
            {filteredAlertas.map((alerta) => (
              <li key={alerta._id} className="bg-red-50 p-4 rounded-lg shadow-md">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold text-red-700">{alerta.tipo}</h3>
                    <p className="text-sm text-gray-600">{alerta.mensaje}</p>
                    {alerta.fondo && (
                      <p className="text-sm text-gray-500 mt-1">
                        Fondo relacionado: {alerta.fondo.nombre || 'Sin nombre'}
                      </p>
                    )}
                    <p className="text-xs text-gray-500 mt-2">
                      Fecha de creación: {new Date(alerta.fecha_creacion).toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                    onClick={() => handleEliminarAlerta(alerta._id)}
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No hay alertas disponibles para el tipo seleccionado.</p>
        )}
      </div>
    </div>
  );
};

export default Alertas;
