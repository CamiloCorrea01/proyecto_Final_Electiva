import React, { useEffect, useState } from 'react';
import axios from '../../config/api';
import { useNavigate } from 'react-router-dom';

const ListarAsignaciones = () => {
  const [fondos, setFondos] = useState([]); // Array de fondos
  const [asignaciones, setAsignaciones] = useState([]); // Asignaciones de un fondo específico
  const [selectedFondo, setSelectedFondo] = useState(null); // Fondo seleccionado
  const navigate = useNavigate();

  // Obtener fondos disponibles
  useEffect(() => {
    const fetchFondos = async () => {
      const token = localStorage.getItem('token');
      
      try {
        const response = await axios.get('/api/fondos', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFondos(response.data); // Guardamos los fondos en el estado
      } catch (error) {
        console.error('Error al obtener los fondos:', error);
      }
    };

    fetchFondos();
  }, []);

  // Obtener asignaciones del fondo seleccionado
  useEffect(() => {
    const fetchAsignaciones = async () => {
      if (!selectedFondo) return; // Si no hay fondo seleccionado, no hacemos la solicitud

      const token = localStorage.getItem('token');
      
      try {
        const response = await axios.get(`/api/fondos/${selectedFondo}/asignaciones`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAsignaciones(response.data); // Guardamos las asignaciones en el estado
      } catch (error) {
        console.error('Error al obtener las asignaciones:', error);
      }
    };

    fetchAsignaciones();
  }, [selectedFondo]); // Se ejecuta cuando cambia el fondo seleccionado

  const handleEdit = (id) => {
    // Redirige a la página de edición pasando el ID de la asignación
    navigate(`/asignaciones/editar/${id}`);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    
    try {
      if (!selectedFondo) {
        console.error('Fondo ID no disponible para eliminar');
        return;
      }

      // Eliminar asignación del fondo específico
      await axios.delete(`/api/fondos/${selectedFondo}/asignaciones/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Asignación eliminada con éxito');
      window.location.reload();
    } catch (error) {
      console.error('Error al eliminar la asignación:', error);
      alert('Hubo un error al eliminar la asignación');
    }
  };

  const handleCreateAssignment = () => {
    // Redirige a la página de creación de asignación, pasando el fondo seleccionado
    if (!selectedFondo) {
      alert('Selecciona un fondo primero');
      return;
    }
    navigate(`/asignaciones/crear/${selectedFondo}`);
  };

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-4">Lista de Asignaciones</h2>

      {/* Selección del fondo */}
      <div className="mb-4">
        <label className="mr-2">Selecciona un fondo:</label>
        <select
          value={selectedFondo || ''}
          onChange={(e) => setSelectedFondo(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">Seleccione un fondo</option>
          {fondos.map((fondo) => (
            <option key={fondo._id} value={fondo._id}>
              {fondo.nombre}
            </option>
          ))}
        </select>
      </div>

      {/* Tabla de asignaciones */}
      {selectedFondo && (
        <div>
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">Fondo</th>
                <th className="p-2 border">Nombre</th>
                <th className="p-2 border">Descripción</th>
                <th className="p-2 border">Monto</th>
                <th className="p-2 border">Fecha de Vencimiento</th>
                <th className="p-2 border">Estado</th>
                <th className="p-2 border">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {asignaciones.map((asignacion) => (
                <tr key={asignacion._id}>
                  <td className="p-2 border">{asignacion.fondo_id}</td> {/* Fondo asociado */}
                  <td className="p-2 border">{asignacion.nombre}</td>
                  <td className="p-2 border">{asignacion.descripcion}</td>
                  <td className="p-2 border">{asignacion.monto}</td>
                  <td className="p-2 border">{new Date(asignacion.fecha_vencimiento).toLocaleDateString()}</td>
                  <td className="p-2 border">{asignacion.estado}</td>
                  <td className="p-2 border">
                    <button className="text-blue-600" onClick={() => handleEdit(asignacion._id)}>
                      Editar
                    </button>
                    <button className="text-red-600 ml-2" onClick={() => handleDelete(asignacion._id)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button 
            className="bg-green-600 text-white p-4 mt-6 w-full rounded"
            onClick={handleCreateAssignment}
          >
            Crear Asignación
          </button>
        </div>
      )}
    </div>
  );
};

export default ListarAsignaciones;
