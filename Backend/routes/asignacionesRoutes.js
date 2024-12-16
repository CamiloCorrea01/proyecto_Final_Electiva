/**
 * @swagger
 * components:
 *   schemas:
 *     Asignacion:
 *       type: object
 *       required:
 *         - monto
 *         - descripcion
 *         - fondoId
 *       properties:
 *         id:
 *           type: string
 *           description: ID generado automáticamente
 *         monto:
 *           type: number
 *           description: Monto asignado
 *         descripcion:
 *           type: string
 *           description: Descripción de la asignación
 *         fondoId:
 *           type: string
 *           description: ID del fondo asociado
 *       example:
 *         monto: 50000
 *         descripcion: "Compra de materiales educativos"
 *         fondoId: "63f2b6d8e4b0b3aab8e23d9a"
 */

/**
 * @swagger
 * /api/asignaciones:
 *   get:
 *     summary: Obtener todas las asignaciones
 *     tags: [Asignaciones]
 *     responses:
 *       200:
 *         description: Lista de todas las asignaciones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Asignacion'
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /api/asignaciones:
 *   post:
 *     summary: Crear una nueva asignación
 *     tags: [Asignaciones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Asignacion'
 *     responses:
 *       201:
 *         description: Asignación creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Asignacion'
 *       400:
 *         description: Error en la validación de datos
 */

/**
 * @swagger
 * /api/asignaciones/{asignacionId}:
 *   put:
 *     summary: Actualizar una asignación existente
 *     tags: [Asignaciones]
 *     parameters:
 *       - in: path
 *         name: asignacionId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la asignación a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Asignacion'
 *     responses:
 *       200:
 *         description: Asignación actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Asignacion'
 *       400:
 *         description: Error en la validación de datos
 *       404:
 *         description: Asignación no encontrada
 */

/**
 * @swagger
 * /api/asignaciones/{asignacionId}:
 *   delete:
 *     summary: Eliminar una asignación existente
 *     tags: [Asignaciones]
 *     parameters:
 *       - in: path
 *         name: asignacionId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la asignación a eliminar
 *     responses:
 *       200:
 *         description: Asignación eliminada exitosamente
 *       404:
 *         description: Asignación no encontrada
 *       500:
 *         description: Error interno del servidor
 */


const express = require('express');
const router = express.Router({ mergeParams: true }); // Habilitar mergeParams
const { getAsignaciones, createAsignacion, updateAsignacion, deleteAsignacion } = require('../controllers/asignacionesController');

// Endpoints de asignaciones
router.get('/', getAsignaciones); // Fondo ID será accesible aquí
router.post('/', createAsignacion);
router.put('/:asignacionId', updateAsignacion);
router.delete('/:asignacionId', deleteAsignacion);

module.exports = router;
