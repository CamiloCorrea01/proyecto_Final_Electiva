import React, { useEffect, useState } from 'react';
import api from '../config/api';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as BarTooltip, Legend as BarLegend } from 'recharts';

const Dashboard = () => {
  const [fondos, setFondos] = useState([]);
  const [asignaciones, setAsignaciones] = useState({});
  const [alerta, setAlerta] = useState('');

  useEffect(() => {
    const fetchFondosAndAsignaciones = async () => {
      try {
        // Obtener fondos
        const fondosResponse = await api.get('/api/fondos', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        console.log('Fondos obtenidos:', fondosResponse.data);
        setFondos(fondosResponse.data);

        // Obtener asignaciones para cada fondo
        const asignacionesData = {};
        for (const fondo of fondosResponse.data) {
          const response = await api.get(`/api/fondos/${fondo._id}/asignaciones`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          });
          console.log(`Asignaciones para fondo ${fondo.nombre}:`, response.data);
          asignacionesData[fondo._id] = response.data;
        }

        setAsignaciones(asignacionesData);
      } catch (error) {
        console.error('Error al obtener los fondos o asignaciones:', error);
        setAlerta('Hubo un error al obtener los fondos o asignaciones, por favor intenta nuevamente.');
      }
    };

    fetchFondosAndAsignaciones();
  }, []);

  // Calcular el total de asignaciones para cada fondo
  const fondosConAsignaciones = fondos.map((fondo) => {
    const asignacionesFondo = asignaciones[fondo._id] || [];
    const totalAsignado = asignacionesFondo.reduce(
      (sum, asignacion) => sum + asignacion.monto,
      0
    );
    return { ...fondo, totalAsignado };
  });

  // Ordenar los fondos por cantidad de asignaciones
  const fondosOrdenados = fondosConAsignaciones.sort((a, b) => b.totalAsignado - a.totalAsignado);

  // Datos para el gráfico de barras
  const barChartData = fondosOrdenados.map((fondo) => ({
    nombre: fondo.nombre,
    asignaciones: fondo.totalAsignado,
  }));

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-blue-600 mb-6">Dashboard</h1>
        <p className="text-lg text-gray-700 mb-6">
          Bienvenido al dashboard, donde puedes visualizar tus fondos y sus correspondientes asignaciones.
        </p>

        {alerta && (
          <div className="mt-4 p-4 bg-yellow-100 text-yellow-800 rounded-lg shadow-md">
            <p>{alerta}</p>
          </div>
        )}

        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-800">Fondos Disponibles</h2>
          {fondos.length > 0 ? (
            <ul className="mt-4 space-y-6">
              {fondos.map((fondo) => {
                const asignacionesFondo = asignaciones[fondo._id] || [];
                const totalAsignado = asignacionesFondo.reduce(
                  (sum, asignacion) => sum + asignacion.monto,
                  0
                );
                const saldoRestante = fondo.saldo - totalAsignado;  // Usamos "saldo" en lugar de "saldo_total"
                const presupuestoUtilizado = (totalAsignado / fondo.presupuesto) * 100;
                const saldoPorcentaje = 100 - presupuestoUtilizado;

                // Datos para el gráfico de cada fondo
                const chartData = [
                  { name: 'Presupuesto Utilizado', value: totalAsignado, color: '#00C49F' },
                  { name: 'Saldo Restante', value: saldoRestante, color: '#FF8042' },
                ];

                return (
                  <li key={fondo._id} className="bg-blue-50 p-4 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-blue-700">{fondo.nombre}</h3>
                    <p className="text-sm text-gray-600">{fondo.descripcion}</p>
                    <p className="text-sm text-gray-700 font-bold mt-2">
                      <strong>Presupuesto: </strong>{fondo.presupuesto} $
                    </p>
                    <p className="text-sm text-gray-700 font-bold mt-2">
                      <strong>Saldo: </strong>{saldoRestante} $
                    </p>

                    <div className="mt-4">
                      <PieChart width={200} height={200}>
                        <Pie
                          data={chartData}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#8884d8"
                        >
                          {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-gray-600">No tienes fondos disponibles aún.</p>
          )}
        </div>

        {/* Gráfico de barras para mostrar fondos con más asignaciones */}
        <div className="mt-10">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Fondos con Más Asignaciones</h2>
          <BarChart width={500} height={300} data={barChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="nombre" />
            <YAxis />
            <Bar dataKey="asignaciones" fill="#8884d8" />
            <BarTooltip />
            <BarLegend />
          </BarChart>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
