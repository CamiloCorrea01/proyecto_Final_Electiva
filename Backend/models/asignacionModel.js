const mongoose = require('mongoose');

const asignacionSchema = new mongoose.Schema({
    fondo_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Fondo',
        required: true,
    },
    nombre: {
        type: String,
        required: true,
    },
    descripcion: {
        type: String,
        required: true,
    },
    monto: {
        type: Number,
        required: true,
    },
    sobrecosto: {
        type: Boolean,
        default: false,
    },
    fecha_asignacion: {
        type: Date,
        default: Date.now,
    },
    fecha_vencimiento: {
        type: Date,
        required: true,
    },
    estado: {
        type: String,
        enum: ['Pendiente', 'Completada', 'Cancelada'],
        default: 'Pendiente',
    },
});

module.exports = mongoose.model('Asignacion', asignacionSchema);
