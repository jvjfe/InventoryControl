import express from 'express';
import { PrismaClient } from "@prisma/client";
import createProducts from '../products/postProducts.js';
import { getProducts, getProductsById } from '../products/getProducts.js';
import putProducts from '../products/putProducts.js';
import deleteProducts from '../products/deleteProducts.js';

const router = express.Router();
const prisma = new PrismaClient();

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Cria um novo produto
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - stock
 *               - status
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               stock:
 *                 type: integer
 *               status:
 *                 type: string
 *               price:
 *                 type: number
 *                 format: float
 *     responses:
 *       201:
 *         description: Produto criado com sucesso
 */
router.post('/', createProducts(prisma));
/**
 * @swagger
 * /products:
 *   get:
 *     summary: Lista todos os produtos
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Lista de produtos retornada com sucesso
 */
router.get('/', (req, res) => getProducts(req, res, prisma));

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Obtém um produto pelo ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Produto encontrado
 *       404:
 *         description: Produto não encontrado
 */
router.get('/:id', (req, res) => getProductsById(req, res, prisma));

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Atualiza um produto existente
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               stock:
 *                 type: integer
 *               status:
 *                 type: string
 *               price:
 *                 type: number
 *                 format: float
 *     responses:
 *       200:
 *         description: Produto atualizado com sucesso
 *       404:
 *         description: Produto não encontrado
 */
router.put('/:id', putProducts(prisma));

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Deleta um produto
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Produto deletado com sucesso
 *       404:
 *         description: Produto não encontrado
 */
router.delete('/:id', deleteProducts(prisma));

export default router;
