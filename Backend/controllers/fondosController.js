

const Fondo = require('../models/fondoModel');

// Obtener todos los fondos
const getFondos = async (req, res) => {
    try {
        const fondos = await Fondo.find();
        res.json(fondos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Crear un fondo
const createFondo = async (req, res) => {
    const { nombre, descripcion, presupuesto, saldo } = req.body;

    const nuevoFondo = new Fondo({
        nombre,
        descripcion,
        presupuesto,
        saldo,
    });

    try {
        const fondoGuardado = await nuevoFondo.save();
        res.status(201).json(fondoGuardado);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Actualizar un fondo
const updateFondo = async (req, res) => {
    try {
        const fondo = await Fondo.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(fondo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Eliminar un fondo
const deleteFondo = async (req, res) => {
    try {
        const fondo = await Fondo.findByIdAndDelete(req.params.id);
        res.json({ message: 'Fondo eliminado' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Actualizar saldo de un fondo después de crear una asignación
const updateSaldoFondo = async (fondoId, monto) => {
    try {
        const fondo = await Fondo.findById(fondoId);
        if (!fondo) {
            throw new Error('Fondo no encontrado');
        }

        // Descontar el monto de la asignación del saldo del fondo
        fondo.saldo -= monto;

        // Guardar el fondo con el saldo actualizado
        await fondo.save();
    } catch (err) {
        throw new Error(err.message);
    }
};

module.exports = { getFondos, createFondo, updateFondo, deleteFondo, updateSaldoFondo };
