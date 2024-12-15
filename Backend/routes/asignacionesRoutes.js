const express = require('express');
const router = express.Router({ mergeParams: true }); // Habilitar mergeParams
const { getAsignaciones, createAsignacion, updateAsignacion, deleteAsignacion } = require('../controllers/asignacionesController');

// Endpoints de asignaciones
router.get('/', getAsignaciones); // Fondo ID será accesible aquí
router.post('/', createAsignacion);
router.put('/:asignacionId', updateAsignacion);
router.delete('/:asignacionId', deleteAsignacion);

module.exports = router;
