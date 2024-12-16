import React, { useState, useEffect } from 'react';
import axios from '../../config/api';
import { useNavigate, useParams } from 'react-router-dom';

const CrearAsignacion = () => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [monto, setMonto] = useState('');
  const [fechaVencimiento, setFechaVencimiento] = useState('');
  const [sobrecosto, setSobrecosto] = useState(false);
  const [estado, setEstado] = useState('Pendiente');
  const [fondos, setFondos] = useState([]);
  const navigate = useNavigate();
  const { fondoId } = useParams(); // Obtenemos el fondoId de la URL

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const newAsignacion = {
      nombre,
      descripcion,
      monto: parseFloat(monto),
      fecha_vencimiento: fechaVencimiento,
      sobrecosto,
      estado,
    };

    try {
      await axios.post(`/api/fondos/${fondoId}/asignaciones`, newAsignacion, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Asignación creada con éxito');
      navigate('/asignaciones');// Redirige a la lista de asignaciones del fondo
    } catch (error) {
      console.error('Error al crear la asignación:', error);
      alert('Hubo un error al crear la asignación');
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-4">Crear Asignación</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Nombre */}
        <div className="mb-4">
          <label className="block mb-2">Nombre</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            className="p-2 border rounded w-full"
          />
        </div>

        {/* Descripción */}
        <div className="mb-4">
          <label className="block mb-2">Descripción</label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
            className="p-2 border rounded w-full"
          />
        </div>

        {/* Monto */}
        <div className="mb-4">
          <label className="block mb-2">Monto</label>
          <input
            type="number"
            value={monto}
            onChange={(e) => setMonto(e.target.value)}
            required
            className="p-2 border rounded w-full"
          />
        </div>

        {/* Fecha de vencimiento */}
        <div className="mb-4">
          <label className="block mb-2">Fecha de Vencimiento</label>
          <input
            type="date"
            value={fechaVencimiento}
            onChange={(e) => setFechaVencimiento(e.target.value)}
            required
            className="p-2 border rounded w-full"
          />
        </div>

        {/* Sobre costo */}
        <div className="mb-4">
          <label className="block mb-2">Sobrecosto</label>
          <input
            type="checkbox"
            checked={sobrecosto}
            onChange={(e) => setSobrecosto(e.target.checked)}
            className="p-2 border rounded"
          />
        </div>

        {/* Estado */}
        <div className="mb-4">
          <label className="block mb-2">Estado</label>
          <select
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            required
            className="p-2 border rounded w-full"
          >
            <option value="Pendiente">Pendiente</option>
            <option value="Completada">Completada</option>
            <option value="Cancelada">Cancelada</option>
          </select>
        </div>

        {/* Botón de envío */}
        <div className="mt-4">
          <button type="submit" className="bg-blue-600 text-white p-4 w-full rounded">
            Crear Asignación
          </button>
        </div>
      </form>
    </div>
  );
};

export default CrearAsignacion;
