const mongoose = require('mongoose');
const Asignacion = require('../models/asignacionModel');
const Fondo = require('../models/fondoModel');
const fondoController = require('../controllers/fondosController'); // Importación agregada

// Obtener todas las asignaciones de un fondo
const getAsignaciones = async (fondoId) => {
    try {
        const asignaciones = await Asignacion.find({ fondo_id: fondoId });
        return asignaciones;
    } catch (err) {
        throw new Error(err.message);
    }
};

// Crear una asignación
const createAsignacion = async (fondoId, asignacionData) => {
    const { nombre, descripcion, monto, sobrecosto, fecha_vencimiento } = asignacionData;
    console.log('fondo id del service: ', fondoId);
    try {
        // Verifica si fondoId es un ObjectId válido
        if (!mongoose.Types.ObjectId.isValid(fondoId)) {
            throw new Error('Fondo ID no válido en services');
        }

        console.log('Fondo ID recibido:', fondoId);
        const fondo = await Fondo.findById(fondoId);
        if (!fondo) {
            throw new Error('Fondo no encontrado');
        }

        // Verificar que el monto no sea mayor al 50% del presupuesto
        if (monto > fondo.presupuesto * 0.5) {
            throw new Error('La asignación no puede ser mayor al 50% del presupuesto del fondo');
        }

        // Verificar si hay suficiente saldo en el fondo
        if (fondo.saldo < monto) {
            throw new Error('No hay suficiente saldo en el fondo para realizar la asignación');
        }

        // Crear la nueva asignación
        const nuevaAsignacion = new Asignacion({
            fondo_id: fondoId,
            nombre,
            descripcion,
            monto,
            sobrecosto,
            fecha_vencimiento,
        });

        // Descontar el monto de la asignación del saldo del fondo utilizando el controlador
        await fondoController.updateSaldoFondo(fondoId, monto);

        // Guardar la asignación
        const asignacionGuardada = await nuevaAsignacion.save();

        return asignacionGuardada;
    } catch (err) {
        throw new Error(err.message);
    }
};

// Actualizar una asignación
const updateAsignacion = async (asignacionId, asignacionData) => {
    try {
        const asignacion = await Asignacion.findByIdAndUpdate(asignacionId, asignacionData, { new: true });
        return asignacion;
    } catch (err) {
        throw new Error(err.message);
    }
};

// Eliminar una asignación
const deleteAsignacion = async (asignacionId) => {
    try {
        const asignacion = await Asignacion.findByIdAndDelete(asignacionId);
        return asignacion;
    } catch (err) {
        throw new Error(err.message);
    }
};

module.exports = { getAsignaciones, createAsignacion, updateAsignacion, deleteAsignacion };
