const express = require('express');
const router = express.Router();
const Alerta = require('../models/alertaModel');

// Obtener todas las alertas
router.get('/', async (req, res) => {
  try {
    const alertas = await Alerta.find().populate('fondo'); // Populate para obtener datos del fondo relacionado
    res.json(alertas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Obtener alertas por tipo
router.get('/tipo/:tipo', async (req, res) => {
  try {
    const alertas = await Alerta.find({ tipo: req.params.tipo }).populate('fondo');
    res.json(alertas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Obtener alertas relacionadas a un fondo específico
router.get('/fondo/:fondoId', async (req, res) => {
  try {
    const alertas = await Alerta.find({ fondo: req.params.fondoId }).populate('fondo');
    res.json(alertas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Eliminar una alerta específica
router.delete('/:id', async (req, res) => {
  try {
    await Alerta.findByIdAndDelete(req.params.id);
    res.json({ message: 'Alerta eliminada' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Crear manualmente una alerta (si es necesario)
router.post('/', async (req, res) => {
  const { tipo, mensaje, fondo } = req.body;

  const nuevaAlerta = new Alerta({
    tipo,
    mensaje,
    fondo,
  });

  try {
    const alertaGuardada = await nuevaAlerta.save();
    res.status(201).json(alertaGuardada);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
