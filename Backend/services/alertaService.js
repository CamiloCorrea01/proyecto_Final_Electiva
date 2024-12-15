const Alerta = require('../models/alertaModel');
const Fondo = require('../models/fondoModel');
const Asignacion = require('../models/asignacionModel'); // Para verificar asignaciones relacionadas

// Función que genera alertas
const generarAlertas = async () => {
  try {
    // Obtener todos los fondos
    const fondos = await Fondo.find();

    fondos.forEach(async (fondo) => {
      // Alerta: Bajo Saldo
      if (fondo.saldo < fondo.presupuesto * 0.2) {
        const alertaBajoSaldo = new Alerta({
          tipo: 'Bajo Saldo',
          mensaje: `El fondo '${fondo.nombre}' tiene solo un ${((fondo.saldo / fondo.presupuesto) * 100).toFixed(2)}% de saldo disponible.`,
          fondo: fondo._id,
        });
        await alertaBajoSaldo.save();
      }

      // Alerta: Fondo Sin Recursos
      if (fondo.saldo <= 0) {
        const alertaSinRecursos = new Alerta({
          tipo: 'Fondo Sin Recursos',
          mensaje: `El fondo '${fondo.nombre}' se ha quedado sin recursos disponibles.`,
          fondo: fondo._id,
        });
        await alertaSinRecursos.save();
      }

      // Verificar asignaciones relacionadas con el fondo
      const asignaciones = await Asignacion.find({ fondo_id: fondo._id });

      // Alerta: Fondo Sin Actividad
      if (asignaciones.length === 0) {
        const alertaFondoSinActividad = new Alerta({
          tipo: 'Fondo Sin Actividad',
          mensaje: `El fondo '${fondo.nombre}' no ha tenido asignaciones recientes.`,
          fondo: fondo._id,
        });
        await alertaFondoSinActividad.save();
      }

      // Verificar cada asignación relacionada
      for (const asignacion of asignaciones) {
        // Alerta: Monto de asignación insuficiente
        if (asignacion.monto > fondo.saldo) {
          const alertaMontoInsuficiente = new Alerta({
            tipo: 'monto de asignacion insuficiente',
            mensaje: `La asignación '${asignacion.nombre}' excede el saldo disponible del fondo '${fondo.nombre}'.`,
            fondo: fondo._id,
          });
          await alertaMontoInsuficiente.save();
        }

        // Alerta: Sobrecostos
        if (asignacion.sobrecosto && asignacion.sobrecosto > 0) {
          const alertaSobrecostos = new Alerta({
            tipo: 'Sobrecostos',
            mensaje: `La asignación '${asignacion.nombre}' del fondo '${fondo.nombre}' ha incurrido en sobrecostos de ${asignacion.sobrecosto}.`,
            fondo: fondo._id,
          });
          await alertaSobrecostos.save();
        }

        // Alerta: Vencimiento Cercano
        const hoy = new Date();
        const diasRestantes = (new Date(asignacion.fecha_vencimiento) - hoy) / (1000 * 60 * 60 * 24);
        if (diasRestantes > 0 && diasRestantes <= 7) {
          const alertaVencimientoCercano = new Alerta({
            tipo: 'Vencimiento Cercano',
            mensaje: `La asignación '${asignacion.nombre}' del fondo '${fondo.nombre}' está próxima a vencer en ${Math.ceil(diasRestantes)} día(s).`,
            fondo: fondo._id,
          });
          await alertaVencimientoCercano.save();
        }
      }
    });
  } catch (error) {
    console.error('Error generando alertas:', error);
  }
};

module.exports = { generarAlertas };
