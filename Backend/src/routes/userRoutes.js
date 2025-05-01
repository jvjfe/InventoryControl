import express from "express";
import createUser from "../user/createUser.js";
import { getUsers, getUserById } from "../user/getUser.js";
import updateUser from "../user/updateUser.js";
import deleteUser from "../user/deleteUser.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const router = express.Router();

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Cria um novo usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               city:
 *                 type: string
 *             required:
 *               - name
 *               - city
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 */
router.post('/', (req, res) => createUser(req, res, prisma));

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Lista todos os usuários
 *     responses:
 *       200:
 *         description: Lista de usuários retornada com sucesso
 */
router.get('/', (req, res) => getUsers(req, res, prisma));

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Retorna um usuário específico
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuário
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *       404:
 *         description: Usuário não encontrado
 */
router.get('/:id', (req, res) => getUserById(req, res, prisma));

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Atualiza um usuário
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuário
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               city:
 *                 type: string
 *             required:
 *               - name
 *               - city
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 */
router.put('/:id', (req, res) => updateUser(req, res, prisma));

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Deleta um usuário
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuário
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuário deletado com sucesso
 *       404:
 *         description: Usuário não encontrado
 */
router.delete('/:id', (req, res) => deleteUser(req, res, prisma));

export default function userRoutes(prisma) {
    return router;
}
