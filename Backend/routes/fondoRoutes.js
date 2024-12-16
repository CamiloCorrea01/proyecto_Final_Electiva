/**
 * @swagger
 * components:
 *   schemas:
 *     Fondo:
 *       type: object
 *       required:
 *         - nombre
 *         - descripcion
 *         - presupuesto
 *         - saldo
 *       properties:
 *         id:
 *           type: string
 *           description: ID generado automáticamente
 *         nombre:
 *           type: string
 *           description: Nombre del fondo
 *         descripcion:
 *           type: string
 *           description: Descripción del fondo
 *         presupuesto:
 *           type: number
 *           description: Presupuesto asignado al fondo
 *         saldo:
 *           type: number
 *           description: Saldo restante en el fondo
 *       example:
 *         nombre: "Fondo Educativo"
 *         descripcion: "Fondo dedicado a proyectos educativos"
 *         presupuesto: 1000000
 *         saldo: 850000
 */

/**
 * @swagger
 * /api/fondos:
 *   get:
 *     summary: Obtener todos los fondos
 *     tags: [Fondos]
 *     responses:
 *       200:
 *         description: Lista de todos los fondos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Fondo'
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /api/fondos:
 *   post:
 *     summary: Crear un nuevo fondo
 *     tags: [Fondos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Fondo'
 *     responses:
 *       201:
 *         description: Fondo creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Fondo'
 *       400:
 *         description: Error en la validación de datos
 */

/**
 * @swagger
 * /api/fondos/{id}:
 *   put:
 *     summary: Actualizar un fondo existente
 *     tags: [Fondos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del fondo a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Fondo'
 *     responses:
 *       200:
 *         description: Fondo actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Fondo'
 *       400:
 *         description: Error en la validación de datos
 *       404:
 *         description: Fondo no encontrado
 */

/**
 * @swagger
 * /api/fondos/{id}:
 *   delete:
 *     summary: Eliminar un fondo existente
 *     tags: [Fondos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del fondo a eliminar
 *     responses:
 *       200:
 *         description: Fondo eliminado exitosamente
 *       404:
 *         description: Fondo no encontrado
 *       500:
 *         description: Error interno del servidor
 */

const express = require('express');
const router = express.Router();
const { getFondos, createFondo, updateFondo, deleteFondo } = require('../controllers/fondosController');

// Endpoints de fondos
router.get('/', getFondos);
router.post('/', createFondo);
router.put('/:id', updateFondo);
router.delete('/:id', deleteFondo);

module.exports = router;
