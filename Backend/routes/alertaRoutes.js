/**
 * @swagger
 * components:
 *   schemas:
 *     Alerta:
 *       type: object
 *       required:
 *         - tipo
 *         - mensaje
 *       properties:
 *         id:
 *           type: string
 *           description: ID generado automáticamente
 *         tipo:
 *           type: string
 *           description: Tipo de la alerta
 *         mensaje:
 *           type: string
 *           description: Mensaje de la alerta
 *         fondo:
 *           type: string
 *           description: ID del fondo relacionado
 *       example:
 *         tipo: "advertencia"
 *         mensaje: "Saldo bajo en el fondo"
 *         fondo: "63f2b6d8e4b0b3aab8e23d9a"
 */

/**
 * @swagger
 * /api/alertas:
 *   get:
 *     summary: Obtener todas las alertas
 *     tags: [Alertas]
 *     responses:
 *       200:
 *         description: Lista de todas las alertas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Alerta'
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /api/alertas:
 *   post:
 *     summary: Crear una nueva alerta
 *     tags: [Alertas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Alerta'
 *     responses:
 *       201:
 *         description: Alerta creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Alerta'
 *       400:
 *         description: Error en la validación de datos
 */


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
