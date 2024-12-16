// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const AsignacionesPorFondo = ({ fondoId }) => {
//   const [asignaciones, setAsignaciones] = useState([]);

//   useEffect(() => {
//     const fetchAsignaciones = async () => {
//       const token = localStorage.getItem('token');
      
//       try {
//         const response = await axios.get(`/api/fondos/${fondoId}/asignaciones`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setAsignaciones(response.data);
//       } catch (error) {
//         console.error('Error al obtener las asignaciones por fondo:', error);
//       }
//     };

//     fetchAsignaciones();
//   }, [fondoId]);

//   return (
//     <div className="max-w-4xl mx-auto mt-8">
//       <h2 className="text-2xl font-semibold mb-4">Asignaciones del Fondo</h2>
//       <table className="w-full table-auto border-collapse">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="p-2 border">Tarea</th>
//             <th className="p-2 border">Fecha</th>
//             <th className="p-2 border">Estado</th>
//             <th className="p-2 border">Acciones</th>
//           </tr>
//         </thead>
//         <tbody>
//           {asignaciones.map((asignacion) => (
//             <tr key={asignacion._id}>
//               <td className="p-2 border">{asignacion.nombre}</td>
//               <td className="p-2 border">{asignacion.fecha_vencimiento}</td>
//               <td className="p-2 border">{asignacion.estado}</td>
//               <td className="p-2 border">
//                 <button className="text-blue-600" onClick={() => handleEdit(asignacion._id)}>
//                   Editar
//                 </button>
//                 <button className="text-red-600 ml-2" onClick={() => handleDelete(asignacion._id)}>
//                   Eliminar
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// const handleEdit = (id) => {
//   // Redirige a la página de edición (esto puede ser un formulario similar a CrearAsignacion)
//   console.log('Editar asignación con ID:', id);
// };

// const handleDelete = async (id) => {
//   const token = localStorage.getItem('token');
  
//   try {
//     await axios.delete(`/api/fondos/${fondoId}/asignaciones/${id}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     alert('Asignación eliminada con éxito');
//     window.location.reload();
//   } catch (error) {
//     console.error('Error al eliminar la asignación:', error);
//     alert('Hubo un error al eliminar la asignación');
//   }
// };

// export default AsignacionesPorFondo;
