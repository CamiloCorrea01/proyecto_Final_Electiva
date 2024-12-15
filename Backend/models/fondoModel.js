const mongoose = require('mongoose');

const fondoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    descripcion: {
        type: String,
        required: true,
    },
    presupuesto: {
        type: Number,
        required: true,
    },
    saldo: {
        type: Number,
        required: true,
    },
    fecha_creacion: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Fondo', fondoSchema);
