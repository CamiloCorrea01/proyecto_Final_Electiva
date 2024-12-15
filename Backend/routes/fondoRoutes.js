const express = require('express');
const router = express.Router();
const { getFondos, createFondo, updateFondo, deleteFondo } = require('../controllers/fondosController');

// Endpoints de fondos
router.get('/', getFondos);
router.post('/', createFondo);
router.put('/:id', updateFondo);
router.delete('/:id', deleteFondo);

module.exports = router;
