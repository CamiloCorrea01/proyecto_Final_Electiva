const asignacionService = require('../services/asignacionService');

// Obtener todas las asignaciones de un fondo
const getAsignaciones = async (req, res) => {
    try {
        const fondoId = req.params.fondoId; // Captura el ID del fondo desde la URL
        console.log('Fondo ID recibido en asignaciones Controller (GET):', fondoId);

        if (!fondoId) {
            return res.status(400).json({ message: 'Fondo ID es obligatorio.' }); // Validación temprana
        }

        const asignaciones = await asignacionService.getAsignaciones(fondoId);
        res.status(200).json(asignaciones);
    } catch (err) {
        console.error('Error en getAsignaciones:', err.message);
        res.status(500).json({ message: 'Hubo un error al obtener las asignaciones.' });
    }
};

// Crear una asignación
const createAsignacion = async (req, res) => {
    try {
        const fondoId = req.params.fondoId; // Captura el ID del fondo desde la URL
        console.log('Fondo ID recibido en asignaciones Controller (POST):', fondoId);

        if (!fondoId) {
            return res.status(400).json({ message: 'Fondo ID es obligatorio.' }); // Validación temprana
        }

        // Llama al servicio para crear la asignación
        const asignacionGuardada = await asignacionService.createAsignacion(fondoId, req.body);
        res.status(201).json(asignacionGuardada); // Devuelve la asignación creada con código 201
    } catch (err) {
        console.error('Error en createAsignacion:', err.message);
        res.status(400).json({ message: 'Hubo un error al crear la asignación.' });
    }
};

// Actualizar una asignación
const updateAsignacion = async (req, res) => {
    try {
        const asignacionId = req.params.asignacionId; // Captura el ID de la asignación desde la URL
        console.log('Asignación ID recibido en asignaciones Controller (PUT):', asignacionId);

        if (!asignacionId) {
            return res.status(400).json({ message: 'Asignación ID es obligatorio.' }); // Validación temprana
        }

        // Llama al servicio para actualizar la asignación
        const asignacionActualizada = await asignacionService.updateAsignacion(asignacionId, req.body);
        res.status(200).json(asignacionActualizada); // Devuelve la asignación actualizada
    } catch (err) {
        console.error('Error en updateAsignacion:', err.message);
        res.status(400).json({ message: 'Hubo un error al actualizar la asignación.' });
    }
};

// Eliminar una asignación
const deleteAsignacion = async (req, res) => {
    try {
        const asignacionId = req.params.asignacionId; // Captura el ID de la asignación desde la URL
        console.log('Asignación ID recibido en asignaciones Controller (DELETE):', asignacionId);

        if (!asignacionId) {
            return res.status(400).json({ message: 'Asignación ID es obligatorio.' }); // Validación temprana
        }

        // Llama al servicio para eliminar la asignación
        await asignacionService.deleteAsignacion(asignacionId);
        res.status(200).json({ message: 'Asignación eliminada correctamente.' });
    } catch (err) {
        console.error('Error en deleteAsignacion:', err.message);
        res.status(500).json({ message: 'Hubo un error al eliminar la asignación.' });
    }
};

module.exports = { getAsignaciones, createAsignacion, updateAsignacion, deleteAsignacion };
