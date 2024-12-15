const mongoose = require('mongoose');

const alertaSchema = new mongoose.Schema({
  tipo: {
    type: String,
    required: true,
    enum: [
      'monto de asignacion insuficiente', //para cuando una aignacion se queda sin fondos si haber terminado
      'Sobrecostos', 
      'Vencimiento Cercano', 
      'Fondo Sin Actividad', 
      'Fondo Sin Recursos', // Nueva alerta
      'Bajo Saldo' // Nueva alerta
    ],
  },
  mensaje: {
    type: String,
    required: true,
  },
  fondo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Fondo',
  },
  fecha_creacion: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Alerta', alertaSchema);
