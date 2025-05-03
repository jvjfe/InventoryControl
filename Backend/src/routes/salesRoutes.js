import express from 'express';
import { PrismaClient } from "@prisma/client";
import createSale from '../sales/postSales.js';
import { getSale, getSaleById } from '../sales/getSales.js';
import putSale from '../sales/putSales.js';
import deleteSale from '../sales/deleteSales.js';

const router = express.Router();
const prisma = new PrismaClient();

/**
 * @swagger
 * /sales:
 *   post:
 *     summary: Cria uma nova venda
 *     tags: [Sales]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - customer_name
 *               - payment_method
 *               - items
 *             properties:
 *               customer_name:
 *                 type: string
 *                 example: String
 *               payment_method:
 *                 type: string
 *                 example: String
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - qty_total
 *                     - unit_price
 *                     - product_id
 *                   properties:
 *                     qty_total:
 *                       type: integer
 *                       example: 2
 *                     unit_price:
 *                       type: number
 *                       format: float
 *                       example: 49.90
 *                     product_id:
 *                       type: string
 *                       example: "123e4567-e89b-10d1-a112-131415161718"
 *     responses:
 *       201:
 *         description: Venda criada com sucesso
 *       500:
 *         description: Erro interno ao criar a venda
 */

router.post('/', createSale(prisma));

/**
 * @swagger
 * /sales:
 *   get:
 *     summary: Lista todas as vendas
 *     tags: [Sales]
 *     responses:
 *       200:
 *         description: Lista de vendas retornada com sucesso
 */
router.get('/', (req, res) => getSale(req, res, prisma));

/**
 * @swagger
 * /sales/{id}:
 *   get:
 *     summary: Obtém uma venda pelo ID
 *     tags: [Sales]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Venda encontrada
 *       404:
 *         description: Venda não encontrada
 */
router.get('/:id', (req, res) => getSaleById(req, res, prisma));

/**
 * @swagger
 * /sales/{id}:
 *   put:
 *     summary: Atualiza uma venda existente
 *     tags: [Sales]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da venda a ser atualizada
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - customer_name
 *               - payment_method
 *               - items
 *             properties:
 *               customer_name:
 *                 type: string
 *                 example: João da Silva
 *               payment_method:
 *                 type: string
 *                 example: Cartão de Crédito
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - qty_total
 *                     - unit_price
 *                     - product_id
 *                   properties:
 *                     qty_total:
 *                       type: integer
 *                       example: 2
 *                     unit_price:
 *                       type: number
 *                       format: float
 *                       example: 49.90
 *                     product_id:
 *                       type: string
 *                       example: "123e4567-e89b-10d1-a112-131415161718"
 *     responses:
 *       200:
 *         description: Venda atualizada com sucesso
 *       404:
 *         description: Venda não encontrada
 *       500:
 *         description: Erro ao atualizar a venda
 */

router.put('/:id', putSale(prisma));

/**
 * @swagger
 * /sales/{id}:
 *   delete:
 *     summary: Deleta uma venda
 *     tags: [Sales]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Venda deletada com sucesso
 *       404:
 *         description: Venda não encontrada
 */
router.delete('/:id', deleteSale(prisma));

export default router;
