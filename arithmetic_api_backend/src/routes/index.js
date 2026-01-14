'use strict';

const express = require('express');
const healthController = require('../controllers/health');
const arithmeticController = require('../controllers/arithmetic');

const router = express.Router();

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health check
 *     description: Returns service health status.
 *     responses:
 *       200:
 *         description: Service health check passed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 */
router.get('/health', healthController.check.bind(healthController));

/**
 * @swagger
 * components:
 *   schemas:
 *     TwoNumberInput:
 *       type: object
 *       required: [a, b]
 *       properties:
 *         a:
 *           type: number
 *           example: 10
 *         b:
 *           type: number
 *           example: 5
 *     ManyNumberInput:
 *       type: object
 *       required: [numbers]
 *       properties:
 *         numbers:
 *           type: array
 *           items:
 *             type: number
 *           example: [1, 2, 3]
 *     Result:
 *       type: object
 *       properties:
 *         result:
 *           type: number
 *           example: 15
 */

/**
 * @swagger
 * /add:
 *   post:
 *     summary: Add numbers
 *     description: |
 *       Adds numbers. Accepts either {a,b} or {numbers:[...]}.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             oneOf:
 *               - $ref: '#/components/schemas/TwoNumberInput'
 *               - $ref: '#/components/schemas/ManyNumberInput'
 *     responses:
 *       200:
 *         description: Result of addition
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Result'
 *       400:
 *         description: Invalid input
 */
router.post('/add', arithmeticController.add.bind(arithmeticController));

/**
 * @swagger
 * /subtract:
 *   post:
 *     summary: Subtract numbers
 *     description: Subtracts b from a. Accepts {a,b}.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TwoNumberInput'
 *     responses:
 *       200:
 *         description: Result of subtraction
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Result'
 *       400:
 *         description: Invalid input
 */
router.post('/subtract', arithmeticController.subtract.bind(arithmeticController));

/**
 * @swagger
 * /multiply:
 *   post:
 *     summary: Multiply numbers
 *     description: |
 *       Multiplies numbers. Accepts either {a,b} or {numbers:[...]}.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             oneOf:
 *               - $ref: '#/components/schemas/TwoNumberInput'
 *               - $ref: '#/components/schemas/ManyNumberInput'
 *     responses:
 *       200:
 *         description: Result of multiplication
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Result'
 *       400:
 *         description: Invalid input
 */
router.post('/multiply', arithmeticController.multiply.bind(arithmeticController));

/**
 * @swagger
 * /divide:
 *   post:
 *     summary: Divide numbers
 *     description: Divides a by b. Division by zero returns 400. Accepts {a,b}.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TwoNumberInput'
 *     responses:
 *       200:
 *         description: Result of division
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Result'
 *       400:
 *         description: Invalid input or division by zero
 */
router.post('/divide', arithmeticController.divide.bind(arithmeticController));

module.exports = router;
