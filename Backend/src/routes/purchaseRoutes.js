import express from 'express';
import { PrismaClient } from "@prisma/client";
import createPurchase from '../purchases/postPurchase.js';
import { getPurchase, getPurchaseById } from '../purchases/getPurchase.js';
import putPurchase from '../purchases/putPurchase.js';
import deletePurchase from '../purchases/deletePurchase.js';

const router = express.Router();
const prisma = new PrismaClient();

/**
 * @swagger
 * /purchases:
 *   post:
 *     summary: Cria uma nova compra
 *     tags: [Purchases]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - supplier_name
 *               - payment_method
 *             properties:
 *               supplier_name:
 *                 type: string
 *               payment_method:
 *                 type: string
 *     responses:
 *       201:
 *         description: Compra criada com sucesso
 */
router.post('/', createPurchase(prisma));

/**
 * @swagger
 * /purchases:
 *   get:
 *     summary: Lista todas as compras
 *     tags: [Purchases]
 *     responses:
 *       200:
 *         description: Lista de compras retornada com sucesso
 */
router.get('/', (req, res) => getPurchase(req, res, prisma));

/**
 * @swagger
 * /purchases/{id}:
 *   get:
 *     summary: Obtém uma compra pelo ID
 *     tags: [Purchases]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Compra encontrada
 *       404:
 *         description: Compra não encontrada
 */
router.get('/:id', (req, res) => getPurchaseById(req, res, prisma));

/**
 * @swagger
 * /purchases/{id}:
 *   put:
 *     summary: Atualiza uma compra existente
 *     tags: [Purchases]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               supplier_name:
 *                 type: string
 *               payment_method:
 *                 type: string
 *     responses:
 *       200:
 *         description: Compra atualizada com sucesso
 *       404:
 *         description: Compra não encontrada
 */
router.put('/:id', putPurchase(prisma));

/**
 * @swagger
 * /purchases/{id}:
 *   delete:
 *     summary: Deleta uma compra
 *     tags: [Purchases]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Compra deletada com sucesso
 *       404:
 *         description: Compra não encontrada
 */
router.delete('/:id', deletePurchase(prisma));

export default router;
